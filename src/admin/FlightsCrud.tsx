import React, { useState, useEffect } from "react";

interface Flight {
  id?: number;
  airline: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  type: string;
  price: number;
  scales: number;
  availableSeats: number;
}

const FlightsCrud: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [form, setForm] = useState<Flight>({
    airline: "",
    origin: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
    type: "",
    price: 0,
    scales: 0,
    availableSeats: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Simulación de datos del backend
  useEffect(() => {
    // Aquí tu compañero conectará el backend
    const fetchFlights = async () => {
      const response = await fetch("/api/flights");
      const data = await response.json();
      setFlights(data);
    };
    fetchFlights();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      // Tu compañero puede implementar aquí el PUT
      console.log("Edit flight:", form);
    } else {
      // Tu compañero puede implementar aquí el POST
      console.log("Add flight:", form);
    }
    setForm({
      airline: "",
      origin: "",
      destination: "",
      departureDate: "",
      arrivalDate: "",
      type: "",
      price: 0,
      scales: 0,
      availableSeats: 0,
    });
    setIsEditing(false);
  };

  const handleEdit = (flight: Flight) => {
    setForm(flight);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    // Tu compañero puede implementar aquí el DELETE
    console.log("Delete flight:", id);
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  return (
    <div>
      <h1>Gestión de Vuelos</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="airline" placeholder="Aerolínea" value={form.airline} onChange={handleInputChange} required />
        <input type="text" name="origin" placeholder="Origen" value={form.origin} onChange={handleInputChange} required />
        <input type="text" name="destination" placeholder="Destino" value={form.destination} onChange={handleInputChange} required />
        <input type="datetime-local" name="departureDate" value={form.departureDate} onChange={handleInputChange} required />
        <input type="datetime-local" name="arrivalDate" value={form.arrivalDate} onChange={handleInputChange} required />
        <select name="type" value={form.type} onChange={handleInputChange} required>
          <option value="">Tipo</option>
          <option value="Primera Clase">Primera Clase</option>
          <option value="Económica">Económica</option>
          <option value="Ejecutiva">Ejecutiva</option>
        </select>
        <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleInputChange} required />
        <input type="number" name="scales" placeholder="Escalas" value={form.scales} onChange={handleInputChange} required />
        <input type="number" name="availableSeats" placeholder="Asientos disponibles" value={form.availableSeats} onChange={handleInputChange} required />
        <button type="submit">{isEditing ? "Actualizar" : "Agregar"} Vuelo</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Aerolínea</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Salida</th>
            <th>Llegada</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Escalas</th>
            <th>Asientos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.airline}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.departureDate}</td>
              <td>{flight.arrivalDate}</td>
              <td>{flight.type}</td>
              <td>{flight.price}</td>
              <td>{flight.scales}</td>
              <td>{flight.availableSeats}</td>
              <td>
                <button onClick={() => handleEdit(flight)}>Editar</button>
                <button onClick={() => handleDelete(flight.id!)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightsCrud;

