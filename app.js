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
import { groupJoinRoutes } from './src/routes/group/group.join.js';
const app = express()
const port = 3000


const server = http.createServer(app)
const io = new Server(server)
app.use(clerkMiddleware())
app.use(express.json())
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next(); // Passes control to the next middleware or route
});
await connectToDb()
SocketHanlder(io)
app.use('/search' , youtubeSearchRoutes)
app.use('/stream' , youtubeStreamUrl)
app.use('/groupSearch' , groupSearchRoutes)
app.use('/groupCrud' , groupCreateRoutes)
app.use('/group/join' , groupJoinRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
server.listen(port , ()=>{  
    console.log(`server listning on port ${port}`)
})
