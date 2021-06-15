import React, { useState, useEffect } from 'react'
import { Space, Spin, Typography, Col, Row, Select, Empty } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import LineasChart from './LineasChart';
import { obtainData, obtainDemoTotal } from '../services/index'
import BarrasChart from './BarrasChart';
import { obtainDemo } from '../services/index';

const { Text, Title } = Typography

const { Option } = Select;

const searchRegExp = /\s/g;
const replaceWith = '-';

function MenuEscenarios() {

  const [data, setData] = useState()
  const [escenario1, setEscenario1] = useState(["PRL1"])
  const [escenario2, setEscenario2] = useState(["CSI"])
  const [entidad, setEntidad] = useState([])
  const [seriesSelec, setSeriesSelec] = useState(["Flujos Activos GA"])
  const [loading, setLoading]=useState(true)
  const [seriesGraph, setSeriesGraph] = useState()

  function makeQuery(origState){
    let arr=[]
    origState.forEach(e=>{
      arr.push(e.replace(searchRegExp, replaceWith))
    })
    return arr.join(",")
  }


  useEffect(() => {
    async function getEscenario(){
      if(escenario1.length>0 && escenario2.length>0 && seriesSelec.length>0){
        setLoading(true)
        let escQuery=[]
        escenario1.forEach(e=>{
          escenario2.forEach(e1=>{
            escQuery.push(`${e}-${e1}`)
          })
        })
        escQuery=escQuery.join(",")
        if(entidad.length>0){
          const {data}=await obtainDemo(escQuery,makeQuery(seriesSelec), makeQuery(entidad))
          let dataArr=[]
          let series=[]
          data.forEach(e=>{
            dataArr.push(Object.values(e))
            series.push(Object.keys(e))
          })
          setData(dataArr.flat(2))
          setSeriesGraph(series.flat(1))
        }else{
          const {data}=await obtainDemoTotal(escQuery,makeQuery(seriesSelec))
          setEntidad(["Total"])
          let dataArr=[]
          let series=[]
          console.log(data)
          data.forEach(e=>{
            dataArr.push(Object.values(e))
            series.push(Object.keys(e))
          })
          setData(dataArr.flat(2))
          setSeriesGraph(series.flat(1))
          
        }

        setLoading(false)
      } else {
        setData(null)
      }
    }

    getEscenario()
  }, [entidad, escenario1, escenario2, seriesSelec])
  
  const plainOptions = ['Aguascalientes', 'Baja California (Burocracia)',
    'Baja California (Magisterio)', 'Campeche', 'Chiapas', 'Chihuahua',
    'CDMX (CAPREPA)', 'CDMX (CAPREPOL)', 'CDMX (CAPTRALIR)',
    'Coahuila (Burocracia)', 'Coahuila (Magisterio)', 'Colima', 'Durango',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán',
    'Morelos', 'Nayarit', 'Nuevo León\n(Jubilación)',
    'Nuevo León (Invalidez y Vida)', 'Nuevo León (Riesgos de Trabajo)',
    'Nuevo León (Seguro de Vida)', 'Oaxaca', 'Puebla', 'Querétaro',
    'San Luis Potosí (Burocracia)',
    'San Luis Potosí (Dirección de Pensiones)',
    'San Luis Potosí (Magisterio)', 'San Luis Potosí (Telesecundaria)',
    'Sinaloa (Gobierno)', 'Sinaloa (ISSSTEESIN)', 'Sonora', 'Tabasco',
    'Tamaulipas', 'Tlaxcala', 'Veracruz ', 'Yucatán', 'Zacatecas']

//     23: "Nuevo León\n(Jubilación)"
// 24: "Nuevo Leon\n(Invalidez y Vida)"
// 25: "Nuevo León\n(Riesgos de Trabajo)"
// 26: "Nuevo León\n(Seguro de Vida)

  const seriesDeTiempo=['Flujos Egresos PCP', 'Flujos Egresos GA', 'Flujos Egresos NG',
  'Flujos Egresos Total', 'Flujos Activos GA', 'Flujos Activos NG',
  'Flujos Activos Total', 'Flujos Ap Ext GA', 'Flujos Ap Ext NG',
  'Flujos Ap Ext Total', 'Flujos CP GA', 'Flujos CP NG',
  'Flujos CP Total', 'Flujos Reserva GA', 'Flujos Reserva NG',
  'Flujos Reserva Total', 'Flujos Presupuesto', 'Flujos Nomina', 
  'Pensionados PCP', 'Pensionados GA', 'Pensionados NG', 
  'Nomina GA', 'Nomina NG']
  
  const entOptions= plainOptions.map((e) => {
    return (
      <Option value={e} key={e} >
        {e}
      </Option>
    )
  });

  const seriesOptions= seriesDeTiempo.map((e) => {
    return (
      <Option value={e} key={e} >
        {e}
      </Option>
    )
  });

  function MenuEnts(){
    return(
      <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      mode="multiple"
      defaultValue={entidad}
      optionFilterProp="children"
      onChange={handleChangeEnt}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
    >
      {entOptions}
    </Select>

    )
  }

  function MenuSeries(){
    return(
      <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      mode="multiple"
      defaultValue={seriesSelec}
      optionFilterProp="children"
      onChange={handleChangeSeries}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
    >
      {seriesOptions}
    </Select>

    )
  }

  function handleChangeEsc1(value) {
    setEscenario1(value)
  }

  function handleChangeEsc2(value) {
    setEscenario2(value)
  }

  function handleChangeEnt(value) {
    setEntidad(value)
  }

  function handleChangeSeries(value) {
    setSeriesSelec(value)
  }


  return (
    <div>
      <Row>
        <Col>          
        <Title level={3}>Seleccione el escenario a visualizar</Title>
          <Text>Escenario</Text>
          </Col>
          </Row>
      <Row>

        <Col>


          <Space>
            
                    <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    mode="multiple"
    defaultValue={escenario1}
    optionFilterProp="children"
    onChange={handleChangeEsc1}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
  >
    <Option value="PRL1">PRL 1</Option>
    <Option value="PRL2">PRL 2</Option>
    <Option value="PRL3">PRL 3</Option>
  </Select>

  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    mode="multiple"
    defaultValue={escenario2}
    optionFilterProp="children"
    onChange={handleChangeEsc2}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
  >
    <Option value="CSI">CSI</Option>
    <Option value="SSI">SSI</Option>
  </Select>
  </Space>

  </Col>

</Row>
<Row>
        <Col>   
          <Text>Entidades y series de tiempo</Text>
          </Col>
          </Row>
<Row>
<Col>
<Space>

    <MenuEnts />
    <MenuSeries/>
  </Space>

    </Col>

</Row>


      <Row>
        <Col sm={24}>
          {loading ?
            <div style={{height:600, width:"100%", margin:"25% 0 0 45%"}}>
  <Spin tip="Cargando...">
  </Spin>
            </div>
            :
            data ?
            <LineasChart title="Escenario pensionario" data={data} series={seriesGraph} entidades={entidad} />
            :
            <Empty
            description={
              <Text>
                Por favor seleccione al menos un escenario y serie de tiempo a visualizar 
              </Text>
            }/>}
        </Col>
      </Row>

    </div>
  )
}

export default MenuEscenarios
