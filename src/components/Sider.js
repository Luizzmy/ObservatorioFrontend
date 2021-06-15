import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;


const { Sider } = Layout;

function SiderMenu() {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = () => {
        if (collapsed) {
            setCollapsed(false)
        } else {
            setCollapsed(true)
        }

    }
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" style={{backgroundColor: "rgba(255, 255, 255, 0.6)"}}>
            <img
                height="80px"
                src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff9%2FLogo_BID_Espa%25C3%25B1ol.png%2F1200px-Logo_BID_Espa%25C3%25B1ol.png"/>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link to={"/escenarios"}>
                    Escenarios
                    </Link>
            </Menu.Item>
                <SubMenu key="sub1" icon={<DesktopOutlined />} title="Leyes">
                    <Menu.Item key="2" >
                        <Link to={"/buscador/leyes"}>
                            Leyes y Reglamentos
              </Link>
                    </Menu.Item>
                    <Menu.Item key="3" >
                        <Link to={"/buscador/estado"}>
                            Por estado
              </Link>
                    </Menu.Item>
                    <Menu.Item key="4" >
                        <Link to={'/buscador/articulo'}>
                            Por artículo
                            </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="5" icon={<FileOutlined />}>
                    Descargas
            </Menu.Item>
                {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Ajustes">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="7">Team 2</Menu.Item>
                </SubMenu> */}
                <Menu.Item key="8" icon={<LogoutOutlined />}>
                    Cerrar sesión
            </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SiderMenu
