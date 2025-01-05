import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import RegistroCliente from "./registro/registro";
import ClientView from "./views/ClientView";
import AdminDashboard from "./admin/AdminDashboard"; // Importa el nuevo contenedor del panel admin
import ReservationHistory from "./client/ReservationHistory";


function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/" element={<Login />} />
        
        {/* Ruta pública para registro */}
        <Route path="/register" element={<RegistroCliente />} />
        
        {/* Ruta pública para la vista del cliente */}
        <Route path="/client" element={<ClientView />} />

        {/* Ruta para el panel de administración */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Ruta para el panel de reservas del cliente */}
        <Route path="/client/reservations" element={<ReservationHistory />} />

      </Routes>
    </Router>
  );
}

export default App;




