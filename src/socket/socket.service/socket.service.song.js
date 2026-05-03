import mongoose from 'mongoose'
import { StreamUrl } from '../../services/youtube/youtube.service.streamurl.js'
import { Queue } from '../../schema/schema.queue.js'
import { Session } from '../../schema/schema.session.js'
import { User } from '../../schema/shema.user.js'
export async function addSong(
    title,
    thumbnailUrl,
    songId,
    sessionId,
    userId
) {
    const session = await mongoose.startSession()

    try {
        const youTubeServiceCall = await StreamUrl(songId)
        if (!youTubeServiceCall.streamUrl) {
            const error = new Error("No stream url found")
            error.status = 500
            throw error
        }
        session.startTransaction()
        const user = await User.findOne({ clerkId: userId }).session(session)
        if (!user) {
            const error = new Error("no User found")
            error.status = 404
            throw error
        }

        const newQueue = await Queue.create([{
            title,
            thumbnailUrl ,
            songId,
            addedBy: user.username || "NO user",
            sessionId,
            streamUrl: youTubeServiceCall.streamUrl
        }], { session })

        const updatedSession = await Session.findByIdAndUpdate(
            sessionId,
            { $push: { queue: newQueue[0]._id } },
            { session, new: true }
        )

        if (!updatedSession) {
            const error = new Error("Session not found")
            error.status = 404
            throw error
        }



        await session.commitTransaction()
        const populatedSession = await Session.findById(sessionId)
            .populate("queue");

        return {
            message: "new song added to queue",
            queue: populatedSession.queue,
            currentIndex: populatedSession.currentIndex,
            wholeSession : populatedSession
        };

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction()
        }
        throw error
    } finally {
        await session.endSession()
    }
}