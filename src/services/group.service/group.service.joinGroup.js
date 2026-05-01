import mongoose from "mongoose";
import { Group } from "../../schema/shema.group.js";
import { User } from "../../schema/shema.user.js";
export async function addUserToGroup(groupId, userId) {
    const session = await mongoose.startSession();
    console.log("adding to group ")

    try {
        session.startTransaction();

        // Check if group exists
        const group = await Group.findById(groupId).session(session);
        if (!group) throw new Error("Group not found");

        // Check if user exists
        const user = await User.findOne({ clerkId: userId }).session(session);
        if (!user) throw new Error("User not found");
        // chcek if adim
        if (user._id === group.owner) {
            return {
                success: true,
                message: "Admin is already a part of group ",
                groupId,
                userId,
            };
        }
        // Add user to group
        await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: user._id } },
            { session }
        );

        // Add group to user
        await User.findOneAndUpdate({
            clerkId: userId
        },
            { $addToSet: { groups: groupId } },
            { session }
        );

        await session.commitTransaction();

        return {
            success: true,
            message: "User added to group",
            groupId,
            userId,
        };

    } catch (error) {
        await session.abortTransaction();
        console.error("Error adding user:", error.message);

        throw error;

    } finally {
        session.endSession();
    }
}

export const addPendingRequest = async (groupId, userId) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const group = await Group.findById(groupId).session(session);
        if (!group) throw new Error("Group not found");

        const user = await User.findOne({ clerkId: userId }).session(session);
        if (!user) throw new Error("User not found");

        // Admin already part of group
        if (user._id.equals(group.owner)) {
            console.log("admin ")
            await session.commitTransaction();

            return {
                success: true,
                message: "Admin is already a part of group",
            };
        }

        // Already member
        if (group.members.some((id) => id.equals(user._id))) {
            await session.commitTransaction();

            return {
                success: false,
                message: "User already in group",
            };
        }

        // Already requested
        if (group.requests.some((id) => id.equals(user._id))) {
            await session.commitTransaction();

            return {
                success: false,
                message: "Request already sent",
            };
        }

        group.requests.push(user._id);
        await group.save({ session });

        await session.commitTransaction();

        return {
            success: true,
            message: "Request sent successfully",
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};