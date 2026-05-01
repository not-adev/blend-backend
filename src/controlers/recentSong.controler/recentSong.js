import * as recentSongService from '../../services/recentSong.service/recentSong.service.js'
export const addRecentSongs = async (req, res) => {
    try {
        const { streamUrl, title, thumbnailUrl, channelTitle } = req.body;

        const userId = req.userId;

        if (!streamUrl || !title || !thumbnailUrl || !channelTitle) {
            return res.status(400).json({
                success: false,
                message: "streamUrl is required",
            });
        }
        const songData = {
            streamUrl,
            title,
            thumbnailUrl,
            channelTitle,
        };
        // console.log(songData)
        const seviceCall = await recentSongService.addRecentSongs(userId, songData)
        return res.status(200).json({
            success: true,
            data: seviceCall.data,
        });

    } catch (error) {
        console.log(error)
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
};


export const getRecentSongs = async (req, res) => {
    try {
        const userId = req.userId
        const seviceCall = await recentSongService.setRecentSongs(userId)
        return res.status(200).json({
            success: true,
            data: seviceCall.data,
        });

    } catch (error) {
        console.log(error)
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
}
