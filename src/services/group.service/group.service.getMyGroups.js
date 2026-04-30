import { User } from "../../schema/shema.user.js";

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