import { Router } from "express";
import * as groupControler from '../../controlers/group.controler/group.controler.create.js'
export const groupCreateRoutes = Router()
groupCreateRoutes.post('/' ,groupControler.groupCreateControler)



