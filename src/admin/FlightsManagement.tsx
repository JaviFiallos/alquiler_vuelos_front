import React, { useState } from "react";
import "./FlightsManagement.css";

interface Flight {
  airline: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  type: string;
  price: number;
  stops: number;
  seats: number;
}

const FlightsManagement: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFlight, setCurrentFlight] = useState<Flight | null>(null);

  const flights: Flight[] = [
    {
      airline: "Ejemplo Airlines",
      origin: "Quito",
      destination: "Guayaquil",
      departure: "2025-01-01T08:00",
      arrival: "2025-01-01T10:00",
      type: "Directo",
      price: 100,
      stops: 0,
      seats: 100,
    },
    // Agrega más vuelos aquí si es necesario
  ];

  // Función para abrir el modal en modo edición o agregar
  const openModal = (flight: Flight | null = null) => {
    if (flight) {
      setCurrentFlight(flight);
      setIsEditing(true);
    } else {
      setCurrentFlight({
        airline: "",
        origin: "",
        destination: "",
        departure: "",
        arrival: "",
        type: "",
        price: 0,
        stops: 0,
        seats: 0,
      });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentFlight(null);
    setModalOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para guardar el vuelo (ya sea editado o nuevo)
    console.log("Vuelo guardado:", currentFlight);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (currentFlight) {
      const { name, value } = e.target;
      setCurrentFlight({
        ...currentFlight,
        [name]: value,
      });
    }
  };

  return (
    <div className="flights-management">
      <h2 className="title">Gestión de Vuelos</h2>

      <button className="btn" onClick={() => openModal()}>
        Agregar Vuelo
      </button>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="btn-close" onClick={closeModal}>
              X
            </button>
            <form className="flight-form" onSubmit={handleFormSubmit}>
              <select
                className="input-field"
                value={currentFlight?.airline || ""}
                name="airline"
                onChange={handleChange}
              >
                <option>Aerolínea</option>
                {/* Agrega opciones de aerolíneas */}
              </select>
              <input
                type="text"
                placeholder="Origen"
                className="input-field"
                value={currentFlight?.origin || ""}
                name="origin"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Destino"
                className="input-field"
                value={currentFlight?.destination || ""}
                name="destination"
                onChange={handleChange}
              />
              <input
                type="datetime-local"
                className="input-field"
                value={currentFlight?.departure || ""}
                name="departure"
                onChange={handleChange}
              />
              <input
                type="datetime-local"
                className="input-field"
                value={currentFlight?.arrival || ""}
                name="arrival"
                onChange={handleChange}
              />
              <select
                className="input-field"
                value={currentFlight?.type || ""}
                name="type"
                onChange={handleChange}
              >
                <option>Tipo</option>
                <option value="Directo">Directo</option>
                <option value="Escalas">Con Escalas</option>
              </select>
              <input
                type="number"
                placeholder="Precio"
                className="input-field"
                value={currentFlight?.price || ""}
                name="price"
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Escalas"
                className="input-field"
                value={currentFlight?.stops || ""}
                name="stops"
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Asientos"
                className="input-field"
                value={currentFlight?.seats || ""}
                name="seats"
                onChange={handleChange}
              />
              <button type="submit" className="btn">
                {isEditing ? "Actualizar Vuelo" : "Agregar Vuelo"}
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="flights-table">
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
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.airline}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.departure}</td>
              <td>{flight.arrival}</td>
              <td>{flight.type}</td>
              <td>${flight.price}</td>
              <td>{flight.stops}</td>
              <td>{flight.seats}</td>
              <td>
                <button className="btn btn-edit" onClick={() => openModal(flight)}>
                  Editar
                </button>
                <button className="btn btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightsManagement;
