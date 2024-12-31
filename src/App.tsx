import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import RegistroCliente from "./registro/registro";
import FlightsCrud from "./admin/FlightsCrud";
import CreateAirlines from "./admin/CreateAirlines";
import ViewReservations from "./admin/ViewReservations";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistroCliente />} />
        <Route path="/admin/flights" element={<FlightsCrud />} />
        <Route path="/admin/airlines" element={<CreateAirlines />} />
        <Route path="/admin/reservations" element={<ViewReservations />} />
        {/* Rutas protegidas dentro del MainLayout */}

      </Routes>
    </Router>
  )
}

export default App
