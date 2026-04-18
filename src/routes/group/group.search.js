import { Router } from "express";
import * as gropuControlers from '../../controlers/group.controler/group.controler.search.js'
export const groupSearchRoutes = Router()
groupSearchRoutes.get('/:mode' , gropuControlers.groupSearchbyMode)
groupSearchRoutes.get('/:name' , gropuControlers.groupSearchbyName)
groupSearchRoutes.get('/' , gropuControlers.groupSearchbyMember) // loda lasson h ye 
groupSearchRoutes.get('/' , gropuControlers.searchGroupByStatus) // need to work 




