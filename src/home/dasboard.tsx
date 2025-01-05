// Importaciones necesarias
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Menú lateral */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null}
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<FileOutlined />}>Reservas</Menu.Item>
          <Menu.Item key="2" icon={<RocketOutlined />}>Vuelos</Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>Perfil</Menu.Item>
        </Menu>
      </Sider>

      {/* Contenido principal */}
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
      
        
      </Layout>
    </Layout>
  );
};

export default Dashboard;
