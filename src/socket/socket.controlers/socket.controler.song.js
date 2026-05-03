import * as songService from '../socket.service/socket.service.song.js'
export async function addSong(io, socket, data) {
    try {
        console.log(data)
        const { title, thumbnailUrl, songId, sessionId } = data
        const userId = socket.data.userId
        console.log(title ,thumbnailUrl,songId,sessionId , userId)
        if (!title || !thumbnailUrl || !songId || !sessionId || !userId) {
            const error = new Error("Required params not given")
            error.status = 400
            throw error;
        }

        const serviceCall = await songService.addSong(title, thumbnailUrl, songId, sessionId, userId);
        io.to(sessionId).emit("song:added", serviceCall);

    } catch (error) {
        console.log(error)
        socket.emit("error", {
            message: error.message,
            status: error.status || 500
        });
    }

}

