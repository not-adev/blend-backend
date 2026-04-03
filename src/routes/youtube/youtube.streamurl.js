import * as youtubeStreamControler from '../../controlers/youtube.controlers/youtube.controler.streamurl.js'
import { Router } from "express";
export const youtubeStreamUrl = Router()
youtubeStreamUrl.get('/:id' , youtubeStreamControler.getStreamUrl)
