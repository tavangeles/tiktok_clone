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

export function userRegister(formFields) {
    return makeRequest(`/users/register`, {
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