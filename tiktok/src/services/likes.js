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

export function likeComment(commentId) {
    return makeRequest(`/likes/comment`, {
        method: "POST",
        data: {commentId},
    });
}

export function unlikeComment(commentId) {
    return makeRequest(`/likes/comment`, {
        method: "DELETE",
        data: {commentId},
    });
}