import jwt from 'jsonwebtoken';
import { emitToAll } from '../services/socket.services.js';

export const sendTokenResponse = (res, user, statusCode, event) => {

    const token = jwt.sign({
                id: user._id,
                username: user.username,
                isAdmin: user.isAdmin
              }, process.env.JWT_SECRET_KEY, {expiresIn: '2d'})
    
              const {password, ...rest} = user._doc;
              
              emitToAll("new_user", {userId: user._id})

              res.status(statusCode).cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 2 * 24 * 60 * 1000,
              }).json({
                success: true,
                user: rest,
              })
}