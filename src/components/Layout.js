import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function LayoutApp({children}) {

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse=()=>{
      if(collapsed){
        setCollapsed(false)
      } else {
        setCollapsed(true)
      }

    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Modelos
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Leyes
            </Menu.Item>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Descargas
            </Menu.Item>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Ajustes">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="10" icon={<LogoutOutlined />}>
              Cerrar sesión
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px', textAlign:"left" }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, backgroundColor:"white" }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
}

export default LayoutApp