import React, { useEffect } from 'react'
import { Layout, Row, Col, Typography, Divider } from 'antd';
import SiderMenu from './Sider'
import { useContextData } from '../hooks/context';

import { Redirect } from 'react-router-dom'

const { Header, Content, Footer } = Layout;

const { Text, Title } = Typography

function LayoutApp({ children }) {



  return (
    <>
      {/* {user? null : <Redirect to={"/login"}/>} */}
      {/* {user ?  */}

      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>

            <Row justify="end" align="middle" style>
              {/* <div style={{margin:"2px 35px 0 0"}}> */}
              <img
                height="64px"
                src="/./logoH.png" />
              {/* </div> */}
            </Row>
          </Header>
          <Content style={{ margin: '0 16px', textAlign: "left" }}>
            <div className="site-layout-background"
              style={{ padding: 24, minHeight: 360, backgroundColor: "white" }}>
              {children}
            </div>
          </Content>
          <Footer>
            <Divider />
            <Row>
              <Col xs={0} sm={0} md={12}>
                <Title>
                  Desarrollado por
                </Title><br />
                <img
                  width="45%"
                  src="/./entropia_logo.png" />
              </Col>
               <Col xs={0} sm={0} md={12}>
                <Title>En colaboración con</Title>

                <img
                  width="30%"
                  src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff9%2FLogo_BID_Espa%25C3%25B1ol.png%2F1200px-Logo_BID_Espa%25C3%25B1ol.png" />
              </Col>
              <Col xs={24} sm={24} md={0}>
                <Title level={4}>
                  Desarrollado por
                </Title><br />
                <img
                  width="85%"
                  src="/./entropia_logo.png" />
                  <br />
              </Col>
               <Col xs={24} sm={24} md={0}>
               <br />
                
                <Title level={4}>En colaboración con</Title>

                <img
                  width="60%"
                  src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff9%2FLogo_BID_Espa%25C3%25B1ol.png%2F1200px-Logo_BID_Espa%25C3%25B1ol.png" />
              </Col>
            </Row>

          </Footer>
        </Layout>
      </Layout>
      {/* :
    <Redirect to={'/login'}/> */}
      {/* } */}

    </>
  )
}

export default LayoutApp