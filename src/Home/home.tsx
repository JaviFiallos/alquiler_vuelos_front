import React from "react";
import { Layout } from "antd";
import FlightReservations from "../reservation/catalog";

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Content>
      <div className="home-container">
        {/* Header */}
        <header className="home-header">
          <h1 className="home-title">Reserva tu viaje ahora mismo</h1><br></br>
          <nav className="home-breadcrumb">
            <a href="/">Ubicaciones</a> &gt;
            <a href="/latin-america"> Latin America</a> &gt;
            <span>Ecuador</span>
          </nav>
        </header>

        {/* Main Content */}
        <div>
          <FlightReservations />
        </div>
      </div>
    </Content>
    
  );
};

export default Home;
