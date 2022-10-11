import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export function makeRequest(url, options) {
    return api(url, options)
        .then(res => res.data)
        .catch(err => {
            return Promise.reject(err?.response?.data?.message ?? "An error has occured")
    });
}