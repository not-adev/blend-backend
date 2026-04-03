import * as roomController from './socket.controlers/socket.controler.groupCrud'
export default function registerSocketHandlers(io, socket) {

  socket.on("room:create", (data) =>
    roomController.createRoom(io, socket, data)
  );

  socket.on("room:join", (data) =>
    roomController.joinRoom(io, socket, data)
  );

  socket.on("room:leave", (data) =>
    roomController.leaveRoom(io, socket, data)
  );

}