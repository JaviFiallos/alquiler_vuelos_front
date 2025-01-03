import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import RegistroCliente from "./registro/registro";
import AdminDashboard from "./admin/AdminDashboard"; // Importa el nuevo contenedor del panel admin

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistroCliente />} />
        
        {/* Ruta para el panel de administración */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
