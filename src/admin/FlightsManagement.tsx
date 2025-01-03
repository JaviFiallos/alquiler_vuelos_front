import React from "react";
import "./FlightsManagement.css";

const FlightsManagement: React.FC = () => {
  return (
    <div className="flights-management">
      <h2 className="title">Gestión de Vuelos</h2>
      <form className="flight-form">
        <select className="input-field">
          <option>Aerolínea</option>
        </select>
        <input type="text" placeholder="Origen" className="input-field" />
        <input type="text" placeholder="Destino" className="input-field" />
        <input type="datetime-local" className="input-field" />
        <input type="datetime-local" className="input-field" />
        <select className="input-field">
          <option>Tipo</option>
        </select>
        <input type="number" placeholder="Precio" className="input-field" />
        <input type="number" placeholder="Escalas" className="input-field" />
        <input type="number" placeholder="Asientos" className="input-field" />
        <button type="submit" className="btn">Agregar Vuelo</button>
      </form>
      
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
          <tr>
            <td>Ejemplo Airlines</td>
            <td>Quito</td>
            <td>Guayaquil</td>
            <td>01/01/2025 08:00</td>
            <td>01/01/2025 10:00</td>
            <td>Directo</td>
            <td>$100</td>
            <td>0</td>
            <td>100</td>
            <td>
              <button className="btn btn-edit">Editar</button>
              <button className="btn btn-delete">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlightsManagement;
