import * as youtubeStreamUrlService from '../../services/youtube/youtube.service.streamurl.js'

export const getStreamUrl = async (req, res) => {

    try {
        const vidId = req.params.id
        const serviceCall = await youtubeStreamUrlService.StreamUrl(vidId)
        res.status(200).json({
            success: true,
            data: serviceCall.StreamUrl
        })

    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}