import * as roomController from './socket.controlers/socket.controler.groupCrud.js'
import * as songController from './socket.controlers/socket.controler.song.js'
import { addMemberToGroups } from '../utils/addMemberToGroup.js';
import { deleteRoom } from './socket.controlers/socket.controler.groupCrud.js';
export default function registerSocketHandlers(io, socket) {
  socket.on("join-user-groups", async (data) => {
    await addMemberToGroups(io, socket, data)
  })
  socket.on("room:create", async (data, callback) =>
    await roomController.createRoom(io, socket, data, callback)
  );

  socket.on("room:join", async (data) =>
    await roomController.joinRoom(io, socket, data)
  );

  socket.on("room:leave", async (data) =>

    await roomController.leaveRoom(io, socket, data)
  );

  socket.on("room:delete", async (data, callback) => {
    await roomController.deleteRoom(io, socket, data, callback)
  })

  socket.on("song:add", async (data) => {
    await songController.addSong(io, socket, data)
  })

  socket.on("disconnecting", async (data) => {
    if (socket.data.admin && socket.data.sessionId) {
      await deleteRoom(io,socket,data,()=>{});
      io.to(socket.data.groupId).emit("room:ended");
    }
  });



}