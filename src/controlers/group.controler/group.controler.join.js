import { Group } from "../../schema/shema.group.js";
import { addUserToGroup } from "../../services/group.service/group.service.joinGroup.js";
import { addPendingRequest } from "../../services/group.service/group.service.joinGroup.js";
export async function groupJoinControler(req, res) {
    try {
        const { groupId } = req.body
        const userId = req.userId
        // Fetch only the required field
        const group = await Group.findById(groupId).select("publicPrivate");

        if (!group) {
            throw new Error("Group not found");
        }
        let serviceCall;
        // Check the field
        if (group.publicPrivate === true) {
            serviceCall = await addUserToGroup(groupId, userId);
        } else {
            serviceCall = await addPendingRequest(groupId, userId);
        }
        res.status(201).json({
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