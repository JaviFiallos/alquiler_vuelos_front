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
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistroCliente />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/reservation-history" element={<ReservationHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




