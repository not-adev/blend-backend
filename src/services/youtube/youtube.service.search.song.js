import axios from "axios";

export async function search(keyword) {
    try {
        const axiosCall = await axios.get(`${process.env.YOU_TUBE_URL_HIT}&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&maxResult=10`)
        const data = axiosCall.data.items
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
        const data = axiosCall.data.items
        return {
            data: data
        }
    } catch (error) {
        throw error;
    }

}

export async function getGeners(generId) {
    try {
        const axiosCall = await axios.get(`${process.env.YOU_TUBE_URL_HIT}&key=${process.env.YOUTUBE_API_KEY}&topicId=${generId}&maxResult=10`)
        const data = axiosCall.data.items
        return {
            data: data
        }
    } catch (error) {
        throw error;
    }

}
