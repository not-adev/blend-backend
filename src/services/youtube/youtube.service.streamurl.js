import { execFile } from "child_process";
export async function StreamUrl(vedioID) {
    try {
        const url = `${process.env.YOU_TUBE_WATCH_UR}&v=${vedioID}`
        execFile("yt-dlp", ["-f", "bestaudio", "-g", url], (err, stdout) => {
            if (err){
                const error = new Error(err.message)
                error.status = 500 
                throw error
            };
            console.log("Safe Audio URL:", stdout.trim());
            return {
                StreamUrl: stdout.trim()
            }
        });

    } catch (error) {
        throw error;
    }



}   