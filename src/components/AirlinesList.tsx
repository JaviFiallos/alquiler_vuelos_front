import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

// Definición de tipos
interface Airport {
  airportId: number;
  airport: string;
}

interface Airline {
  airlineId: number;
  airline: string;
  originAirportId: number;
  destinationAirportId: number;
}

interface AirlinesListProps {
  selectedOrigin: Airport;
  selectedDestination: Airport;
  onAirlineSelect: (airline: Airline) => void;
}

const AirlinesList: React.FC<AirlinesListProps> = ({ selectedOrigin, selectedDestination, onAirlineSelect }) => {
  // Lista de aerolíneas de ejemplo
  const airlines: Airline[] = [
    { airlineId: 1, airline: "LATAM Airlines", originAirportId: 1, destinationAirportId: 2 },
    { airlineId: 2, airline: "Avianca", originAirportId: 2, destinationAirportId: 1 },
    { airlineId: 3, airline: "American Airlines", originAirportId: 3, destinationAirportId: 4 },
  ];

  // Filtramos las aerolíneas según los aeropuertos seleccionados
  const filteredAirlines = airlines.filter(
    (airline) =>
      airline.originAirportId === selectedOrigin.airportId &&
      airline.destinationAirportId === selectedDestination.airportId
  );

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Airlines
      </Typography>
      {filteredAirlines.map((airline) => (
        <Card
          key={airline.airlineId}
          onClick={() => onAirlineSelect(airline)}
          style={{ marginBottom: "10px", cursor: "pointer" }}
        >
          <CardContent>
            <Typography variant="body2">{airline.airline}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AirlinesList;
