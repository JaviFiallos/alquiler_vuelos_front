import React, { useState } from "react";
import FlightsManagement from "./FlightsCrud";
import AirlinesCreation from "./AirlinesCreation";
import ReservationsView from "./ReservationsView";

const AdminDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState("flights");

    return (
    <div>
        <header>
        <h1>Panel de Administración</h1>
        <nav>
            <button onClick={() => setActiveView("flights")}>Gestión de Vuelos</button>
            <button onClick={() => setActiveView("airlines")}>Creación de Aerolíneas</button>
            <button onClick={() => setActiveView("reservations")}>Visualización de Reservas</button>
        </nav>
        </header>
        
        <main>
        {activeView === "flights" && <FlightsManagement />}
        {activeView === "airlines" && <AirlinesCreation />}
        {activeView === "reservations" && <ReservationsView />}
        </main>
    </div>
    );
};

export default AdminDashboard;
