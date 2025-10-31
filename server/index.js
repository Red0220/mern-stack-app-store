'use strict'

import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
import mongoose from 'mongoose'

import userRouter from './routes/auth.router.js'
import productRouter from './routes/product.router.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your client URL
    credentials: true
}));
app.use(cookieParser())
app.use(helmet({}))
app.use('/server', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'cross-origin');
    next();
},
    express.static(path.join(process.cwd(), 'uploads')));

mongoose.connect(process.env.MongooseUrl)
    .then(() => console.log('connected...'))
    .catch((e) => console.log(e || 'something went wrong'))

// routers 
app.use('/server/auth', userRouter);
app.use('/server/product', productRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
});

//socket connections
io.on('connection', (socket) => {
    console.log('new client connected: ', socket.id);

    socket.on('message', data => {
        console.log('received data: ', data);

        socket.broadcast.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id)
    })

});



httpServer.listen(3000, () => console.log('Listning...'));

export { io }