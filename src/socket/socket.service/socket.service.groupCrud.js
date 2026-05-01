import { Session } from "../../schema/schema.session.js";
import { Group } from '../../schema/shema.group.js'
import { User } from '../../schema/shema.user.js'
import mongoose from "mongoose";
export async function createRoom(groupId) {
    console.log("room creator called");

    const dbSession = await mongoose.startSession();

    try {
        dbSession.startTransaction();

        const groupData = await Group.findById(groupId).session(dbSession);

        if (!groupData) {
            const error = new Error("No Group Found");
            error.status = 400;
            throw error;
        }

        if (groupData.live) {
            const error = new Error("Session already running");
            error.status = 400;
            throw error;
        }

        const newSession = await Session.create(
            [
                {
                    group: groupId,
                    mode: groupData.mode,
                },
            ],
            { session: dbSession }
        );

        groupData.live = true;
        groupData.sessionId = newSession[0]._id;

        await groupData.save({ session: dbSession });

        await dbSession.commitTransaction();

        return {
            group: groupData,
            session: newSession[0],
        };

    } catch (error) {
        console.log(error)
        await dbSession.abortTransaction();
        throw error;

    } finally {
        await dbSession.endSession();
    }
}


export async function joinRoom(sessionId) {
    try {
        const sessionData = await Session.findById(sessionId)

        if (!sessionData) {
            const error = new Error('No Active Room Found')
            error.status = 400
            throw error
        }


        return sessionData;

    } catch (error) {
        console.log(error)
        throw error;
    }


}


export async function deleteRoom(sessionId) {
    console.log('db working ')
    const dbSession = await mongoose.startSession();

    try {
        dbSession.startTransaction();
        const session = await Session.findById(sessionId).session(dbSession);

        if (!session) {
            const error = new Error("Session not found");
            error.status = 404;
            throw error;
        }

        const groupId = session.group;

        await Session.findByIdAndDelete(sessionId).session(dbSession);

        await Group.findByIdAndUpdate(
            groupId,
            {
                $set: {
                    live: false,
                    sessionId: null,
                },
            },
            { new: true, session: dbSession }
        );

        await dbSession.commitTransaction();
        dbSession.endSession();

        return {
            message: "Session deleted and group updated",
        };

    } catch (error) {
        console.log(error)
        await dbSession.abortTransaction();
        dbSession.endSession();
        throw error;
    }
}
export async function leaveRoom(userId) {
    if (!userId) {
        const error = new Error("UserId is required");
        error.status = 400;
        throw error;
    }

    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    return user;
}   
