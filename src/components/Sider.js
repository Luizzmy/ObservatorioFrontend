import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TableOutlined,
    LogoutOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useContextData } from '../hooks/context'
import { logoutFn } from '../services/auth'

const { SubMenu } = Menu;


const { Sider } = Layout;

function SiderMenu({history}) {
    const [collapsed, setCollapsed] = useState(false)

    const { user, logout } = useContextData()

    const onCollapse = () => {
        if (collapsed) {
            setCollapsed(false)
        } else {
            setCollapsed(true)
        }

    }

    async function handleLogout() {
        await logoutFn()
        logout()
        console.log(history)

      }


    return (
        <Sider collapsible collapsed={collapsed} breakpoint="lg" onCollapse={onCollapse}>
            <div className="logo" style={{backgroundColor: "rgba(255, 255, 255, 0.6)"}}>
            <img
                height="65rem"
                src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff9%2FLogo_BID_Espa%25C3%25B1ol.png%2F1200px-Logo_BID_Espa%25C3%25B1ol.png"/>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<AreaChartOutlined />}>
                    <Link to={"/escenarios"}>
                    Escenarios
                    </Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<TableOutlined/>} title="Resúmenes">
            <Menu.Item key="7" >
                    <Link to={"/resumenEstados"}>
                    Por estado
                    </Link>
            </Menu.Item>
            <Menu.Item key="9">
            <Link to={"/resumenPensionario"}>
                    Pensionario Actual
                    </Link>
                    </Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<PieChartOutlined />}>
                    <Link to={"/demograficos"}>
                    Datos Demográficos
                    </Link>
            </Menu.Item>
                <SubMenu key="sub1" icon={<DesktopOutlined />} title="Leyes">
                    <Menu.Item key="3" >
                        <Link to={"/buscador/leyes"}>
                            Leyes y Reglamentos
              </Link>
                    </Menu.Item>
                    <Menu.Item key="4" >
                        <Link to={"/buscador/estado"}>
                            Por estado
              </Link>
                    </Menu.Item>
                    <Menu.Item key="5" >
                        <Link to={'/buscador/articulo'}>
                            Por artículo
                            </Link>
                    </Menu.Item>
                </SubMenu>
                {/* <Menu.Item key="6" icon={<FileOutlined />}>
                    Descargas
            </Menu.Item> */}
                <Menu.Item key="8" icon={<LogoutOutlined />} onClick={handleLogout}>
                    Cerrar sesión
            </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SiderMenu
