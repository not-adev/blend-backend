import * as roomController from './socket.controlers/socket.controler.groupCrud'
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

}