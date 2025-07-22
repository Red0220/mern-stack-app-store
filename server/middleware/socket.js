import { io } from '../index.js'

export const socketMiddleware = (req, res, next) => {
    req.io = io ;
    next()
}