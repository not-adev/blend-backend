import { Group } from "../../schema/shema.group.js";
import { User } from '../../schema/shema.user.js'
export async function createGroup(name, clerkId,mode) {
    try {
        const user = await User.findOne({ clerkId: clerkId })
        if (!user) {
            const error = new Error('User not verified')
            error.status = 400
            throw error
        }

        const exist = await Group.findone({ owner: user._id })
        if (exist) {
            const error = new Error('One User Cant Have More Then One Group')
            error.status = 400
            throw error
        }
        const room = new Group({
            name,
            owner: user._id,
            mode
        });

        await room.save();

        return {
            data: room
        };

    } catch (error) {
        throw error;
    }

}
