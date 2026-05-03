import { User } from "../schema/shema.user.js";
export async function addMemberToGroups(io, socket, data) {
    try {
        const userId = socket.data.userId;

        const user = await User.findOne({clerkId :userId}).populate("mygroups").populate('groups');

        if (!user) return;

        for (const group of user.mygroups) {
            socket.join(group._id.toString());
        }

        for (const group of user.groups) {
            socket.join(group._id.toString());
        }

        console.log(
            `Socket ${socket.id} joined ${user.mygroups.length + user.groups.length}  group rooms`
        );
    } catch (error) {
        console.error("Failed to join user groups:", error);
    }
}       