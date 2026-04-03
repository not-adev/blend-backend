import * as songService from '../socket.service/socket.service.song.js'
export async function addSong(io, socket, data) {
    try {
        const { title, artist, thumbnail, songId, position } = data
        const addedBy = socket.data.mongoId
        const sessionId = socket.data.sessionId
        if (!title || !artist || !thumbnail || !songId || !position || !sessionId || !addedBy) {
            const error = new Error("Required params not given")
            error.status = 400
            throw error;
        }
        const serviceCall = await songService.addSong(title, artist, thumbnail, songId, position, addedBy, sessionId);
        io.to(groupName).emit("Song:added",serviceCall );

    } catch (error) {
        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });
    }

}

