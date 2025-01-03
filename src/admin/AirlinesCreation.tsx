import React, { useState, useEffect } from "react";

interface Airline {
  id?: number;
  name: string;
}

const AirlinesCreation: React.FC = () => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [form, setForm] = useState<Airline>({ name: "" });

  // Simulación de datos del backend
  useEffect(() => {
    const fetchAirlines = async () => {
      // Aquí se deberá conectar con el backend para obtener los datos
      const response = await fetch("/api/airlines");
      const data = await response.json();
      setAirlines(data);
    };
    fetchAirlines();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí tu compañero implementará el POST para agregar aerolíneas
    console.log("Add airline:", form);

    // Simulamos agregar la nueva aerolínea a la lista
    setAirlines([...airlines, { id: Date.now(), name: form.name }]);
    setForm({ name: "" });
  };

  const handleDelete = async (id: number) => {
    // Aquí tu compañero implementará el DELETE
    console.log("Delete airline:", id);

    // Simulamos eliminar la aerolínea de la lista
    setAirlines(airlines.filter((airline) => airline.id !== id));
  };

  return (
    <div>
      <h1>Gestión de Aerolíneas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de la aerolínea"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Agregar Aerolínea</button>
      </form>

      <ul>
        {airlines.map((airline) => (
          <li key={airline.id}>
            {airline.name}
            <button onClick={() => handleDelete(airline.id!)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AirlinesCreation;
