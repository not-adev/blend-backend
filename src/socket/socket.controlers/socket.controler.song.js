export async function addSong(io, socket, data) {
    try {
        
        const room = await songService.addSong(groupId);
        socket.join(room._id.toString());
        socket.data.admin = true
        socket.sessionId = room._id.toString()
        socket.emit("room:created", room);
    } catch (error) {
        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });
    }

}

