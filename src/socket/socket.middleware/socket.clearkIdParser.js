import { getUserIdUsingClearkId } from "../../utils/getUserId.js";
import { verifyToken } from "@clerk/express";
import cookie from 'cookie'
export async function socketCookieParser(socket, next) {
    try {

        const cookies = cookie.parse(socket.handshake.headers.cookie || "");

        const token = cookies.__session;

        if (!token) {
            return next(new Error("Unauthorized"));
        }

        const payload = await verifyToken(token);

        const userId = payload.sub;
        const mongoId = await getUserIdUsingClearkId(userId)
        socket.data.mongoId = mongoId
        next();

    }
    catch (err) {
        next(new Error("Unauthorized"));
    }
}