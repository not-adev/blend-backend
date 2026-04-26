import { User } from "../../schema/shema.user.js";
export const syncUser = async (clerkId, userName,email) => {

    try {
        // Check if user already exists
        let user = await User.findOne({ clerkId: clerkId });

        if (user) {
            return {
                message: "User already exists",
                user: user,
            };
        }

        // Create new user
        user = await User.create({
            clerkId: clerkId,
            username: userName,
            email : email
        });
        return {
            user : user
        }


    } catch (error) {
        throw error;
    }
}

