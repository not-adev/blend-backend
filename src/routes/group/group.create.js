import { Router } from "express";
import { getUserId } from "../../middleware/middleware.getuserId.js";
import * as groupControler from '../../controlers/group.controler/group.controler.create.js'
export const groupCrudRoutes = Router()
groupCrudRoutes.post('/create' ,getUserId ,groupControler.groupCreateControler)
groupCrudRoutes.get('/getGroups' ,getUserId ,groupControler.groupGetMyGroupsControler)
groupCrudRoutes.get('/getOwedGruops' ,getUserId ,groupControler.groupGetOwnedGroupsControler)




