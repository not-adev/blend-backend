import { Session } from "../../schema/schema.session.js";
import { Group } from '../../schema/shema.group.js'
import { User } from '../../schema/shema.user.js'

export async function createRoom(groupId) {
    try {
        const groupData = await Group.findById(groupId)
        if (!groupData) {
            const error = new Error('No Group Found')
            error.status = 400
            throw error
        }

        if (groupData.live) {
            const error = new Error("Session already running");
            error.status = 400;
            throw error;
        }


        const session = new Session({
            group: groupId,
            mode: groupData.mode
        });

        await session.save()
        groupData.live = true
        groupData.sessionId = session._id

        await groupData.save()

        return {
            group: groupData,
            session: session
        }

    } catch (error) {
        throw error;
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
        throw error;
    }


}


export async function deleteRoom(sessionId) {

    const session = await Session.findById(sessionId);

    if (!session) {
        const error = new Error("Session not found");
        error.status = 404
        throw error;
    }

    const groupId = session.group;

    // delete the session
    await Session.findByIdAndDelete(sessionId);

    // update the corresponding group
    await Group.findByIdAndUpdate(
        groupId,
        {
            $unset: { session: "" },  // remove session reference
            $set: { live: false }
        }, // remove live 
        { new: true }
    );

    return {
        message: "Session deleted and group updated"
    };
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
