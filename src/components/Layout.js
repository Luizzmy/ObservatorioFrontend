import React, { useEffect } from 'react'
import { Layout, Row, Col} from 'antd';
import SiderMenu from './Sider'
import { useContextData } from '../hooks/context';

import { Redirect} from 'react-router-dom'

const { Header, Content} = Layout;


function LayoutApp({children}) {



    return (
      <>
      {/* {user? null : <Redirect to={"/login"}/>} */}
      {/* {user ?  */}
      
      <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu/>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0}}>

        <Row justify="end" align="middle" style>
          {/* <div style={{margin:"2px 35px 0 0"}}> */}
        <img 
              height="64px"
              src="/./logoH.png"/>
          {/* </div> */}
        </Row>
          </Header>
        <Content style={{ margin: '0 16px', textAlign:"left" }}>
          <div className="site-layout-background" 
          style={{ padding: 24, minHeight: 360, backgroundColor:"white" }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
    {/* :
    <Redirect to={'/login'}/> */}
    {/* } */}

      </>
    )
}

export default LayoutApp