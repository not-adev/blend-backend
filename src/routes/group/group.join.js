import { Router } from "express";
import { getUserId } from "../../middleware/middleware.getuserId.js";
import * as groupJoinControls from '../../controlers/group.controler/group.controler.join.js'
export const groupJoinRoutes = Router()
groupJoinRoutes.post('/' ,getUserId, groupJoinControls.groupJoinControler)



