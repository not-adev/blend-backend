import { Router } from "express";
import * as groupJoinControls from '../../controlers/group.controler/group.controler.join.js'
export const groupJoinRoutes = Router()
groupJoinRoutes.post('/' , groupJoinControls.groupJoinControler)



