import { makeRequest } from "./makeRequest";

export function videoGetForYou() {
    return makeRequest("/videos/foryou");
}

export function uploadVideo(formFields, setUploadPercentage) {
    return makeRequest(`/videos`, {
        method: "POST",
        data: formFields,
        headers: { 'Content-Type': 'multipart/form-data' },
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
