import { Group } from "../../schema/shema.group.js";
import { User } from '../../schema/shema.user.js'
export async function createGroup(name, clerkId, mode, isPrivate) {
    try {
        
        const user = await User.findOne({ clerkId: clerkId })
        if (!user) {
            const error = new Error('User not verified')
            error.status = 400
            throw error
        }
        console.log(user)

        if (user.mygroups.length >= 1) {

            const error = new Error('One User Cant Have More Then One Group')
            error.status = 400
            throw error
        }
        const room = new Group({
            name,
            owner: user._id,
            mode,
            publicPrivate: isPrivate,
        });

        await room.save();

        user.mygroups.push(room._id);
        await user.save();

        return {
            data: room
        };

    } catch (error) {
        console.error("Create Group Service Error:", error);
        throw error;
    }

}
