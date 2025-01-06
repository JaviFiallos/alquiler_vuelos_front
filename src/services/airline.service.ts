import { IAirline } from "../types/IAirline";
import { api } from "./api.service";

export const getAirlines = async (): Promise<IAirline[]> => {
    const response = await api.get(`/AirlineService.svc/airlines`);
    const data = response.data;
    return data;
};

export const createAirline = async (data: any): Promise<any> => {
    try {
        const response = await api.post(`/AirlineService.svc/airlines`, data);
        return response.data;
    } catch (error) {
        throw new Error("Error al crear el vuelo");
    }
};

export const updateAirline = async (airlineId: number, data: any): Promise<any> => {
    try {
        const response = await api.put(`/AirlineService.svc/airlines/${airlineId}`, data);
        return response.data;
    } catch (error) {
        throw new Error("Error al modificar el vuelo");
    }
};