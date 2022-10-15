import { makeRequest } from "./makeRequest";

export function likeVideo(videoId) {
    return makeRequest(`/likes/video`, {
        method: "POST",
        data: { videoId },
        withCredentials: true
    });
}

export function unlikeVideo(videoId) {
    return makeRequest(`/likes/video`, {
        method: "DELETE",
        data: { videoId },
        withCredentials: true
    });
}

export function likeComment(commentId) {
    return makeRequest(`/likes/comment`, {
        method: "POST",
        data: { commentId },
        withCredentials: true
    });
}

export function unlikeComment(commentId) {
    return makeRequest(`/likes/comment`, {
        method: "DELETE",
        data: { commentId },
        withCredentials: true
    });
}