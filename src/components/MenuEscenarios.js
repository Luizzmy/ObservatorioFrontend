import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, Button, message, Space, Tooltip, Typography, Col, Row, Checkbox, } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import LineasChart from './LineasChart';
import { obtainData } from '../services/index'
import BarrasChart from './BarrasChart';
import { obtainDemo } from '../services/index';

const { Text, Title } = Typography

function MenuEscenarios() {

  const [data, setData] = useState()
  const [demo, setDemo] = useState()
  const [escenario1, setEscenario1] = useState("PRL1")
  const [escenario2, setEscenario2] = useState("CSI")
  const [entidad, setEntidad] = useState("Aguascalientes")
  const [seriesSelec, setSeriesSelec] = useState(["egresos_pcp"])

  useEffect(() => {
    async function getEscenario(){
      const {data}=await obtainData(`${entidad},${escenario1},${escenario2}`)
      console.log(data)
      setData(data[0])
    }
    async function getDemo(){
      const {data}=await obtainDemo()
      setDemo(data[0])
    }
    getEscenario()
    getDemo()
  }, [entidad, escenario1, escenario2])
  // useEffect(() => {
  //   let res = []
  //   let intArr = []
  //   async function getData() {
  //     const { data } = await obtainData()
  //     console.log(data[0])
  //     setData(data[0])
  //   }
  //   async function getDemo() {
  //     const { data } = await obtainDemo()
  //     setDemo(data[0])
  //   }
  //   getData()
  //   getDemo()
  // }, [])

  const plainOptions = ['Aguascalientes', 'Baja California (Burocracia)',
    'Baja California (Magisterio)', 'Campeche', 'Chiapas', 'Chihuahua',
    'CDMX (CAPREPA)', 'CDMX (CAPREPOL)', 'CDMX (CAPTRALIR)',
    'Coahuila (Burocracia)', 'Coahuila (Magisterio)', 'Colima', 'Durango',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán',
    'Morelos', 'Nayarit', 'Nuevo León (Jubilación)',
    'Nuevo León (Invalidez y Vida)', 'Nuevo León (Riesgos de Trabajo)',
    'Nuevo León (Seguro de Vida)', 'Oaxaca', 'Puebla', 'Querétaro',
    'San Luis Potosí (Burocracia)',
    'San Luis Potosí (Dirección de Pensiones)',
    'San Luis Potosí (Magisterio)', 'San Luis Potosí (Telesecundaria)',
    'Sinaloa (Gobierno)', 'Sinaloa (ISSSTEESIN)', 'Sonora', 'Tabasco',
    'Tamaulipas', 'Tlaxcala', 'Veracruz ', 'Yucatán', 'Zacatecas']
  const seriesDeTiempo=["fecha",
  "egresos_pcp",
  "egresos_ga",
  "egresos_ng",
  "egresos_total",
  "flujos_activos_ga",
  "flujos_activos_ng",
  "activos_total",
  "aportacion_ext_ga",
  "aportacion_ext_ng",
  "aportacion_ext_total",
  "costo_patron_ga",
  "costo_patron_ng",
  "costo_patron_total",
  "reserva_ga",
  "reserva_ng",
  "reserva_total",
  "presupuesto",
  "nomina",
  "pensionados_pcp",
  "pensionados_ga",
  "pensionados_ng",
  "total_pensionados",
  "activos_ga",
  "activos_ng",
  "total_activos"]


    function handleMenuClick(e) {
      message.info('Click on menu item.');
      console.log('click', e);
    }
  function handleMenuEntidades(e) {
    setEntidad(e.key)
    console.log('click', e);
  }

  function handleMenuEscenario1(e) {
    setEscenario1(e.key)
    console.log('click', e);
  }
  function handleMenuEscenario2(e) {
    setEscenario2(e.key)
    console.log('click', e);
  }

  const menus = plainOptions.map((e) => {
    return (
      <Menu.Item key={e} >
        {e}
      </Menu.Item>
    )
  });
  const menuSeries = plainOptions.map((e) => {
    return (
      <Menu.Item key={e} >
        {e}
      </Menu.Item>
    )
  });
  const menuEntidades = () => {
    return (
      <Menu onClick={handleMenuEntidades} style={{overflow: 'scroll', height: 200}}>
        {menus}
      </Menu>
    )
  }

  const menuEscenario1=(
    <Menu onClick={handleMenuEscenario1} multiple={true}>
    <Menu.Item key="PRL1" icon={<UserOutlined />}>
      PRL 1
        </Menu.Item>
    <Menu.Item key="PRL2" icon={<UserOutlined />}>
      PRL 2
        </Menu.Item>
    <Menu.Item key="PRL3" icon={<UserOutlined />}>
      PRL 3
        </Menu.Item>
  </Menu>
  )
  const menuEscenario2=(
    <Menu onClick={handleMenuEscenario2} multiple={true}>
    <Menu.Item key="CSI" icon={<UserOutlined />}>
      CSI
        </Menu.Item>
    <Menu.Item key="SSI" icon={<UserOutlined />}>
      SSI
        </Menu.Item>
  </Menu>
  )

  const menu = (
    <Menu onClick={handleMenuClick} multiple={true}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Con reforma
          </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Sin reforma
          </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Escenario mixto
          </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Row>

        <Col>
          <Title level={3}>Seleccione el escenario a visualizar</Title>
          <Space>
            <Button>
              +
                    </Button>

            <Dropdown overlay={menuEscenario1}>
              <Button>
                {escenario1}<DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={menuEscenario2}>
              <Button>
                {escenario2}<DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={menuEntidades}>
              <Button>
                {entidad}<DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={menu}>
              <Button>
                Series de tiempo<DownOutlined />
              </Button>
            </Dropdown>

          </Space>
        </Col>

      </Row>

      <Row>
        <Col sm={24}>
          {data ?
            <LineasChart title="Escenario pensionario" data={data} />
            :
            null}
        </Col>
        <Col sm={24}>
        <Dropdown overlay={menu}>
              <Button>
                Variables Demográficas<DownOutlined />
              </Button>
            </Dropdown>
          {demo ?
            <BarrasChart data={demo} />
            :
            null
          }
        </Col>
      </Row>

    </div>
  )
}

export default MenuEscenarios
