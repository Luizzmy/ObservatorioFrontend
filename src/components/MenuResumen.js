import React, { useEffect, useState } from 'react'
import { obtainResumenAct, obtainResumenEdo,  obtainResumenActEdos, obtainResumenEdoEdos  } from '../services/index'
import TablaResumen from './TablaResumen'
import {Space, Row, Col, Select, Spin} from 'antd'
import CSVdownload from './CSVdownload'
import { useContextData } from '../hooks/context';
import { Redirect} from 'react-router-dom'


const { Option } = Select;

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

const entOptions = plainOptions.map((e) => {
    return (
      <Option value={e} key={e} >
        {e}
      </Option>
    )
  });


function MenuResumen({tipo}) {
  const { user } = useContextData()


    const [data, setData] = useState()
    const [escenario, setEscenario] = useState("PRL1-CSI")
    const [edos, setEdos] = useState()



function MenuEnts() {
    return (
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Mostrando total cuando esta vacio"
        mode="multiple"
        value={edos}
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

    useEffect(() => {
        async function getData() {
            if(tipo==="edo"){
                if(edos){
                    const { data } = await obtainResumenEdoEdos(escenario, edos)
                    setData(data)
                } else{
                    const { data } = await obtainResumenEdo(escenario)
                    setData(data)
                }
            }else {
                if(edos){
                    const { data } = await obtainResumenActEdos(escenario, edos)
                    setData(data)
                }else{
                    const { data } = await obtainResumenAct(escenario)
                    setData(data)
                }
            }
        }
        getData()
    }, [escenario, edos])

    function handleChangeEsc(value){
        setEscenario(value)
    }

    function handleChangeEnt(value) {
        console.log(value)
        setEdos(value)
      }

    return (
        <div>
            <Row>
            {/* <Space> */}

                <Col xs={24} md={8} lg={10} xl={8} xxl={4}>
                <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Search to Select"
              value={escenario}
              optionFilterProp="children"
              onChange={handleChangeEsc}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="PRL1-CSI">PRL1 Ctas. Nocionales (CSI)</Option>
              <Option value="PRL2-CSI">PRL2 Ctas. Nocionales (CSI)</Option>
              <Option value="PRL3-CSI">PRL3 Ctas. Nocionales (CSI)</Option>
              <Option value="PRL1-SSI">PRL1 Ctas. Individuales (SSI)</Option>
              <Option value="PRL2-SSI">PRL2 Ctas. Individuales (SSI)</Option>
              <Option value="PRL3-SSI">PRL3 Ctas. Individuales (SSI)</Option>
            </Select>
               
                </Col>
                <Col xs={24} md={8} lg={10} xl={8} xxl={4}>
            <MenuEnts />
                </Col>
                <Col xl={8} xxl={4}>
                {data ?
                <CSVdownload data={data}/>
                :
                null
}
                </Col>
                {/* </Space> */}

            </Row>
            
            {data ?
            <div style={{marginTop:"2%"}}>
                <TablaResumen data={data}/>
                </div>
                :
                <div style={{margin:"25% 45%"}}>
                    <Space size="middle">
                <Spin  tip="Cargando..."/>
            </Space>
            </div>
            }
        </div>
    )
}

export default MenuResumen
