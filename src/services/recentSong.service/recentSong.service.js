import { User } from "../../schema/shema.user.js";
export async function addRecentSongs(userId, songData) {
    try {
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        user.recentSongs = user.recentSongs.filter(
            (song) => song.title !== songData.title
        );

        user.recentSongs.unshift(songData);

        if (user.recentSongs.length > 14) {
            user.recentSongs = user.recentSongs.slice(0, 14);
        }

        await user.save();
        return {
            success: true,
            data: user.recentSongs
        }
    } catch (error) {
        console.log(error)
        throw error
    }

}


export async function setRecentSongs(userId,) {
    try {
        const user = await User.findOne({ clerkId : userId }).select('recentSongs');

        if (!user) {
           const error = new Error("user not found")
        }

        return {
            data : user.recentSongs
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}