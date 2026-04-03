import { execFile } from "child_process";

export async function StreamUrl(videoID) {
    const url = `${process.env.YOU_TUBE_WATCH_URL}&v=${videoID}`;
    try {
        return new Promise((resolve, reject) => {
            execFile("yt-dlp", ["-f", "bestaudio", "-g", url], (err, stdout) => {
                if (err) {
                    const error = new Error(err.message);
                    error.status = 500;
                    return reject(error); // reject the promise
                }
                const streamUrl = stdout.trim();
                console.log("Safe Audio URL:", streamUrl);
                resolve({ StreamUrl: streamUrl }); // resolve the promise
            });
        });

    } catch (error) {
        throw error ;
    }

}