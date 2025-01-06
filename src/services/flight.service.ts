import { api } from "./api.service";
import { IFlight } from "../types/IFlight";
import { ICity } from "../types/ICity";

export const getFlights = async (): Promise<IFlight[]> => {
    const response = await api.get(`/FlightService.svc/flights`);
    const data = response.data;
    return data;
};

export const getCities = async (): Promise<ICity[]> => {
    const response = await api.get(`/CityService.svc/cities`);
    const data = response.data;
    return data;
};

export const createFlight = async (vehicleData: any): Promise<any> => {
    try {
        const response = await api.post(`/FlightService.svc/flights`, vehicleData);
        return response.data;
    } catch (error) {
        throw new Error("Error al crear el vehículo");
    }
};

export const updateFlight = async (vehicleId: number, vehicleData: any): Promise<any> => {
    try {
        const response = await api.put(`/FlightService.svc/flights/${vehicleId}`, vehicleData);
        return response.data;
    } catch (error) {
        throw new Error("Error al crear el vehículo");
    }
};

export const deleteFlight = async (vehicleId: number) => {
    try {
        await api.delete(`/FlightService.svc/flights/${vehicleId}`);
    } catch (error) {
    }
};