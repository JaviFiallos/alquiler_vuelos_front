import axios from "axios";
export const url = "https://wcfflightsreservations.azurewebsites.net"
export const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});