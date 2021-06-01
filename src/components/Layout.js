import React from 'react'
import { Layout} from 'antd';
import SiderMenu from './Sider'
import Breadcrumbs from './Breadcrumbs';
import {useLocation} from '../hooks/reactPath'


const { Header, Content} = Layout;


function LayoutApp({children}) {


    return (
        <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu/>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px', textAlign:"left" }}>
            <Breadcrumbs/>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, backgroundColor:"white" }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
}

export default LayoutApp