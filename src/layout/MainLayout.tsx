import React, { useState, useEffect } from "react";
import Sidebar from "../Home/sideBar";
import { Layout, Row, Col, Typography } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./mainLayout.css";
import logo from "../assets/logo.jpg";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  console.log("MainLayout montado");
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);

  // Detectar cuando el usuario hace scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShowFooter(true);  // Muestra el footer cuando se haga scroll hacia abajo
    } else {
      setShowFooter(false); // Oculta el footer si no se ha hecho scroll
    }
  };

  useEffect(() => {
    // Escuchar el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    // Elimina el rol si estuviera en el localStorage (ya no es necesario, pero lo dejamos por si se requiere en otro contexto)
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Renderiza Sidebar */}
      <Sidebar onLogout={handleLogout} />

      <Layout style={{ marginLeft: 70, height: "100%" }}>
        {/* Header */}
        <Header
          style={{
            backgroundColor: "#fff",
            padding: "0 16px",
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            height: 64, // Altura específica para el Header
          }}
        >
          <Row style={{ width: "100%", alignItems: "center" }}>
            {/* Logo */}
            <Col>
              <img
                src={logo}
                alt="Logo"
                style={{ height: 90 }}
              />
            </Col>

            {/* Título y Fondo con Imagen */}
            <Col span={20} style={{ position: "relative" }}>
              <Title
                level={2}
                style={{ margin: 0, textAlign: "center", color: "#1890ff" }}
              >
                FLY WITH US
              </Title>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  backgroundImage: 'url("/logo.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.1,
                  zIndex: 1,
                }}
              ></div>
            </Col>
          </Row>
        </Header>

        {/* Contenido Principal */}
        <Content
          style={{
            backgroundColor: "#f0f2f5",
            padding: "16px",
            minHeight: "calc(100vh - 64px)", // Altura total menos la del Header
          }}
        >
          <Outlet />
        </Content>

        {/* Footer */}
        {showFooter && (
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#f0f2f5",
              padding: "20px 0", // Ajusta el padding si es necesario
            }}
          >
            <div className="home-footer-sections">
              <div>
                <h4>Principales Destinos de Ecuador</h4>
                <ul>
                  <li>Guía de viaje</li>
                </ul>
              </div>
              <div>
                <h4>Información de la Empresa</h4>
              </div>
              <div>
                <h4>Seguridad y Privacidad</h4>
                <ul>
                  <li>Condiciones de uso</li>
                  <li>Aviso de privacidad</li>
                </ul>
              </div>
            </div>
            <p className="home-footer-copyright">
              © 2024 AutoPick - EFALKT. Todos los derechos reservados.
            </p>
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
