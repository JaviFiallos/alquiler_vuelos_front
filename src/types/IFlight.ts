import { IAirline } from "./IAirline";
import { IAirport } from "./IAirport";

export interface IFlight {
    airlineId: IAirline;
    arrivalDate: string;
    departureDate: string;
    destinationAirportId: IAirport;
    originAirportId: IAirport;
    availableSeats: number;
    flightId: number;
    price: number;
    scales: number;
    type: string;
    isActive: boolean;
}