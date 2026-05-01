import { Router } from "express";
import * as recentSongsControler from '../../controlers/recentSong.controler/recentSong.js'
import { getUserId } from "../../middleware/middleware.getuserId.js";
export const recentSongsRoutes = Router()
recentSongsRoutes.post('/' ,getUserId,recentSongsControler.addRecentSongs)
recentSongsRoutes.get('/' ,getUserId, recentSongsControler.getRecentSongs)