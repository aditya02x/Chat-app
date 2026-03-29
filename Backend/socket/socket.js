import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
})

const onlineUsers = {}

io.on('connection', (socket) => {
    
    socket.on('userConnected', (userId) => {
        onlineUsers[userId] = socket.id
        io.emit('getOnlineUsers', Object.keys(onlineUsers))
        console.log('User connected', userId)
    })

    socket.on('disconnect', () => {
        const userId = Object.keys(onlineUsers).find(
            key => onlineUsers[key] === socket.id
        )
        delete onlineUsers[userId]
        io.emit('getOnlineUsers', Object.keys(onlineUsers))
        console.log('User disconnected', userId)
    })
})

export { app, io, httpServer, onlineUsers }