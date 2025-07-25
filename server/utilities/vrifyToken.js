import jwt from 'jsonwebtoken'
import { errorHandler } from '../middleware/errorHandler.js'


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token ;

    if(!token) return next(errorHandler(401, 'Not authorized'));
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(errorHandler(401,'Unauthorized.'));
        req.user = user;
        next()
    })
}