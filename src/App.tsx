import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import RegistroCliente from "./registro/registro";
import ClientView from "./views/ClientView";

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
        
      </Routes>
    </Router>
  );
}

export default App;
 