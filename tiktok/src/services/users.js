import { makeRequest } from "./makeRequest";

export function userGetAccountDetails() {
    return makeRequest(`/users`);
}

export function userLogin(formFields) {
    return makeRequest(`/users/login`, {
        method: "POST",
        data: formFields,
    });
}

export function userLogout() {
    return makeRequest(`/users/logout`, {
        method: "POST",
    });
}

export function userRegister(formFields) {
    return makeRequest(`/users`, {
        method: "POST",
        data: formFields,
    });
}

export function userGetSuggestions() {
    return makeRequest(`/users/suggestions`);
}

export function getUserDetails(username) {
    return makeRequest(`/users/${username}`);
}

export function updateUser(formFields) {
    return makeRequest(`/users`, {
        method: "PUT",
        data: formFields,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}

export function userSearch(search) {
    return makeRequest(`/users/search/${search}`);
}