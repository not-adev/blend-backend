
import mongoose from "mongoose";
const recentSongsSchema = new mongoose.Schema({
    artist: {
        type : String ,
        required : true 
    } , 
    songName : {
        type : String , 
        required : true 
    } , 
    imageUrl :{
        type : String , 
        required : true,
    } ,
    youtubeId  :{
        type : String ,
        required : true 
    }
})

export const RecentSongs = mongoose.model("RecentSongs",recentSongsSchema )