import React from "react";
import "./AirlinesCreation.css";

const AirlinesCreation: React.FC = () => {
  return (
    <div className="airlines-creation">
      {/* Título principal */}
      <h2 className="title">Gestión de Aerolíneas</h2>

      {/* Formulario para crear aerolíneas */}
      <form className="airline-form">
        <input
          type="text"
          placeholder="Nombre de la Aerolínea"
          className="input-field"
        />
        <input
          type="text"
          placeholder="Código de la Aerolínea"
          className="input-field"
        />
        <button type="submit" className="btn">Agregar Aerolínea</button>
      </form>

      {/* Tabla para listar aerolíneas */}
      <table className="airlines-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ejemplo Airlines</td>
            <td>EA123</td>
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

export default AirlinesCreation;



/*EJEMPLO DE COMO INTEGRAR CON EL BACKEND

import React, { useEffect, useState } from "react";
import "./AirlinesCreation.css";
import axios from "axios";

const AirlinesCreation: React.FC = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    // Llamada al backend para cargar aerolíneas
    axios.get("/api/airlines").then((response) => {
      setAirlines(response.data);
    });
  }, []);

  return (
    <div className="airlines-creation">
      <h2 className="title">Gestión de Aerolíneas</h2>
      <form className="airline-form">
        <input type="text" placeholder="Nombre de la Aerolínea" className="input-field" />
        <input type="text" placeholder="Código de la Aerolínea" className="input-field" />
        <button type="submit" className="btn">Agregar Aerolínea</button>
      </form>

      <table className="airlines-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {airlines.map((airline) => (
            <tr key={airline.id}>
              <td>{airline.name}</td>
              <td>{airline.code}</td>
              <td>
                <button className="btn btn-edit">Editar</button>
                <button className="btn btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AirlinesCreation;

*/
