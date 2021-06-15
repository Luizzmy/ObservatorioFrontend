import React, { useEffect, useState } from 'react'
import { Col, Row, Typography, Space, Select, Empty, Spin } from 'antd'
import { obtainDemo, obtainDemoTotal } from '../services'
import BarrasChart from './BarrasChart'

const { Text, Title } = Typography

const {Option}=Select

const searchRegExp = /\s/g;
const replaceWith = '-';

function MenuDemograficos() {
    const [data, setData] = useState()
    const [tabla, setTabla] = useState(['pensionados hombres',
    'pensionados mujeres'])
    const [loading, setLoading] = useState(true)
    const [seriesGraph, setSeriesGraph]= useState()
    const [entidades, setEntidades] = useState()

    const tablas = ['activos antiguedad promedio',
     'activos edad promedio',
     'activos hombres',
     'activos mujeres',
     'activos sueldo promedio',
     'activos total',
     'pensionados edad promedio',
     'pensionados hombres',
     'pensionados mujeres',
     'pensionados sueldo promedio',
     'pensionados total']

     const tablasOptions = tablas.map((e) => {
        return (
          <Option value={e} key={e} >
            {e}
          </Option>
        )
      });

    useEffect(() => {
        async function getData() {
            if (tabla.length>0){
                setLoading(true)
                let arr=[]
                tabla.forEach(e=>{
                  arr.push(e.replace(searchRegExp, replaceWith))
                })
                const { data } = await obtainDemoTotal("demo", arr.join(","))
                let dataArr=[]
                let series=[]
                data.forEach(e=>{
                  dataArr.push(Object.values(e))
                  series.push(Object.keys(e))
                })
                setData(data)
                setSeriesGraph(series.flat(1))
                console.log(dataArr.flat(2)[0].slice(1,dataArr.flat(2)[0].length-2))
                setEntidades(dataArr.flat(2)[0].slice(1,dataArr.flat(2)[0].length-2))
                setLoading(false)
            } else {
                setData(null)
            }
        }
        getData()
    }, [tabla])

    function handleChange(value) {
        setTabla(value)
      }    

  function MenuTablas(){
    return(
      <Select
      showSearch
      style={{ width: 400 }}
      placeholder="Search to Select"
      mode="multiple"
      defaultValue={tabla}
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
    >
      {tablasOptions}
    </Select>

    )
  }


    return (
        <div>
            <Row>
                <Col>
                <Text>Variables</Text>
                </Col>
            </Row>
            <Row>
                <Col>
                <MenuTablas/>
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
                                      
                <BarrasChart data={data} series={seriesGraph} entidades={entidades}/>
            :    
            <Empty
            description={
              <Text>
                Por favor seleccione al menos una variable para visualizar 
              </Text>}/>
              }
                </Col>
            </Row>


        </div>
    )
}

export default MenuDemograficos
