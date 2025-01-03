import React, { useState, useEffect } from "react";

interface Reservation {
  id: number;
  clientName: string;
  flight: string;
  passengers: number;
  reservationDate: string;
  status: string; // Activa, Cancelada, Completada
}

const ReservationsView: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Simulación de datos desde el backend
  useEffect(() => {
    const fetchReservations = async () => {
      // Aquí se deberá conectar con el backend para obtener los datos
      const response = await fetch("/api/reservations");
      const data = await response.json();
      setReservations(data);
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h1>Visualización de Reservas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Vuelo</th>
            <th>Pasajeros</th>
            <th>Fecha de Reserva</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.clientName}</td>
                <td>{reservation.flight}</td>
                <td>{reservation.passengers}</td>
                <td>{new Date(reservation.reservationDate).toLocaleString()}</td>
                <td>{reservation.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay reservas registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsView;
