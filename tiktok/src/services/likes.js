import { makeRequest } from "./makeRequest";

export function likeVideo(videoId) {
    return makeRequest(`/likes/video`, {
        method: "POST",
        data: {videoId},
    });
}

export function unlikeVideo(videoId) {
    return makeRequest(`/likes/video`, {
        method: "DELETE",
        data: {videoId},
    });
}

export function likeComment(userId) {
    return makeRequest(`/likes/comment`, {
        method: "POST",
        data: {userId},
    });
}

export function unlikeComment(userId) {
    return makeRequest(`/likes/comment`, {
        method: "DELETE",
        data: {userId},
    });
}