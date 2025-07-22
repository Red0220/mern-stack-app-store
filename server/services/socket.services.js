import { io } from '../index.js'

export const emitToAll = (event, data) => {
    io.emit(event, data)
}

export const emitToRoom = (roomId, event, data) => {
    io.to(roomId).emit(event, data)
}

export const emitToUser = (userId, event, data) => {
    io.to(userId).emit(event, data)
}