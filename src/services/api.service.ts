import axios from "axios";
export const url = "http://localhost:56622"
export const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});