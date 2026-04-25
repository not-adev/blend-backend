import axios from "axios";

export async function search(keyword) {
    try {
        const axiosCall = await axios.get(`${process.env.YOU_TUBE_URL_HIT}&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&maxResult=10`)
        const data = axiosCall.data.items
        console.log(data)
        return {
            data: data
        }
        
    } catch (error) {
        throw error;
    }

}

export async function getTrendingSongs() {
    try {
        const keyword = 'trending songs'
        const axiosCall = await axios.get(`${process.env.YOU_TUBE_URL_HIT}&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&maxResults=15`)
        console.log(axiosCall.data)
        const data = axiosCall.data.items
        return {
            data: data
        }
    } catch (error) {
        console.log(error.message)
        throw error;
    }

}

export async function getGeners(gener) {
    const genreMap = {
  PopHits: "pop songs trending",
  Phonk: "rock music playlist",
  Chill: "chill music lofi",
  Phonk: "phonk beats",
  Lofi: "lofi hip hop beats",
  HipHop: "hip hop songs",
  Indie : "indie songs " ,
  Romantic : "Romantice new songs",
  Rock :"new Rock songs",
  Electronic : "Electronic songs ",
  Sad : "Sad songs new ",
  Party : "new Party songs "

};
    try {
       const axiosCall = await axios.get(process.env.YOU_TUBE_URL_HIT, {
  params: {
    key: process.env.YOUTUBE_API_KEY,
    q: gener, // e.g. "rock songs", "lofi beats"
    maxResults: 10,
    part: "snippet",
    type: "video",
  },
});      const data = axiosCall.data.items
        return {
            data: data
        }
    } catch (error) {
        throw error;
    }

}
