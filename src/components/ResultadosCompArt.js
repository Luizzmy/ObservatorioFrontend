import React, { useEffect, useState } from 'react'
import {Col, Row, List, Typography} from 'antd'

const{Text}=Typography

function ResultadosCompArt({words, data, tipoBusq}) {

    const [articulos, setArticulos] = useState()

    useEffect(() => {
        function filterData(data, words){
            let res=[]
            if(words){
                let wordsarr=words.split(" ")
            for(let i in data){
                for(let j in data[i]){
                    for (let k in data[i][j]){
                        if(wordsarr.every(w=>data[i][j][k].texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .includes(w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))){
                            res.push({
                                estado:i,
                                ley:j,
                                articulo:k,
                                texto:data[i][j][k].texto
                            })
                        }
                    }
                    }
                }
                setArticulos(res)
            }
        }
        filterData(data, words)
    }, [words, data])

    return (  
        <div>
            {articulos ?
            <>
            <Text>Artículos que incluyen las palabras: {words}</Text>
            <List
    itemLayout="horizontal"
    dataSource={articulos}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={item.articulo}
          description={
              <>
          <Text>Entidad:<b>{item.estado}</b></Text><br/>
          <Text>Ley/Reglamento:<b>{item.ley}</b></Text><br/>
          <Text>{item.texto}</Text><br/>
          </>
          }
        />
      </List.Item>
    )}
  /> 
  </>
:
null            
        }


            
        </div>
    )
}

export default ResultadosCompArt
