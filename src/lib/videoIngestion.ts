import clipModel from "@/model/Clip";

export default async function videoIngestion(videoUrls: any[]) {
    for (const url of videoUrls) {
        console.log("Ingesting video:", url.videoId);
        try {
            const response = await fetch("https://6skx737c-8000.inc1.devtunnels.ms/transcript-schema", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: `https://youtube.com/watch?v=${url.videoId}` }),
            });
            if (!response.ok) {
                console.error(`Failed to ingest video ${url}:`, await response.json());
            } else {
                const data = await response.json();
                console.log(data);
                const clip = new clipModel({
                    video_id: data.videoId,
                    start_time: data.startTime,
                    end_time: data.endTime
                });
                await clip.save();
            }
        } catch (error) {
            console.error(`Error ingesting video ${url}:`, error);
        }
    }
}