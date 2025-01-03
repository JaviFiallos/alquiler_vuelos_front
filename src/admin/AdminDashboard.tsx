import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FlightsManagement from "./FlightsManagement";
import AirlinesCreation from "./AirlinesCreation";
import ReservationsView from "./ReservationsView";
import "./AdminDashboard.css"; // Archivo de estilos

const AdminDashboard: React.FC = () => {
    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Panel de Administración</h1>
                <nav className="admin-nav">
                    <Link to="/admin/flights" className="nav-link">
                        Gestión de Vuelos
                    </Link>
                    <Link to="/admin/airlines" className="nav-link">
                        Creación de Aerolíneas
                    </Link>
                    <Link to="/admin/reservations" className="nav-link">
                        Visualización de Reservas
                    </Link>
                </nav>
            </header>

            <main className="admin-content">
                <Routes>
                    <Route path="flights" element={<FlightsManagement />} />
                    <Route path="airlines" element={<AirlinesCreation />} />
                    <Route path="reservations" element={<ReservationsView />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminDashboard;
