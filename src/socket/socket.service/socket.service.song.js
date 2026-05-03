import mongoose from 'mongoose'
import { StreamUrl } from '../../services/youtube/youtube.service.streamurl.js'
import { Queue } from '../../schema/schema.queue.js'
import { Session } from '../../schema/schema.session.js'

export async function addSong(
    title,
    artist,
    thumbnail,
    songId,
    position,
    addedBy,
    sessionId
) {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const youTubeServiceCall = await StreamUrl(songId)

        const newQueue = await Queue.create([{
            title,
            songId,
            position,
            addedBy,
            sessionId,
            streamUrl: youTubeServiceCall.streamUrl
        }], { session })

        await Session.findByIdAndUpdate(
            sessionId,
            { $push: { queue: newQueue[0]._id } },
            { session }
        )

        await session.commitTransaction()

        return {
            message: 'new song added to queue',
            title,
            thumbnail
        }

    } catch (error) {
        await session.abortTransaction()
        throw error
    } finally {
        session.endSession()
    }
}