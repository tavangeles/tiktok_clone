import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 2000
})

export function makeRequest(url, options) {
    return api(url, options)
        .then(res => res.data)
        .catch(err => {
            return Promise.reject(err?.response?.data?.message ?? "An error has occured")
    });
}