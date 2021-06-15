import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, Button, message, Space, Skeleton, Tooltip, Typography, Col, Row, Checkbox, } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import LineasChart from './LineasChart';
import { obtainData } from '../services/index'
import BarrasChart from './BarrasChart';
import { obtainDemo } from '../services/index';

const { Text, Title } = Typography

const searchRegExp = /\s/g;
const replaceWith = '-';

function MenuEscenarios() {

  const [data, setData] = useState()
  const [demo, setDemo] = useState()
  const [escenario1, setEscenario1] = useState(["PRL1"])
  const [escenario2, setEscenario2] = useState(["CSI","SSI"])
  const [entidad, setEntidad] = useState(["Aguascalientes"])
  const [seriesSelec, setSeriesSelec] = useState(["Flujos Activos GA"])
  const [demoSelec, setDemoSelec] = useState([1,"activos-hombres"])
  const [loading, setLoading]=useState(true)

  function makeQuery(origState){
    let arr=[]
    origState.forEach(e=>{
      arr.push(e.replace(searchRegExp, replaceWith))
    })
    return arr.join(",")
  }


  useEffect(() => {
    async function getEscenario(){
      setLoading(true)
      let escQuery=[]
      escenario1.forEach(e=>{
        escenario2.forEach(e1=>{
          escQuery.push(`${e}-${e1}`)
        })
      })
      escQuery=escQuery.join(",")
      const {data}=await obtainDemo(escQuery,makeQuery(seriesSelec), makeQuery(entidad))
      console.log(data)
      setData(data)
      // setLoading(false)
    }

    getEscenario()
  }, [entidad, escenario1, escenario2])

  useEffect(() => {
    async function getDemo(){
      // const {data}=await obtainDemo()
      // setDemo(data[0])
    }
    getDemo()
  }, [demoSelec])
  
  
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
  const seriesDeTiempo=['Flujos Egresos PCP', 'Flujos Egresos GA', 'Flujos Egresos NG',
  'Flujos Egresos Total', 'Flujos Activos GA', 'Flujos Activos NG',
  'Flujos Activos Total', 'Flujos Ap Ext GA', 'Flujos Ap Ext NG',
  'Flujos Ap Ext Total', 'Flujos CP GA', 'Flujos CP NG',
  'Flujos CP Total', 'Flujos Reserva GA', 'Flujos Reserva NG',
  'Flujos Reserva Total', 'Flujos Presupuesto', 'Flujos Nomina', 
  'Pensionados PCP', 'Pensionados GA', 'Pensionados NG', 
  'Nomina GA', 'Nomina NG']
  
  const variablesDemo=[
    "activos-hombres",
    "activos-mujeres",
    "activos-total",
    "pensionados-hombres",
    "pensionados-mujeres",
    "pensionados-total",
    "activos-sueldo",
    "activos-antiguedad",
    "activos-edad",
    "pensionados-sueldo",
    "pensionados-edad"
]


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
  function handleMenuSeries(e) {
    setSeriesSelec(e.key)
    // setLoading(true)
    // let arr=seriesSelec
    // if(!arr.includes(e.key)){
    //   arr.push(e.key)
    //   const uniqueValues=[...new Set(arr)]
    //   arr=uniqueValues
    //   setSeriesSelec(uniqueValues)
    // } else{
    //   let b = arr.filter(s => s === e.key)
    //   b.forEach(f => arr.splice(arr.findIndex(s => s === f),1))
    //   const uniqueValues=[...new Set(arr)]
    //   arr=uniqueValues
    //   setSeriesSelec(uniqueValues)
    // }
    // setLoading(false)
  }

  function handleMenuDemo(e) {
    setDemoSelec([variablesDemo.indexOf(e.key)+1,e.key])
    console.log(variablesDemo.indexOf(e.key))
  }

  const menus = plainOptions.map((e) => {
    return (
      <Menu.Item key={e} >
        {e}
      </Menu.Item>
    )
  });

  const menuST = seriesDeTiempo.map((e) => {
    return (
      <Menu.Item key={e} >
          {e}
      </Menu.Item>
    )
  });

  const menuVD = variablesDemo.map((e) => {
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

  const menuSeries = () => {
    return (
      <Menu onClick={handleMenuSeries} style={{overflow: 'scroll', height: 200}}>
        {menuST}
      </Menu>
    )
  }

  const menuDemo = () => {
    return (
      <Menu onClick={handleMenuDemo} style={{overflow: 'scroll', height: 200}}>
        {menuVD}
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
            <Dropdown overlay={menuSeries}>
              <Button>
                Series de tiempo<DownOutlined />
              </Button>
            </Dropdown>

          </Space>
        </Col>

      </Row>

      <Row>
        <Col sm={24}>
          {loading ?
            <div style={{height:600, width:"100%"}}>
<Skeleton />
            </div>
            :
            <LineasChart title="Escenario pensionario" data={data} series={seriesSelec} />
            }
        </Col>
        <Col sm={24}>
        <Dropdown overlay={menuDemo}>
              <Button>
                {demoSelec[1]}<DownOutlined />
              </Button>
            </Dropdown>
          {demo ?
            <BarrasChart data={demo} variable={demoSelec} />
            :
            null
          }
        </Col>
      </Row>

    </div>
  )
}

export default MenuEscenarios
