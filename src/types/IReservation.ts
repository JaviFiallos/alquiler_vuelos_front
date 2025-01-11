import { IFlight } from "./IFlight";
import { IUser } from "./IUser";

export interface IReservation {
    reservationId: number;
    userId: IUser;
    flightId: IFlight;
    reservationDate: string;
    status: string;
    numberOfPassengers: number;
}