import * as youtubeSearchService from '../../services/youtube/youtube.service.search.song.js'
export const search = async (req, res) => {
    try {
        const { keyword } = req.query
        const serviceCall = await youtubeSearchService.search(keyword)
        res.status(200).json({
            success: true,
            data: serviceCall.data
        })

    } catch (error) {

        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
}

export const getTrendingSongs = async (req, res) => {
    try {
        const serviceCall = await youtubeSearchService.getTrendingSongs()
        res.status(200).json({
            success: true,
            data: serviceCall.data
        })

    } catch (error) {

        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
}


export const getGeners = async (req, res) => {
    try {
       
        const generKeyword = req.params.generKeyword        
        const serviceCall = await youtubeSearchService.Geners(generKeyword)
        res.status(200).json({
            success: true,
            data: serviceCall.data
        })

    } catch (error) {

        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
}