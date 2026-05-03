import * as roomService from '../socket.service/socket.service.groupCrud.js'
export async function createRoom(io, socket, data, callback) {
    try {

        const { groupId } = data
        // check if a group id is provided 
        console.log("room creation", groupId)
        if (!groupId) {
            const error = new Error("Group Id is required")
            error.status = 404
            error.succes = false
            throw error;
        }
        const serviceCall = await roomService.createRoom(groupId);
        socket.join(serviceCall.session._id.toString());
        socket.data.admin = true
        io.to(groupId).emit('room:live', serviceCall)

        callback({
            success: true,
            data : serviceCall
        });
    } catch (error) {
        console.log(error)
        callback({
            success: false,
            message: error.message,
            data : {}
        });

        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });
    }

}


export async function joinRoom(io, socket, data) {
    try {

        const { sessionId, mode, _id: groupId } = data
        const userId = socket.data.userId
        // check if a session id is provided 
        if (!sessionId || !mode || !groupId || !userId) {
            const error = new Error("Not a live room availible ")
            error.status = 404
            error.succes = false
            throw error;
        }

        // check if user is alredy in a live session 


        const room = await roomService.joinRoom(sessionId, userId); //check if a valid session exists 
        if (room.alreadyInSession) {
            throw new Error("User already in another active room");
        }
        // join the room 
        socket.join(room.sessionData._id.toString());
        // updated socket data 
        socket.data.admin = false
        console.log(room)
        // emit to user 
        socket.emit("room:joined", room);
    } catch (error) {
        console.log(error)
        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });
    }

}

export async function leaveRoom(io, socket, callback) {
    try {
        const userId = socket.data.userId;

        const serviceCall = await roomService.leaveRoom(userId);
        const { sessionId } = serviceCall;

        if (serviceCall.remove === "All") {
            io.to(sessionId).emit("room:ended", {
                message: "Room deleted by admin",
            });

            const roomSockets = await io.in(sessionId).fetchSockets();

            for (const memberSocket of roomSockets) {
                memberSocket.leave(sessionId);
                memberSocket.data.admin = false;
            }

            callback({
                success: true,
                roomDeleted: true,
            });

            return;
        }

        socket.leave(sessionId);
        socket.data.admin = false;


        if (typeof callback === "function") {
            callback({ success: true });
        }


    } catch (error) {
        console.log(error);


        if (typeof callback === "function") {
            callback({ success: false });
        }

        socket.emit("error", {
            message: error.message,
            status: error.status || 500,
        });
    }
}

export async function deleteRoom(io, socket, data = {}, callback) {
    try {
        console.log("delete room called")
        const userId = socket.data.userId
        const serviceCall = await roomService.deleteRoom(userId)
        const { sessionId, groupId } = serviceCall
        const roomSockets = await io.in(sessionId).fetchSockets();

        io.to(sessionId).emit("room:ended", {
            groupId,
            sessionId
        });

        for (const memberSocket of roomSockets) {
            memberSocket.leave(sessionId);
            memberSocket.data.admin = false;

        }

        callback({
            success: true,
            message: "Room deleted successfully",
        });

    } catch (error) {
        console.log(error)

        callback({
            success: false,
            message: error.message,
        });

        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });
    }
}


