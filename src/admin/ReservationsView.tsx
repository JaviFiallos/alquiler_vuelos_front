import React from "react";
import "./ReservationsView.css";

const ReservationsView: React.FC = () => {
  return (
    <div className="reservations-view">
      {/* Título principal */}
      <h2 className="title">Visualización de Reservas</h2>

      {/* Tabla para mostrar reservas */}
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Vuelo</th>
            <th>Asientos</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Pérez</td>
            <td>EA123 (Quito - Guayaquil)</td>
            <td>2</td>
            <td>$200</td>
            <td>
              <button className="btn btn-delete">Cancelar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsView;
