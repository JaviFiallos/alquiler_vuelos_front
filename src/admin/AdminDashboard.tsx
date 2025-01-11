import React from "react";
import { Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { EditOutlined, FileSearchOutlined, LogoutOutlined } from "@ant-design/icons";
import FlightsManagement from "./FlightsManagement";
import AirlinesCreation from "./AirlinesCreation";
import ReservationsView from "./ReservationsView";

const { Header, Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Definir las rutas para la navegación
  const menuItems = [
    { key: "flights", icon: <EditOutlined />, label: "Gestión de Vuelos", to: "/admin/flights" },
    { key: "airlines", label: "Creación de Aerolíneas", to: "/admin/airlines" },
    { key: "reservations", icon: <FileSearchOutlined />, label: "Visualización de Reservas", to: "/admin/reservations" },
  ];

  // Función de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Eliminar el token del localStorage
    navigate("/"); // Redirigir al login
  };

  return (
    <Layout className="admin-dashboard">
      <Header
        className="admin-header"
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          top: 0,
          left: 0,
          backgroundColor: "#343a40", // Color de fondo casi negro
        }}
      >
        <h1 style={{ color: "#fff" }}>Panel de Administración</h1>
      </Header>
      <Layout style={{ minHeight: "100vh", marginTop: "64px" }}> {/* Ajuste aquí el espacio para el Header */}
        <Sider
          width={200}
          className="admin-sider"
          style={{
            position: "fixed",
            top: 64,
            bottom: 0,
            backgroundColor: "#343a40", // Color de fondo casi negro
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname.split("/")[2]]}
            style={{ height: "100%", borderRight: 0, backgroundColor: "#343a40" }} // Color de fondo casi negro para el menú
          >
            {menuItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{
                  color: "#fff", // Color del texto
                  backgroundColor: location.pathname.includes(item.key) ? "#495057" : "transparent", // Fondo del item seleccionado
                }}
              >
                <Link to={item.to} style={{ color: "#fff" }}>
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
            {/* Mover el botón de cerrar sesión al final */}
            <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ marginTop: "auto", color: "#fff" }}>
              <Button type="link" onClick={handleLogout} style={{ color: "#fff", width: "100%" }}>
                Cerrar Sesión
              </Button>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px", marginLeft: 200 }}> {/* Ajuste para no sobreponerse al Sider */}
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Panel de Administración</Breadcrumb.Item>
            <Breadcrumb.Item>
              {menuItems.find((item) => location.pathname.includes(item.key))?.label}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 0,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="flights" element={<FlightsManagement />} />
              <Route path="airlines" element={<AirlinesCreation />} />
              <Route path="reservations" element={<ReservationsView />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
