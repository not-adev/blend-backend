import { Group } from "../../schema/shema.group";

export async function searchByMode(mode) {
    try {
        const data = await Group.find({ mode: mode })
        if (data.length === 0) {
            const error = new Error('No group with matching mode')
            error.status = 200
            throw error
        }
        return {
            data: data
        }
    } catch (error) {
        throw error;
    }

}



export async function searchByName(name) {
    try {
        const data = await Group.find({ Name: name })
        if (data.length === 0) {
            const error = new Error('No group with matching name')
            error.status = 200
            throw error
        }
        return {
            data: data
        }
    } catch (error) {
        throw error;
    }

}



export async function searchByMember() {
    try {
        const data = await Group.aggregate([
            { $unwind: "$members" },
            {
                $group: {
                    _id: "$members",
                    members: { $sum: 1 }
                }
            },
            { $sort: { members: -1 } },
            { $limit: 10 },
            {
                $setWindowFields: {
                    sortBy: { members: -1 },
                    output: {
                        rank: { $rank: {} }
                    }
                }
            },
            {
                $project: {
                    _id: "$rank",
                    members: 1
                }
            }
        ]).toArray();
        if (data.length === 0) {
            const error = new Error('No group found')
            error.status = 200
            throw error
        }
        return {
            data: data
        }
    } catch (error) {
        throw error;
    }

}







