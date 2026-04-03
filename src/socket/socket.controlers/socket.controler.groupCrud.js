import * as roomService from '../socket.service/socket.service.groupCrud.js'
export async function createRoom(io, socket, data) {
    try {

        const { groupId } = data
        // check if a group id is provided 
        if (!groupId) {
            const error = new Error("Group Id is required")
            error.status = 404
            error.succes = false
            throw error;
        }
        const room = await roomService.createRoom(groupId);
        socket.join(room._id.toString());
        socket.data.admin = true
        socket.sessionId = room._id.toString()
        socket.data.groupId = groupId.toString()
        socket.emit("room:created", room); s
    } catch (error) {
        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });
    }

}


export async function joinRoom(io, socket, data) {
    try {

        const { sessionId } = data

        // check if a session id is provided 
        if (!sessionId) {
            const error = new Error("Not a live room availible ")
            error.status = 404
            error.succes = false
            throw error;
        }
        const room = await roomService.joinRoom(sessionId); //check if a valid session exists 

        // check if user not already in a group
        if (socket.rooms.size > 1) {
            const error = new Error("Already in a group")
            error.status = 400
            throw error;
        }

        // join the room 
        socket.join(room._id.toString());

        // updated socket data 
        socket.data.admin = false
        socket.sessionId = room._id.toString()
        socket.data.groupId = groupId.toString()
        // emit to user 
        socket.emit("room:joined", room);
    } catch (error) {
        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });
    }

}

export async function leaveRoom(io, socket, data) {
    try {

        const sessionId = socket.data.sessionId;
        const isAdmin = socket.data.admin

        if (!sessionId) {
            const error = new Error("User is not in any room");
            error.status = 400;
            throw error;
        }

        // If user is admin → delete room
        if (isAdmin) {
            const serviceCall = await roomService.deleteRoom(sessionId)


            // notify everyone in room
            io.to(sessionId).emit("room:deleted", {
                message: "Room deleted by admin"
            });

            // make all users leave
            const sockets = await io.in(sessionId).fetchSockets();

            sockets.forEach(s => {
                s.leave(sessionId);
                s.data.sessionId = null;
                s.data.groupId = null;
            });

        }
        // If normal user → leave room
        else {

            socket.leave(sessionId);

            socket.emit("room:left", {
                message: "You left the room"
            });

            // notify others
            const serviceCall = await roomService.leaveRoom(socket.data.mongoId)

            socket.to(sessionId).emit("user:left", {
                userId: socket.data.mongoId,
                username: serviceCall.username
            });

        }

        // cleanup socket data
        socket.data.sessionId = null;
        socket.data.admin = false;
        socket.data.groupId = null;

    } catch (error) {

        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });

    }
}

