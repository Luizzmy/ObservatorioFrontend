import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import SiderMenu from './Sider'

const { Header, Content} = Layout;


function LayoutApp({children}) {

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu/>
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