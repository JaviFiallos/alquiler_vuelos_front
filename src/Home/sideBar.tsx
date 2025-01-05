import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LogoutOutlined,
  RocketOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const menuOptions = [
    { key: 'catalogo', label: 'Catálogo', icon: <HomeOutlined />, route: '/home' },
    { key: 'reservas', label: 'Reservas', icon: <RocketOutlined />, route: '/reservation-history' },
    { key: 'adicional', label: 'Adicional', icon: <KeyOutlined />, route: '/adicional' },
  ];

  const handleMenuClick = (route: string) => {
    console.log("Navegando a:", route);
    if (route) navigate(route); // Redirige a la ruta cuando se hace clic
  };

  return (
    <Sider
      className="sidebar-expanded" // Mantener el menú expandido
      style={{ height: '100vh', position: 'fixed', left: 0 }}
      collapsed={false} // Menú siempre expandido
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h2>Menú</h2>
      </div>
      <Menu theme="dark" mode="inline">
        {menuOptions.map(({ key, label, icon, route }) => (
          <Menu.Item key={key} icon={icon} onClick={() => handleMenuClick(route)}>
            {label}
          </Menu.Item>
        ))}

        {/* Opción de cierre de sesión al final */}
        <Menu.Item
          key="logout"
          id="logout"
          icon={<LogoutOutlined style={{ color: 'red' }} />}
          onClick={onLogout}
          style={{
            color: 'red',
            fontWeight: 'bold',
            position: 'absolute',
            bottom: 16,
            width: '100%',
          }}
        >
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
