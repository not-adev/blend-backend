import { Router } from "express";
import { getUserId } from "../../middleware/middleware.getuserId.js";
import * as groupControler from '../../controlers/group.controler/group.controler.create.js'
export const groupCreateRoutes = Router()
groupCreateRoutes.post('/create' ,getUserId ,groupControler.groupCreateControler)



