import { makeRequest } from "./makeRequest";

export function getVideosForYou() {
    return makeRequest("/videos/foryou");
}

export function getVidoesFollowing() {
    return makeRequest("/videos/following");
}

export function uploadVideo(formFields, setUploadPercentage) {
    return makeRequest(`/videos`, {
        method: "POST",
        data: formFields,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (data) => {
             setUploadPercentage(Math.round((data.loaded / data.total) * 100));
        }
    });
}

export function updateVideoDetails(videoId, formFields) {
    return makeRequest(`/videos/${videoId}`, {
        method: "PUT",
        data: formFields,
    });
}

export function videoSearch(search) {
    return makeRequest(`/videos/search/${search}`);
}