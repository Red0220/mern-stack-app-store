import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';
import User from '../models/user.model.js';

export const socketAuth = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token ||
            socket.handshake.headers?.authorization?.split(' ')[1];

            if(!token){
                return next(errorHandler(401, 'Unauthorized'));
            }

            const decodes = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodes.id).select('-password');

            if(!user){
                return next(errorHandler(401, 'Unauthorized'));
            }
            socket.user = user;
            next();

    } catch (error) {
        next(errorHandler(401, 'Unauthorized'));
    }
}