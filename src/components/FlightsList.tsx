import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

// Definición de tipos
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
}

interface FlightsListProps {
  flights: Flight[];
}

const FlightsList: React.FC<FlightsListProps> = ({ flights }) => {
  const airports: Airport[] = [
    { airportId: 1, airport: "Mariscal Sucre" },
    { airportId: 2, airport: "José Joaquín de Olmedo" },
    { airportId: 3, airport: "Aeropuerto El Dorado" },
    { airportId: 4, airport: "LaGuardia" },
  ];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Available Flights
      </Typography>
      {flights.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No flights available for this route.
        </Typography>
      ) : (
        flights.map((flight) => {
          const origin = airports.find((a) => a.airportId === flight.originAirportId);
          const destination = airports.find((a) => a.airportId === flight.destinationAirportId);

          return (
            <Card key={flight.flightId} style={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography variant="h6">{flight.airline}</Typography>
                <Typography variant="body2">
                  <strong>From:</strong> {origin?.airport || "Unknown"}{" "}
                  <strong>To:</strong> {destination?.airport || "Unknown"}
                </Typography>
                <Typography variant="body2">
                  <strong>Departure:</strong> {flight.departureDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Arrival:</strong> {flight.arrivalDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> ${flight.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default FlightsList;
