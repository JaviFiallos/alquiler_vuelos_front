//FUNCIONAL--------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ReservationHistory.css";

// interface Reservation {
//     id: number;
//     flight: string;
//     date: string;
//     seats: number;
//     status: string; // "completed" o "active"
//     total: number;
// }

// const ReservationHistory: React.FC = () => {
//     const [reservations, setReservations] = useState<Reservation[]>([]);

//     useEffect(() => {
//         // Llamada al backend para cargar las reservas del cliente
//         axios.get("/api/client/reservations").then((response) => {
//             setReservations(response.data);
//         });
//     }, []);

//     // Manejar la cancelación de una reserva
//     const handleCancel = (id: number) => {
//         if (confirm("¿Está seguro de que desea cancelar esta reserva?")) {
//             axios.delete(`/api/client/reservations/${id}`).then(() => {
//                 setReservations((prev) => prev.filter((res) => res.id !== id));
//             });
//         }
//     };

//     // Manejar la modificación de una reserva
//     const handleModify = (id: number) => {
//         const newSeats = prompt("Ingrese la nueva cantidad de asientos:");
//         if (newSeats && parseInt(newSeats) > 0) {
//             axios.put(`/api/client/reservations/${id}`, { seats: parseInt(newSeats) }).then(() => {
//                 setReservations((prev) =>
//                     prev.map((res) =>
//                         res.id === id ? { ...res, seats: parseInt(newSeats), total: res.total / res.seats * parseInt(newSeats) } : res
//                     )
//                 );
//             });
//         }
//     };

//     return (
//         <div className="reservation-history">
//             <h2 className="title">Historial de Reservas</h2>
//             <table className="reservations-table">
//                 <thead>
//                     <tr>
//                         <th>Vuelo</th>
//                         <th>Fecha</th>
//                         <th>Asientos</th>
//                         <th>Total</th>
//                         <th>Estado</th>
//                         <th>Acciones</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {reservations.map((reservation) => (
//                         <tr key={reservation.id}>
//                             <td>{reservation.flight}</td>
//                             <td>{reservation.date}</td>
//                             <td>{reservation.seats}</td>
//                             <td>${reservation.total.toFixed(2)}</td>
//                             <td>{reservation.status === "completed" ? "Completada" : "Activa"}</td>
//                             <td>
//                                 {reservation.status === "active" && (
//                                     <>
//                                         <button
//                                             className="btn btn-modify"
//                                             onClick={() => handleModify(reservation.id)}
//                                         >
//                                             Modificar
//                                         </button>
//                                         <button
//                                             className="btn btn-cancel"
//                                             onClick={() => handleCancel(reservation.id)}
//                                         >
//                                             Cancelar
//                                         </button>
//                                     </>
//                                 )}
//                                 {reservation.status === "completed" && (
//                                     <span className="no-actions">-</span>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ReservationHistory;






//DATOS SIMULADOS--------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import "./ReservationHistory.css";

interface Reservation {
    id: number;
    flight: string;
    date: string;
    seats: number;
    status: string; // "completed" o "active"
    total: number;
}

const ReservationHistory: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        // Datos simulados
        const mockData: Reservation[] = [
            {
                id: 1,
                flight: "Vuelo 123 - Quito a Guayaquil",
                date: "2025-01-10 15:30",
                seats: 2,
                status: "active",
                total: 150.0,
            },
            {
                id: 2,
                flight: "Vuelo 456 - Guayaquil a Cuenca",
                date: "2025-01-12 12:00",
                seats: 1,
                status: "completed",
                total: 75.0,
            },
            {
                id: 3,
                flight: "Vuelo 789 - Cuenca a Quito",
                date: "2025-01-15 18:00",
                seats: 3,
                status: "active",
                total: 225.0,
            },
            {
                id: 4,
                flight: "Vuelo 475 - Cuenca a Quito",
                date: "2025-01-15 18:00",
                seats: 3,
                status: "active",
                total: 225.0,
            },
        ];

        setReservations(mockData);
    }, []);

    const handleCancel = (id: number) => {
        if (confirm("¿Está seguro de que desea cancelar esta reserva?")) {
            setReservations((prev) => prev.filter((res) => res.id !== id));
        }
    };

    const handleModify = (id: number) => {
        const newSeats = prompt("Ingrese la nueva cantidad de asientos:");
        if (newSeats && parseInt(newSeats) > 0) {
            setReservations((prev) =>
                prev.map((res) =>
                    res.id === id
                        ? { ...res, seats: parseInt(newSeats), total: res.total / res.seats * parseInt(newSeats) }
                        : res
                )
            );
        }
    };

    return (
        <div className="reservation-history">
            <h2 className="title">Historial de Reservas</h2>
            <table className="reservations-table">
                <thead>
                    <tr>
                        <th>Vuelo</th>
                        <th>Fecha</th>
                        <th>Asientos</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.flight}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.seats}</td>
                            <td>${reservation.total.toFixed(2)}</td>
                            <td>{reservation.status === "completed" ? "Completada" : "Activa"}</td>
                            <td>
                                {reservation.status === "active" && (
                                    <>
                                        <button
                                            className="btn btn-modify"
                                            onClick={() => handleModify(reservation.id)}
                                        >
                                            Modificar
                                        </button>
                                        <button
                                            className="btn btn-cancel"
                                            onClick={() => handleCancel(reservation.id)}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                )}
                                {reservation.status === "completed" && (
                                    <span className="no-actions">-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationHistory;



