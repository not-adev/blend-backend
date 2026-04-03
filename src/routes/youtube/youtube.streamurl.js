import { Router } from "express";
export const youtubeStreamUrl = Router()
youtubeStreamUrl.get('/:id' , youtubeStreamUrl.getStreamUrl())
