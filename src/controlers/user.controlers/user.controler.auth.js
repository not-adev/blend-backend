import * as userAuthService from '../../services/user/user.auth.js'
export const syncUserControler = async (req, res) => {


    try {
        const clerkId = req.userId;
        const { userName } = req.body

        if (!clerkId || !userName) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const serviceCall = await userAuthService.syncUser(clerkId, userName)
        res.status(201).json({
            message: "User created successfully",
            data : serviceCall.user,
        });

    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal Server Error"
        });


    }

}
