import { Router } from "express";
import * as userAuthControler from '../../controlers/user.controlers/user.controler.auth.js'
export const userAuthRouter = Router()
userAuthRouter.get('/' , userAuthControler.syncUserControler)




