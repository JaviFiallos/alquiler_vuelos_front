import React from "react";
import { TextField } from "@mui/material";
import { ICity } from "../types/ICity";

interface CitiesSearchProps {
  label: string;
  onCitySelect: (city: ICity) => void;
}

const CitiesSearch: React.FC<CitiesSearchProps> = ({ label, onCitySelect }) => {
  const cities: ICity[] = [
    { cityId: 1, city: "Quito" },
    { cityId: 2, city: "Bogotá" },
    { cityId: 3, city: "New York" },
    { cityId: 4, city: "Los Angeles" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cityName = event.target.value;
    const selectedCity = cities.find((city) => city.city.toLowerCase() === cityName.toLowerCase());
    if (selectedCity) {
      onCitySelect(selectedCity);
    }
  };

  return (
    <TextField
      label={label}
      fullWidth
      onChange={handleChange}
      variant="outlined"
      select
      SelectProps={{
        native: true,
      }}
    >
      <option value="">Select City</option>
      {cities.map((city) => (
        <option key={city.cityId} value={city.city}>
          {city.city}
        </option>
      ))}
    </TextField>
  );
};

export default CitiesSearch;
