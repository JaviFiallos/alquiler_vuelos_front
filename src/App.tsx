import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import RegistroCliente from "./registro/registro";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/" element={<Login />} />
         <Route path="/register" element={<RegistroCliente />} />
        {/* Rutas protegidas dentro del MainLayout */}

      </Routes>
    </Router>
  )
}

export default App
