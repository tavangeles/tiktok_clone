import { makeRequest } from "./makeRequest";

export function getVideoComments(videoId) {
    return makeRequest(`/comments/video/${videoId}`);
}

export function createVideoComment(videoId, comment) {
    return makeRequest(`/comments/video`, {
        method: "POST",
        data: {videoId, comment},
    });
}