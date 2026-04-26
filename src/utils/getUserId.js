import { getAuth } from "@clerk/express";
import { User } from "../schema/shema.user.js";

export async function getUserIdUsingGetAuth(req) {

  const { userId } = getAuth(req);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({ clerkId: userId });

  return user;

}



export async function getUserIdUsingClearkId(clearId) {
  if (!clearId) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({ clerkId: clearId });
  if (!user)  throw new Error("Unauthorized");
  return user;

}