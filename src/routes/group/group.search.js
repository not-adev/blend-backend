import { Router } from "express";
import * as gropuControlers from '../../controlers/group.controler/group.controler.search.js'
export const groupSearchRoutes = Router()
groupSearchRoutes.get('/:mode' , gropuControlers.groupSearchbyMode)
groupSearchRoutes.get('/:name' , gropuControlers.groupSearchbyName)
groupSearchRoutes.get('/' , gropuControlers.groupSearchbyMember)




