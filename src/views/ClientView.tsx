import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import CitiesSearch from "../components/CitiesSearch";
import FlightsList from "../components/FlightsList";
import { ICity } from "../types/ICity";

interface Flight {
  flightId: number;
  airline: string;
  originAirportId: number;
  destinationAirportId: number;
  departureDate: string;
  arrivalDate: string;
  price: number;
}

interface Airport {
  airportId: number;
  airport: string;
  cityId: number;
}

const ClientView: React.FC = () => {
  const [selectedOriginCity, setSelectedOriginCity] = useState<ICity | null>(null);
  const [selectedDestinationCity, setSelectedDestinationCity] = useState<ICity | null>(null);
  const [flights] = useState<Flight[]>([]);

  const allFlights: Flight[] = [
    {
      flightId: 1,
      airline: "LATAM Airlines",
      originAirportId: 1,
      destinationAirportId: 2,
      departureDate: "2025-01-05T08:00:00",
      arrivalDate: "2025-01-05T10:00:00",
      price: 250.0,
    },
    {
      flightId: 2,
      airline: "Avianca",
      originAirportId: 2,
      destinationAirportId: 4,
      departureDate: "2025-01-06T14:00:00",
      arrivalDate: "2025-01-06T16:30:00",
      price: 450.0,
    },
  ];

  const airports: Airport[] = [
    { airportId: 1, airport: "Mariscal Sucre", cityId: 1 },
    { airportId: 2, airport: "José Joaquín de Olmedo", cityId: 1 },
    { airportId: 3, airport: "Aeropuerto El Dorado", cityId: 2 },
    { airportId: 4, airport: "LaGuardia", cityId: 2 },
  ];

  // Filtrar vuelos por las ciudades de origen y destino seleccionadas
  const getFilteredFlights = (): Flight[] => {
    if (!selectedOriginCity || !selectedDestinationCity) return [];

    const originAirports = airports.filter(
      (airport) => airport.cityId === selectedOriginCity.cityId
    );
    const destinationAirports = airports.filter(
      (airport) => airport.cityId === selectedDestinationCity.cityId
    );

    return allFlights.filter(
      (flight) =>
        originAirports.some((airport) => airport.airportId === flight.originAirportId) &&
        destinationAirports.some((airport) => airport.airportId === flight.destinationAirportId)
    );
  };

  // Obtener vuelos filtrados
  const filteredFlights = getFilteredFlights();

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to FlightsDB
      </Typography>
      <Grid container spacing={3}>
        {/* Buscador de Ciudad de Origen */}
        <Grid item xs={12} md={6}>
          <CitiesSearch
            label="Select Origin City"
            onCitySelect={(city: ICity) => setSelectedOriginCity(city)}
          />
        </Grid>

        {/* Buscador de Ciudad de Destino */}
        <Grid item xs={12} md={6}>
          <CitiesSearch
            label="Select Destination City"
            onCitySelect={(city: ICity) => setSelectedDestinationCity(city)}
          />
        </Grid>

        {/* Vuelos disponibles */}
        <Grid item xs={12}>
          <FlightsList flights={filteredFlights} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientView;
