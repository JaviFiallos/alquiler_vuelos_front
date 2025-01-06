import { ICity } from "./ICity";

export interface IAirport {
    airport: string;
    airportId: number;
    cityId: ICity;
}