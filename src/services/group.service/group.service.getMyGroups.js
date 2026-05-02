import { User } from "../../schema/shema.user.js";
import { Group } from "../../schema/shema.group.js";
import mongoose from "mongoose";
export async function getMyGroups(userId) {
    try {
        const user = await User.findOne({ clerkId: userId })
            .populate("groups");

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        return {
            data: user.groups
        };

    } catch (error) {
        console.log(error)
        throw error;
    }
}


export async function getOWnedGroups(userId) {
    try {
        const user = await User.findOne({ clerkId: userId })
            .populate("mygroups");

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        return {
            data: user.mygroups
        };

    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function goLive(groupId, status) {
    try {
        const group = await Group.findByIdAndUpdate(
            groupId,
            { $set: { live: !status } },
            { new: true }
        );

        return { data: group }
    } catch (error) {
        console.log(error)
        throw error;
    }
}


export async function deleteGroup(groupId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const group = await Group.findByIdAndDelete(groupId).session(session);

        if (!group) {
            throw new Error("Group not found");
        }

        await User.updateMany(
            { groups: groupId },
            { $pull: { groups: groupId } },
            { session }
        );

        await session.commitTransaction();

        return {
            data: {
                message: "Group deleted successfully",
            },
        };
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}


export async function getRequest(groupId) {
    try {
        console.log(groupId)
        const group = await Group.findById(groupId)
            .populate("requests");

        console.log(group.requests)
        if (!group) {
            const error = new Error("no pending request");
            error.status = 200;
            throw error;
        }
        return {
            data: group
        };

    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function acceptRequest(userId, groupId) {
    console.log("huuhuhu")
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { groups: groupId } },
            { new: true, session }
        );
        console.log(user)

        if (!user) {

            throw new Error("No such user");
        }
        const group = await Group.findByIdAndUpdate(
            groupId,
            {
                $pull: { requests: userId },
                $push: { members: userId }
            },
            {
                returnDocument: "after",
                session
            }
        );

        if (!group) {
            throw new Error("No such group");
        }
        await session.commitTransaction();
        return {
            data: group.requests
        };

    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}


export async function rejectRequest(userId, groupId) {
    try {
        const group = await Group.findByIdAndUpdate(
            groupId,
            { $pull: { requests: userId } },
            { new: true }
        );

        if (!group) {
            throw new Error("No such group");
        }
        return {
            data: group.requests
        };

    } catch (error) {
        console.log(error)
        throw error;
    }
}