import { StreamUrl } from '../../services/youtube/youtube.service.streamurl.js'
import { Queue } from '../../schema/schema.queue.js'
import { Session } from '../../schema/schema.session.js'
export async function addSong(title, artist, thumbnail, songId, position, addedBy, sessionId) {
    try {
        const youTubeServiceCall = await StreamUrl(songId)
        const obj = {
            title,
            artist,
            songId,
            position,
            addedBy,
            sessionId,
            streamUrl: youTubeServiceCall.streamUrl
        }
        const newQueue = new Queue(obj)
        await newQueue.save()
        await Session.findByIdAndUpdate(sessionId, {
            $push: { queue: newQueue._id }
        })
        return {
            message: 'new song aded to queue',
            title: title,
            thumbnail: thumbnail
        }

    } catch (error) {
        throw error ;

    }
}