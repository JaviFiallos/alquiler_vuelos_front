import { IAirport } from "../types/IAirport";
import { api } from "./api.service";

export const getAirports = async (): Promise<IAirport[]> => {
    const response = await api.get(`/AirportService.svc/airports`);
    const data = response.data;
    return data;
};