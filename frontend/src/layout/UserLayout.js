import React, { useState } from 'react';
import {Outlet} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <NavLink to="/"><ShoppingCartOutlined /></NavLink>,
              label: 'Alışveriş Listem',
            },
            {
              key: '2',
              icon: <NavLink to="/list"><OrderedListOutlined /></NavLink>,
              label: 'Liste Oluştur',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
            <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          {new Date().getFullYear()} Created by Umut AKKEMİK
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;