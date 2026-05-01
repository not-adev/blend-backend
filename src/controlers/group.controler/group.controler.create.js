import * as groupCreateService from '../../services/group.service/group.service.create.js'
import * as getGroupService from '../../services/group.service/group.service.getMyGroups.js';
import { getAuth } from '@clerk/express';

export async function groupCreateControler(req, res) {
    try {
        const { name, mode, isPrivate } = req.body
        console.log(name, mode, isPrivate)

        if (!name || !mode || typeof isPrivate !== "boolean") {
            const error = new Error('Name and mode are required')
            error.status = 400
            throw error
        }
        const userId = req.userId;
        const serviceCall = await groupCreateService.createGroup(name, userId, mode, isPrivate)
        res.status(200).json({
            success: true,
            message: "Group added succefully",
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



export async function groupGetMyGroupsControler(req, res) {
    try {

        const userId = req.userId;
        const serviceCall = await getGroupService.getMyGroups(userId)
        res.status(200).json({
            success: true,
            message: "Group added succefully",
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



export async function groupGetOwnedGroupsControler(req, res) {

    try {

        const userId = req.userId;
        const serviceCall = await getGroupService.getOWnedGroups(userId)
        res.status(200).json({
            success: true,
            message: "Group added succefully",
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


export async function groupGoliveControler(req, res) {
    try {
        const { groupId, status } = req.query
        console.log(groupId)
        const serviceCall = await getGroupService.goLive(groupId, status)
        res.status(200).json({
            success: true,
            message: "toggle done ",
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



export async function groupRequestControler(req, res) {
    try {
        const { groupId } = req.query
        console.log(groupId)
        const serviceCall = await getGroupService.getRequest(groupId)
        res.status(200).json({
            success: true,
            message: "Group Deleted succefully ",
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



export async function groupDeleteControler(req, res) {
    try {
        const { groupId } = req.query
        console.log(groupId)
        const serviceCall = await getGroupService.deleteGroup(groupId)
        res.status(200).json({
            success: true,
            message: "Group Deleted succefully ",
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

