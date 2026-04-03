import * as roomController from './socket.controlers/socket.controler.groupCrud.js'
import * as songController from './socket.controlers/socket.controler.song.js'
export default function registerSocketHandlers(io, socket) {

  socket.on("room:create",async (data) =>
    await roomController.createRoom(io, socket, data)
  );

  socket.on("room:join", async (data) =>
   await roomController.joinRoom(io, socket, data)
  );

  socket.on("room:leave", async (data) =>
   await roomController.leaveRoom(io, socket, data)
  );

  socket.on("song:add" , async(data)=>{
    await songController.addSong(io,socket,data)
  })

  
  
}