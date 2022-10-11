import { makeRequest } from "./makeRequest";

export function followUser(followingId) {
    return makeRequest(`/user_following`, {
        method: "POST",
        data: {followingId},
    });
}

export function unfollowUser(followingId) {
    return makeRequest(`/user_following`, {
        method: "DELETE",
        data: {followingId},
    });
}