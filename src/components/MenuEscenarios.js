import React, { useState, useEffect } from 'react'
import {
  Space,
  Spin,
  Typography,
  Col,
  Row,
  Select,
  message,
  Empty,
  InputNumber,
  Button,
  Checkbox
} from 'antd';
import {
  DownOutlined,
  UserOutlined
} from '@ant-design/icons';
import LineasChart from './LineasChart';
import {
  obtainData,
  obtainDemoTotal
} from '../services/index'
import BarrasChart from './BarrasChart';
import { obtainDemo } from '../services/index';
import { CSVLink } from "react-csv";
import PVs from './PVs'

const { Text,
  Title } = Typography

const { Option } = Select;

const searchRegExp = /\s/g;
const replaceWith = '-';

function getCSVData(data) {
  let CSVdata = []
  for (let i = 1; i < data.length; i++) {
    var result = {};
    data[0].forEach((key,
      j) => result[key.replace(searchRegExp,
        replaceWith)] = data[i][j])
    CSVdata.push(result)
  }
  return CSVdata
}


function MenuEscenarios() {

  const [data, setData] = useState()
  const [escenario1, setEscenario1] = useState(["PRL1", "PRL2", "PRL3"])
  const [actuales, setActuales] = useState(["Flujos Egresos Total"])
  const [escenario2, setEscenario2] = useState(["CSI"])
  const [entidad, setEntidad] = useState([])
  const [seriesSelec, setSeriesSelec] = useState(["Flujos Egresos Total"])
  const [loading, setLoading] = useState(true)
  const [seriesGraph, setSeriesGraph] = useState()
  const [csvReport, setcsvReport] = useState()
  const [pef, setPef] = useState(false)
  const [dataPEF, setDataPEF] = useState()
  const [cocPEF, setCocPEF] = useState()
  const [pvs, setPvs] = useState()
  const [pvsEnts, setPvsEnts] = useState([])
  const [sum, setSum] = useState(false)
  const [rate, setRate] = useState(.0197)


  function makeQuery(origState) {
    let arr = []
    origState.forEach(e => {
      arr.push(e.replace(searchRegExp, replaceWith))
    })
    return arr.join(",")
  }


  function getHeaders(data) {
    let headers = []
    data[0].forEach(e => {
      headers.push({
        label: e,
        key: e.replace(searchRegExp, replaceWith)
      })
    })
    return headers
  }



  useEffect(() => {
    async function getEscenario() {
      if (escenario1.length > 0 && escenario2.length > 0 && seriesSelec.length > 0) {
        setLoading(true)
        let escQuery = []
        escenario1.forEach(e => {
          escenario2.forEach(e2 => {
            escQuery.push(`${e}-${e2}`)
          })

        })
        escQuery = escQuery.join(",")
        let dataArr = []
        let series = []
        if (entidad.length > 0) {
          const { data } = await obtainDemo(escQuery, makeQuery(seriesSelec), makeQuery(entidad), sum, rate)
          data.forEach(e => {
            dataArr.push(Object.values(e))
            series.push(Object.keys(e))
          })
        } else {
          const { data } = await obtainDemoTotal(escQuery, makeQuery(seriesSelec), true, rate)
          setEntidad(["Total"])
          data.forEach(e => {
            dataArr.push(Object.values(e))
            series.push(Object.keys(e))
          })
        }
        if (actuales.length > 0) {
          if (entidad.length > 0) {
            const { data } = await obtainDemo("Actual", makeQuery(actuales), makeQuery(entidad), sum, rate)
            data.forEach(e => {
              dataArr.push(Object.values(e))
              series.push(Object.keys(e))
            })
          } else {
            const { data } = await obtainDemoTotal("Actual", makeQuery(actuales), true, rate)
            setEntidad(["Total"])
            data.forEach(e => {
              dataArr.push(Object.values(e))
              series.push(Object.keys(e))
            })
          }
        }

        if (pef) {
          let pefValues = []
          const { data } = await obtainDemoTotal(`${escQuery},PEF`, makeQuery(seriesSelec), false, rate)
          pefValues.push(Object.values(data[data.length - 1]))
          if (cocPEF) {
            dataArr.flat(2).forEach(d => {
              for (let i = 1; i < d.length - 1; i++) {
                if (typeof d[i] == "number") {
                  if (parseFloat(d[0]) && parseFloat(d[0]) < 2120) {
                    let num = parseFloat(d[0])
                    d[i] = ((d[i] * 100) / (pefValues.flat(2).filter(v => v[1] == num)[0][2] * 100)) * 100

                  }
                }
              }
            })
            console.log(dataArr.flat(2))
            series.push(pefValues.flat(2)[1][pefValues.flat(2)[1].length - 1])

          } else {
            setDataPEF(pefValues.flat(2))
            series.push(pefValues.flat(2)[1][pefValues.flat(2)[1].length - 1])
          }
        }
        let PVs = dataArr.flat(2).filter(d => d[0] == "pv")
        let test = []
        test.push(...entidad)
        test.push("serie")
        console.log(test)
        console.log(entidad)
        setPvsEnts(test)
        setPvs(PVs)
        setData(dataArr.flat(2))
        setSeriesGraph(series.flat(1))

        setLoading(false)
      } else {
        setData(null)
      }
    }

    getEscenario()
  }, [entidad, escenario1, escenario2, seriesSelec, actuales, pef, cocPEF, sum, rate])

  useEffect(() => {
    function getCSV() {
      let dataArr = []
      if (data) {
        data.forEach(e => {
          dataArr.push(Object.values(e))
        })
        const csvReport = {
          data: getCSVData(dataArr),
          headers: getHeaders(dataArr),
          filename: 'Descarga_de_datos.csv'
        };
        setcsvReport(csvReport)
      }
    }
    getCSV()
  }, [data])

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
    'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas']

  const seriesDeTiempo = ['Flujos Egresos PCP', 'Flujos Egresos GA', 'Flujos Egresos NG',
    'Flujos Egresos Total', 'Flujos Activos GA', 'Flujos Activos NG',
    'Flujos Activos Total', 'Flujos Ap Ext GA', 'Flujos Ap Ext NG',
    'Flujos Ap Ext Total', 'Flujos CP GA', 'Flujos CP NG',
    'Flujos CP Total', 'Flujos Reserva GA', 'Flujos Reserva NG',
    'Flujos Reserva Total', 'Flujos Presupuesto', 'Flujos Nomina',
    'Pensionados PCP', 'Pensionados GA', 'Pensionados NG',
    'Nomina GA', 'Nomina NG']

  const seriesActuales = ['Flujos Activos Total',
    'Flujos Ap Ext Total',
    'Flujos CP Total',
    'Flujos Egresos Total',
    'Flujos Nomina',
    'Flujos Presupuesto', 'Flujos Reserva Total',]

  const entOptions = plainOptions.map((e) => {
    return (
      <Option value={e} key={e} >
        {e}
      </Option>
    )
  });

  const actualesOptions = seriesActuales.map((e) => {
    return (
      <Option value={e} key={e} >
        {e.replace("Actual-", "")}
      </Option>
    )
  });

  const seriesOptions = seriesDeTiempo.map((e) => {
    return (
      <Option value={e} key={e} >
        {e}
      </Option>
    )
  });

  function MenuEnts() {
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Search to Select"
        mode="multiple"
        value={entidad}
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

  function MenuSeries() {
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Search to Select"
        mode="multiple"
        value={seriesSelec}
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


  function MenuActs() {
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Search to Select"
        mode="multiple"
        value={actuales}
        optionFilterProp="children"
        onChange={handleChangeActs}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
      >
        {actualesOptions}
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

  function handleChangeActs(value) {
    setActuales(value)
  }

  function graphPEF() {
    if (!dataPEF) {
      setPef(true)
    } else {
      setDataPEF(null)
      setPef(false)
    }
  }

  function cocientePEF() {
    if (!dataPEF) {
      setPef(true)
    }

    if (!cocPEF) {
      setCocPEF(true)
    } else {
      setCocPEF(false)
    }
    console.log("cociente")
  }

  function sumTot() {
    if (!sum) {
      setSum(true)
    } else {
      setSum(false)
    }
  }

  function onNumberEnter(e) {
    if (parseFloat(e.target.value.slice(0, e.target.value.length)) ) {
      console.log(parseFloat(e.target.value.slice(0, e.target.value.length)) / 100)
      setRate(parseFloat(e.target.value.slice(0, e.target.value.length)) / 100)
    } else {
      message.error("No es un porcentaje válido")
    }
    console.log('changed', e.target.value);
  }

  return (
    <>
      {loading ?
        <div style={{ height: 600, width: "100%", margin: "25% 0 0 45%" }}>
          <Spin tip="Cargando...">
          </Spin>
        </div>
        :
        <div>
          <Row justify="space-between">
            <Col>
              <Title level={3}>Seleccione el escenario a visualizar</Title>
            </Col>
            <Col>
              <div style={{ marginRight: "9rem" }}>
                {csvReport ?
                  <CSVLink {...csvReport}><Button type="primary" >Descargar CSV</Button></CSVLink>
                  :
                  null
                }
              </div>
            </Col>
          </Row>
          <Row >

            <Col sm={24} md={24} lg={14} xl={12} xxl={8}>


              <Text>Escenario de reforma</Text>
              <br />

                <Row justify="start">
                {/* <Space> */} 
                  <Col xs={24} md={8} lg={12} xl={10} xxl={11}>
                  <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Search to Select"
                  mode="multiple"
                  value={escenario1}
                  optionFilterProp="children"
                  onChange={handleChangeEsc1}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                >
                  <Option value="PRL1">PRL1</Option>
                  <Option value="PRL2">PRL2</Option>
                  <Option value="PRL3">PRL3</Option>
                </Select>

                  </Col>
                  <Col xs={24} md={8} lg={12} xl={10} xxl={11}>
                  <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Search to Select"
                  mode="multiple"
                  value={escenario2}
                  optionFilterProp="children"
                  onChange={handleChangeEsc2}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                >
                  <Option value="CSI">Ctas. Nocionales (CSI)</Option>
                  <Option value="SSI">Ctas. Individuales (SSI)</Option>
                </Select>

                  </Col>
              {/* </Space> */}

                </Row>
                



            </Col>
            <Col xs={24} sm={24} md={16} lg={10} xl={12} xxl={12}>
              <Text>Escenario actual</Text>
              <br />

              <MenuActs />
            </Col>

          </Row>


          <Row >
            <Col sm={24} md={24} lg={14} xl={12} xxl={8}>
              <Text>Entidades y series de tiempo</Text>
              <br />
              {/* <Space> */}
              <Row>
                <Col xs={24} md={8} lg={12} xl={10} xxl={11}>
                <MenuEnts />  
                </Col>
                <Col xs={24} md={8} lg={12} xl={10} xxl={11}>
                <MenuSeries />
                </Col>
              </Row>
              {/* </Space> */}


            </Col>
            <Col sm={24} md={24} lg={10} xl={12} xxl={16}>
              <br />
              <Checkbox onChange={graphPEF} checked={dataPEF}>PEF</Checkbox>
              <Checkbox onChange={cocientePEF} checked={cocPEF}>PEF como cociente</Checkbox>
              <Checkbox onChange={sumTot} checked={sum}>Sumar entidades</Checkbox>
              <br />



            </Col>

          </Row>


          <Row>
            <Col sm={24}>
              <br />

              {data ?
                <>
                  <LineasChart title="Escenario pensionario" data={data} series={seriesGraph} entidades={sum ? ["Total"] : entidad} dataPEF={dataPEF} cocPEF={cocPEF} />
                  <Title>Valores Presentes de las series</Title>
          <Text>Tasa de descuento</Text>
                  <InputNumber
                    value={rate}
                    min={0}
                    max={100}
                    formatter={value => `${value * 100}%`}
                    parser={value => value.replace('%', '')}
                    onPressEnter={onNumberEnter}
                  />
                  <PVs data={pvs} ents={pvsEnts} rate={rate} />
                </> :
                <Empty
                  description={
                    <Text>
                      Por favor seleccione al menos un escenario y serie de tiempo a visualizar
                    </Text>
                  } />}
            </Col>
          </Row>

        </div>
      }
    </>
  )
}

export default MenuEscenarios
