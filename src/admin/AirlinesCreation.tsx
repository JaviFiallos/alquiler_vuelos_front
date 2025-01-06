import React, { useState } from "react";
import "./AirlinesCreation.css";

const AirlinesCreation: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAirline, setCurrentAirline] = useState<any | null>(null); 
  const [airlines, setAirlines] = useState<any[]>([
    { id: 1, name: "Aeromexico", code: "AM001" },
    { id: 2, name: "LATAM Airlines", code: "LA456" },
  ]);
  const [formData, setFormData] = useState({ name: "", code: "" });

  const openModal = (airline?: any) => {
    if (airline) {
      // Si se pasa una aerolínea, significa que es modo edición
      setIsEditing(true);
      setFormData({ name: airline.name, code: airline.code });
      setCurrentAirline(airline); // Guardamos la aerolínea seleccionada para edición
    } else {
      // Si no se pasa una aerolínea, es el modo agregar (campos en blanco)
      setIsEditing(false);
      setFormData({ name: "", code: "" });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setFormData({ name: "", code: "" }); // Limpiar campos al cerrar
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && currentAirline) {
      // Si estamos editando, actualizamos la aerolínea
      setAirlines(airlines.map((airline) =>
        airline.id === currentAirline.id ? { ...airline, ...formData } : airline
      ));
    } else {
      // Si estamos agregando, agregamos una nueva aerolínea
      const newAirline = { id: airlines.length + 1, ...formData };
      setAirlines([...airlines, newAirline]);
    }
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="airlines-creation">
      <h2 className="title">Gestión de Aerolíneas</h2>

      {/* Botón para abrir el modal de agregar aerolínea */}
      <button className="btn" onClick={() => openModal()}>Agregar Aerolínea</button>

      {/* Modal de creación o edición de aerolínea */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="btn-close" onClick={closeModal}>X</button>
            <form className="airline-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nombre de la Aerolínea"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="code"
                placeholder="Código de la Aerolínea"
                className="input-field"
                value={formData.code}
                onChange={handleChange}
              />
              <button type="submit" className="btn">{isEditing ? "Actualizar" : "Agregar"} Aerolínea</button>
            </form>
          </div>
        </div>
      )}

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
          {airlines.map((airline) => (
            <tr key={airline.id}>
              <td>{airline.name}</td>
              <td>{airline.code}</td>
              <td>
                <button className="btn btn-edit" onClick={() => openModal(airline)}>Editar</button>
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
