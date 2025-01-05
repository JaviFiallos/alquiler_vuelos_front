import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import RegistroCliente from "./registro/registro";
//import ClientView from "./views/ClientView";
import AdminDashboard from "./admin/AdminDashboard"; // Importa el nuevo contenedor del panel admin
import MainLayout from "./layout/MainLayout";
import ReservationHistory from "./client/ReservationHistory";
import Home from "./Home/home";



function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/" element={<Login />} />
        {/* Ruta pública para registro */}
        <Route path="/register" element={<RegistroCliente />} />
        {/* Ruta para el panel de administración */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Rutas con el layout principal */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/reservation-history" element={<ReservationHistory />} />
          {/* <Route path="/client" element={<ClientView />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




