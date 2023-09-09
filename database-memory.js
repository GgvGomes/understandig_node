import { randomUUID } from "crypto";

export class DatabaseMemory {
    #videos = new Map();

    list(search){
        return Array.from(this.#videos.entries()).map((videoArr) => {
            const id = videoArr[0];
            const video = videoArr[1];

            return {
                id,
                ...video
            }
        })
        .filter((video) => {
            if(!search) return true;

            return video.title.includes(search);
        });
    }

    create(video){
        const videoId = randomUUID();
        // Unique universal Id

        this.#videos.set(videoId, video);
    }

    update(id, video){
        this.#videos.set(id, video);
    }

    delet(id){
        this.#videos.delete(id);
    }
}