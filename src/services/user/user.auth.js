import { User } from "../../schema/shema.user.js";
export const syncUser = async (clerkId, userName) => {

    try {
        // Check if user already exists
        let user = await User.findOne({ clerkId: clerkId });

        if (user) {
            return res.status(200).json({
                message: "User already exists",
                data: user,
            });
        }

        // Create new user
        user = await User.create({
            clerkId: clerkId,
            username: userName,
        });
        return {
            user
        }


    } catch (error) {
        throw error;
    }
}

