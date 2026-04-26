import { verifyToken } from "@clerk/backend";
import { getUserIdUsingClearkId } from "../../utils/getUserId.js";
export async function socketCookieParser(socket, next) {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const userId = payload.sub;

    const mongoId = await getUserIdUsingClearkId(userId);

    socket.data.mongoId = mongoId;

    next();
  } catch (err) {
    console.log("Socket auth failed:", err.message);
    next(new Error("Unauthorized"));
  }
}