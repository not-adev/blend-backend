import mongoose from "mongoose";
import { Group } from "../../schema/shema.group.js";
import { User } from "../../schema/shema.user.js";
export async function addUserToGroup(groupId, userId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Add user to group members
        await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } }, // prevents duplicates
            { session }
        );

        // Add group to user's groups
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { groups: groupId } }, // prevents duplicates
            { session }
        );

        await session.commitTransaction();
        return {
            succes: true,
        }
    } catch (error) {
        console.error("Error adding user:", error.message);
        throw error
    }
    finally {
        session.endSession();

    }
}


export const addPendingRequest = async (groupId, userId) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            {
                $addToSet: { requests: userId } // prevents duplicate requests
            },
            {
                new: true, // returns updated document
                runValidators: true
            }
        );

        if (!updatedGroup) {
            throw new Error("Group not found");
        }

        console.log("Request added successfully");

        return {
            message : true 

        };

    } catch (error) {
        console.error("Error adding request:", error.message);
        throw error 
    }
};

