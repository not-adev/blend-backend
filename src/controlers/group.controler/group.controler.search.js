import * as groupService from '../../services/group.service/group.service.serach.js'

export const groupSearchbyMode = async (req, res) => {
    try {
        const mode = req.params.mode
        if (mode.length === 0) {
            const error = new Error('mode is requierd for group search')
            error.status = 400
            throw error
        }
        const serviceCall = await groupService.searchByMode(mode)
        res.status(200).json({
            success: true,
            data: serviceCall.data,
        })
    } catch (error) {

        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
}


export const groupSearchbyName = async (req, res) => {
    try {
        const name = req.params.name
        if (name.length === 0) {
            const error = new Error('mode is requierd for group search')
            error.status = 400
            throw error
        }

        const serviceCall = await groupService.searchByName(name)
        res.status(200).json({
            success: true,
            data: serviceCall.data,
        })


    } catch (error) {

        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
}


export const groupSearchbyMember = async (req, res) => {
    try {
        const serviceCall = await groupService.searchByMember()
        res.status(200).json({
            success: true,
            data: serviceCall.data,
        })

    } catch (error) {

        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
}
