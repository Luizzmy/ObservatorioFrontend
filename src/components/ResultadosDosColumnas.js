import React, { useEffect, useState } from 'react'
import {Col, Row, List, Button} from 'antd'

function makeArticulos(name){
    let artLey=[]
    for(let l in name){
        artLey.push({
            articulo:l,
            contenido:name[l]
        })
    }
    return artLey
}


function ResultadosDosColumnas({data}) {

    const [leyes, setLeyes] = useState([])
    const [articulos, setArticulos] = useState([])
    const [selected, setSelected] = useState()

    useEffect(() => {
        function getLeyes(data){
            let res=[]
            for(let i in data){
                res.push({
                    nombre:i,
                    articulos:data[i]
                })
            }
            setLeyes(res)
            setArticulos(makeArticulos(res[0].articulos))
            console.log(res[0])
            setSelected(res[0])
        }
        getLeyes(data)
    }, [])

    const handleOnClick=(name)=>{
        console.log(name)
        setArticulos(makeArticulos(name.articulos))
        setSelected(name)
    }

    return (
        <div>
            <Row>
                <Col sm={12}>
                {leyes ? <List
    itemLayout="horizontal"
    dataSource={leyes}
    renderItem={item => (
      <List.Item
      style={selected===item ? {textDecoration:"underline solid black 2.5px"}: null}
      actions={[<Button type="link" onClick={()=>{handleOnClick(item)}} target={item.nombre} key="mostrar-articulos">Ver artículos</Button>]}>
        <List.Item.Meta
          title={item.nombre}
        //   description={<><p>{item.publicacion ? `Publicada: ${item.publicacion}`: null}</p><p>{item.ultimaReforma ? `Última reforma: ${item.ultimaReforma}` : null}</p></>}
        />
      </List.Item>
    )}
  /> 
  : null}
                </Col>
                <Col sm={12}>
                {articulos ? <List
    itemLayout="horizontal"
    dataSource={articulos}
    renderItem={item => (
      <List.Item >
        <List.Item.Meta
          title={item.articulo}
        description={<><p>{item.contenido.texto}</p></>}
        />
      </List.Item>
    )}
  /> 
  : null}
                </Col>
            </Row>
            
        </div>
    )
}

export default ResultadosDosColumnas
