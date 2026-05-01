import { User } from "../../schema/shema.user.js";
import { Group } from "../../schema/shema.group.js";
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
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}


export async function getRequest(groupId) {
    try {
        const group = await User.findById(groupId)
            .populate("requests");

        if (!group) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        return {
            data: user.request
        };

    } catch (error) {
        throw error;
    }
}
