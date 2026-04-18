import * as groupService from '../../services/group.service/group.service.serach.js'

export const groupSearchbyMode = async (req, res) => {
    try {
        const mode = req.params.mode
        if (!mode) {
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
        if (!name) {
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



export const searchGroupByStatus = async (req, res) => {
    try {
        const {page = 1, limit = 10 } = req.query;

       
        // Convert to numbers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const skip = (pageNumber - 1) * limitNumber;

        // Call service with pagination
        const serviceCall = await groupService.searchByStatus({
            skip,
            limit: limitNumber,
        });

        res.status(200).json({
            success: true,
            data: serviceCall.data,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(serviceCall.total / limitNumber),
                totalItems: serviceCall.total,
                limit: limitNumber,
            },
        });

    } catch (error) {
        const statusCode = error.status || 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};