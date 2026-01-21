import { io } from '../index.js'

export const emitToAll = (event, payload) => {
    io.emit(event, payload)
}

export const emitToRoom = (userId, event, payload) => {
    io.to(`user:${userId}`).emit(event, payload)
}

export const emitToUser = (userId, event, payload) => {
    io.to(userId).emit(event, payload)
}