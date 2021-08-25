import React, { useEffect, useState } from 'react'
import {List} from 'antd'
import JSZip from 'jszip'

function ListaResultados({tipo, words}) {

    const [data, setData] = useState()
    const [orig, setOrig] = useState()

    useEffect(() => {
        function getData(){
            fetch('/leyesYReglamentos.json')
            .then(function(response){
                return response.json()
            })
            .then(function(myJson){
                let res=[]
                for(let i in myJson){
                    res.push(...myJson[i].leyes)
                    if(myJson[i].reglamentos){
                        res.push(...myJson[i].reglamentos) 
                    }
                }
                console.log(res)
                setData(res)
                setOrig(res)
            })

        }
        getData()
    }, [])


    useEffect(() => {
        function matchLaws(){
            let res=[]
            if(words && orig){
                let wordsarr=words.split(" ")
                orig.forEach(l => {
                    if(wordsarr.every(w=>l.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .includes(w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))){
                        res.push(l)
                    }
                });
                const unique = res.filter((v, i, a) => a.indexOf(v) === i)
                setData(unique)
            }
            else{
                setData(orig)
            }
        }
        matchLaws()
    }, [words, orig])

    return (
        <div>
            <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={<a  href={`/./leyesYReglamentos/${item.file}.pdf`} target="_blank" download>{item.nombre}</a>}
          description={<><p>{item.publicacion ? `Publicada: ${item.publicacion}`: null}</p><p>{item.ultimaReforma ? `Última reforma: ${item.ultimaReforma}` : null}</p></>}
        />
      </List.Item>
    )}
  /> 
        </div>
    )
}

export default ListaResultados
