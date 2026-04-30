import mongoose from "mongoose";
import { Group } from "../../schema/shema.group.js";
import { User } from "../../schema/shema.user.js";

export async function createGroup(name, clerkId, mode, isPrivate) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findOne({ clerkId }).session(session);

        if (!user) {
            const error = new Error("User not verified");
            error.status = 400;
            throw error;
        }

        if (user.mygroups.length >= 1) {
            const error = new Error("One User Cant Have More Than One Group");
            error.status = 400;
            throw error;
        }

        const room = await Group.create(
            [
                {
                    name,
                    owner: user._id,
                    mode,
                    publicPrivate: isPrivate,
                    live: false,
                },
            ],
            { session }
        );

        user.mygroups.push(room[0]._id);
        await user.save({ session });

        await session.commitTransaction();

        return {
            data: room[0],
        };
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}