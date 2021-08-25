import React,{ useState, createContext, useContext, useEffect } from 'react'
import { Col, Row, Input, Form, Button, message } from 'antd'
import { loginFn } from '../services/auth'
import { useContextData } from '../hooks/context'
import { Redirect } from 'react-router'

const errormessage=(errmessage)=>{
  message.error(errmessage)
}

function Login({ history }) {

  const [form] = Form.useForm()
  const { login, user } = useContextData()


  async function handleSubmit(userInput) {
    loginFn(userInput)
      .then(data => {
        login({ data })
        history.push('/escenarios')
      })
      .catch(err => {
        const errorInfo = err.response.data.message
        errormessage(errorInfo)
      })

  }
  return user ?
  <Redirect to={"/escenarios"}/>
  :
   (
    // <div style={{
    //     // backgroundColor:"yellow",
    // backgroundImage:"url(https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm218-bb-01_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=7e342c655542531730ffb8c14dbae12b)", backgroundSize: "cover",
    // height: "100vh"}}>
    <div>
      <Row align="middle" justify="space-around">
        <Col flex="center">
          <img
            width="300px"
            src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff9%2FLogo_BID_Espa%25C3%25B1ol.png%2F1200px-Logo_BID_Espa%25C3%25B1ol.png" />
          <img
            width="300px"
            src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F9b%2FSHCP_Logo_2019.svg%2F1200px-SHCP_Logo_2019.svg.png" />
        </Col>

      </Row>
      <Row align="middle" justify="space-around">
        <Col flex="center" xs={20} md={16} lg={12} xl={8} xxl={6}>
          <br/>
          <h1>Observatorio de Pensiones en México</h1>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item name='userName' label="Usuario:" rules={[{ required: true, type: 'email', message: 'please input your email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label="Contraseña:" rules={[{ required: true, message: 'password is required' }]}>
              <Input.Password />
            </Form.Item>

            <Button type="primary" block htmlType="submit">
              Login
            </Button>

          </Form>
        </Col>

      </Row>

    </div>
    // </div>
  )
}

export default Login
