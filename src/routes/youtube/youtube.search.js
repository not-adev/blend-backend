import { Router } from "express";
import * as youtubeControler from '../../controlers/youtube.controlers/youtube.controler.search.song.js'
export const youtubeSearchRoutes = Router()
youtubeSearchRoutes.get('/' , youtubeControler.search())
youtubeSearchRoutes.get('/trending' , youtubeControler.getTrendingSongs())
youtubeSearchRoutes.get('/gener/:generKeyword' , youtubeControler.getGeners())
