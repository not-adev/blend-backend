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
        const owner = await User.findById(groupData.owner).session(dbSession);

        if (owner.currentSessionId) {
            throw new Error("Owner already in another session");
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
        const user = await User.findByIdAndUpdate(
            groupData.owner,
            {
                $set: {
                    currentGroupId: groupData._id,
                    currentSessionId: groupData.sessionId
                }
            },
            { session: dbSession }
        );
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

export async function joinRoom(sessionId, userId) {
    const sessionData = await Session.findById(sessionId);

    if (!sessionData) {
        throw new Error("No Active Room Found");
    }

    const updatedUser = await User.findOneAndUpdate(
        {
            clerkId: userId,
            currentSessionId: { $in: [null, undefined] }
        },
        {
            $set: {
                currentSessionId: sessionId,
                currentGroupId: sessionData.group
            }
        },
        { new: true }
    );

    return {
        alreadyInSession: !updatedUser,
        sessionData
    };
}

export async function deleteRoom(userId) {
    const dbSession = await mongoose.startSession();

    try {
        dbSession.startTransaction();

        const user = await User.findOne({ clerkId: userId }).session(dbSession);

        if (!user || !user.currentSessionId) {
            const error = new Error("User is not in an active session");
            error.status = 400;
            throw error;
        }

        const sessionId = user.currentSessionId;

        const sessionDoc = await Session.findById(sessionId).session(dbSession);

        if (!sessionDoc) {
            const error = new Error("Session not found");
            error.status = 404;
            throw error;
        }

        const group = await Group.findById(sessionDoc.group).session(dbSession);

        if (!group) {
            const error = new Error("Group not found");
            error.status = 404;
            throw error;
        }

        const affectedUsers = [...new Set([...group.members, group.owner])];

        await Session.findByIdAndDelete(sessionId).session(dbSession);

        await Group.findByIdAndUpdate(
            group._id,
            {
                $set: {
                    live: false,
                    sessionId: null,
                },
            },
            { session: dbSession }
        );

        await User.updateMany(
            {
                _id: { $in: affectedUsers },
                currentSessionId: sessionId,
            },
            {
                $set: {
                    currentGroupId: null,
                    currentSessionId: null,
                },
            },
            { session: dbSession }
        );

        await dbSession.commitTransaction();


        return {
            message: "Session deleted",
            sessionId,
            groupId: group._id
        };

    } catch (error) {
        await dbSession.abortTransaction();

        throw error;
    }
    finally {
        dbSession.endSession();
    }
}
export async function leaveRoom(clerkId) {
    const user = await User.findOne({ clerkId });

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }
    const sessionId = user.currentSessionId
    const groupId = user.currentGroupId
    const group = await Group.findById(user.currentGroupId);

    if (!group) {
        const error = new Error("Group not found");
        error.status = 404;
        throw error;
    }


    if (group.owner.equals(user._id)) {
        await deleteRoom(clerkId);

        return {
            success: true,
            remove: "All",
            sessionId , 
            groupId ,
        };
    }

    user.currentGroupId = null;
    user.currentSessionId = null;

    await user.save();

    return {
        success: true,
        remove: "self",
        sessionId
    };
}


