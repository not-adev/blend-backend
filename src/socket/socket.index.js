import registerSocketHandlers from './socket.manager.js'
import { socketCookieParser } from './socket.middleware/socket.clearkIdParser.js'

export function SocketHanlder(io) {
    io.use(socketCookieParser)
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        registerSocketHandlers(io, socket)
    })

}