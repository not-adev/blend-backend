import 'dotenv/config'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { clerkMiddleware } from "@clerk/express";
import {connectToDb} from './src/config/db.js'
import { youtubeSearchRoutes } from './src/routes/youtube/youtube.search.js';
import { SocketHanlder } from './src/socket/socket.index.js';
import { youtubeStreamUrl } from './src/routes/youtube/youtube.streamurl.js';
import { groupSearchRoutes } from './src/routes/group/group.search.js';
import {groupCreateRoutes} from './src/routes/group/group.create.js'
const app = express()
const port = 3000


const server = http.createServer(app)
const io = new Server(server)
app.use(clerkMiddleware())
app.use(express.json())
await connectToDb()
SocketHanlder(io)
app.use('/search' , youtubeSearchRoutes())
app.use('/stream' , youtubeStreamUrl())
app.use('/groupSearch' , groupSearchRoutes())
app.use('/groupCrud' , groupCreateRoutes())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
server.listen(port , ()=>{  
    console.log(`server listning on port ${port}`)
})
