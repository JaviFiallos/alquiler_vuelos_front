import { IClient } from "./IClient";
import { IFlight } from "./IFlight";
import { IPayment } from "./IPayment";
import { IReservation } from "./IReservation"

export interface IReservationResponse {
    reservationId: IReservation;
    clientId: IClient
    flightId: IFlight
    reservationDate: string;
    status: string
    numberOfPassengers: number;
    paymentId: IPayment;
}