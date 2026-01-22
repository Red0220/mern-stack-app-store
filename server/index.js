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
import { connectDb } from './config/connectDb.js'
import { socketAuth } from './middleware/socket.auth.js'

import userRouter from './routes/auth.router.js'
import productRouter from './routes/product.router.js'
import orderRouter from './routes/order.router.js'



const app = express();
const httpServer = createServer(app);


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));
app.use(cookieParser())
app.use(helmet())
app.use('/server', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', 
    helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}),
//  (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
//     next();
// },
    express.static(path.join(process.cwd(), 'uploads')));

// MongoDB connection
connectDb();

// routers 
app.use('/server/auth', userRouter);
app.use('/server/product', productRouter);
app.use('/server/order', orderRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
});

//socket connections
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        credentials: true
    }
});
io.use(socketAuth);
io.on('connection', (socket) => {
     const user = socket.user;

     //user room
     socket.join(`user:${user._id}`);

     //admin room
        if(user.isAdmin){
            socket.join('admins');
        }


    socket.on('message', data => {
        console.log('received data: ', data);

        socket.broadcast.emit('message', data);
    });
    socket.on('disconnect', () => {
        socket.leave(`user:${user._id}`);
        if(user.isAdmin) socket.leave('admins');
    })

});



httpServer.listen(3000, () => console.log('Listning...'));

export { io }