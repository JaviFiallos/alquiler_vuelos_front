import React from "react";
import { Typography, List, ListItem } from "@mui/material";

const AirportsList = ({ city, label }) => {
  const airports = [
    { airportId: 1, airport: "Mariscal Sucre", cityId: 1 },
    { airportId: 2, airport: "José Joaquín de Olmedo", cityId: 1 },
    { airportId: 3, airport: "Aeropuerto El Dorado", cityId: 2 },
    { airportId: 4, airport: "LaGuardia", cityId: 2 },
  ];

  // Filtrar aeropuertos de la ciudad seleccionada
  const filteredAirports = airports.filter((airport) => airport.cityId === city.cityId);

  return (
    <div>
      <Typography variant="h6">{label}</Typography>
      <List>
        {filteredAirports.map((airport) => (
          <ListItem key={airport.airportId}>
            {airport.airport}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AirportsList;
