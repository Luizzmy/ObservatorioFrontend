import React, { useEffect, useState } from 'react'
import { Col, Row, List, Typography } from 'antd'
import ModifiedText from './ModifiedText'

const { Text } = Typography

function ResultadosCompArt({ words, data, leySelect, artSelect, leyes }) {


    const [articulos, setArticulos] = useState()
    const [leyesData, setLeyesData] = useState()


    useEffect(() => {
        function filterData(data, words) {
            // console.log(Object.values(data))
            let res = []
            if (words) {
                let obj2={}
                for (let i in data) {
                    const obj =Object.fromEntries(Object.entries(data[i]))
                    obj2={...obj2,
                    ...obj}
                }
                setLeyesData(obj2)

                let wordsarr = words.split(" ")
                for (let i in data) {
                    for (let j in data[i]) {
                        for (let k in data[i][j]) {
                            if (wordsarr.every(w => data[i][j][k].texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .includes(w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
                                res.push({
                                    estado: i,
                                    ley: j,
                                    articulo: k,
                                    texto: data[i][j][k].texto
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


    useEffect(() => {
        function filterData(leySelect, artSelect, data) {
            let res = []
            if (artSelect) {
                for (let i in data) {
                    for (let j in data[i]) {

                        for (let k in data[i][j]) {
                            if (j == leySelect & k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .includes(artSelect.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                                res.push({
                                    estado: i,
                                    ley: j,
                                    articulo: k,
                                    texto: data[i][j][k].texto
                                })
                            }
                        }
                    }
                }
                setArticulos(res)
            }
        }
        filterData(leySelect, artSelect, data)
    }, [leySelect, artSelect, data])

    return (
        <div>
            {articulos && leyesData ?
                <>
                    {words ?
                        <Text>Artículos que incluyen las palabras: {words}</Text>
                        :
                        null}
                    <List
                        itemLayout="horizontal"
                        dataSource={articulos}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.articulo}
                                    description={
                                        <>
                                            <Text>Entidad:<b>{item.estado}</b></Text><br />
                                            <Text>Ley/Reglamento:<b>{item.ley}</b></Text><br />
                                            <ModifiedText
                                                text={item.texto}
                                                leyes={leyes}
                                                data={leyesData}
                                                leyAct={item.ley}
                                                // estadoAct={item.estado}
                                                datatot={data}
                                            /><br />
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
