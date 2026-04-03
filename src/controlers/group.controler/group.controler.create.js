import * as groupCreateService from '../../services/group.service/group.service.create.js'
import { getAuth } from '@clerk/express';

export async function groupCreateControler(req, res) {
    try {
        const { name, mode } = req.body
        const { userId } = getAuth(req);
        const serviceCall = await groupCreateService.createGroup(name, userId, mode)
        res.status(200).json({
            success: true,
            message: "Group added succefully",
            data : serviceCall.data
        })

    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
}