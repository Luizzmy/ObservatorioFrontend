import React, { useEffect, useState } from 'react'
import {Col, Row, List, Button, Input} from 'antd'
import ModifiedText from './ModifiedText'

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


function ResultadosDosColumnas({data, leyesObjs, datatot}) {
  



    const [leyes, setLeyes] = useState([])
    const [articulos, setArticulos] = useState([])
    const [allArticulos, setAllArticulos] = useState([])
    const [rest, setRest] = useState([])
    const [selected, setSelected] = useState()
    const [words, setWords] = useState(null)


    useEffect(() => {
        function getLeyes(data){
          console.log(data)
            let res=[]
            for(let i in data){
                res.push({
                    nombre:i,
                    articulos:data[i]
                })
            }
            setLeyes(res)
            setAllArticulos(makeArticulos(res[0].articulos))
            setArticulos(makeArticulos(res[0].articulos).slice(0,5))
            setRest(makeArticulos(res[0].articulos).slice(5,makeArticulos(res[0].articulos).length-1))
            setSelected(res[0])
        }
        getLeyes(data)
    }, [data])

    

    const handleOnClick=(name)=>{
        setArticulos(makeArticulos(name.articulos).slice(0,5))
        setRest(makeArticulos(name.articulos).slice(5,makeArticulos(name.articulos).length-1))
        setSelected(name)
    }

    function onLoadMore(){
      if(articulos.length<6)
      setArticulos(articulos.concat(rest))
    }

    useEffect(() => {
      function matchLaws(){
          let res=[]
          if(words && allArticulos){
              let wordsarr=words.split(" ")
              allArticulos.forEach(l => {
                  if(wordsarr.every(w=>l.contenido.texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                  .includes(w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))){
                      res.push(l)
                  }
              });
              const unique = res.filter((v, i, a) => a.indexOf(v) === i)
              setArticulos(unique)
          }
          else{
              setArticulos(allArticulos)
          }
      }
      matchLaws()
  }, [words, allArticulos])
  
    const loadMore=( <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button className onClick={onLoadMore}>Ver todos</Button>
    </div>)

const handleChange = e => {
  setWords(e.target.value)
  console.log(e.target.value)
};


const handleSearch = (value) => {
  console.log(value)
}

    return (
        <div>
            <Row>
                <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 11}} lg={{ span: 11}} xl={{ span: 10}} xxl={{ span: 10}} >
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
                <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 12, offset: 1}}  lg={{ span: 12, offset: 1}} xl={{ span: 12, offset: 1}} xxl={{ span: 12, offset: 1 }}>
                  
                {articulos ?
                <> 
            <Input.Search size="large" onChange={handleChange} placeholder={"Buscar por palabras clave"}  onSearch={handleSearch} enterButton />
            <List
    itemLayout="horizontal"
    dataSource={articulos}
    loadMore={loadMore}
    renderItem={item => (
      <List.Item >
        <List.Item.Meta
          title={item.articulo}
        description={<>
        <ModifiedText text={item.contenido.texto} leyes={leyesObjs} data={data} leyAct={selected.nombre} datatot={datatot} />
        </>}
        />
      </List.Item>
    )}
  />
  </>
  : null}
                </Col>
            </Row>
            
        </div>
    )
}

export default ResultadosDosColumnas
