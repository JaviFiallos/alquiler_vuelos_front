import { api } from "./api.service";
import { IReservation } from "../types/IReservation";
import { IReservationResponse } from "../types/IReservationResponse";

export const getReservations = async (): Promise<IReservationResponse[]> => {
    const response = await api.get(`/ReservationService.svc/reservations`);
    const data = response.data;
    return data;
};

export const getReservationsByClient = async (clientId: number): Promise<IReservation[]> => {
    const response = await api.get(`/ReservationService.svc/reservations/client/${clientId}`);
    const data = response.data;
    return data;
};

export const createReservation = async (data: any): Promise<any> => {
    try {
        const response = await api.post(`/ReservationService.svc/reservations`, data);
        return response.data;
    } catch (error) {
        throw new Error("Error al crear el vuelo");
    }
};

export const updateReservation = async (reservationId: number, data: any): Promise<any> => {
    try {
        const response = await api.put(`/ReservationService.svc/reservations/${reservationId}`, data);
        return response.data;
    } catch (error) {
        throw new Error("Error al modificar el vuelo");
    }
};

export const cancelReservation = async (reservationId: number) => {
    try {
        await api.delete(`/ReservationService.svc/reservations/${reservationId}`);
    } catch (error) {
    }
};