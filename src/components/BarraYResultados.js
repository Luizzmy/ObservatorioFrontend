import React, { useState, useEffect } from 'react'
import { Input, AutoComplete, Menu, message, Typography } from 'antd';
import ListaResultados from './ListaResultados';
import CollapseEstados from './CollapseEstados';
import ResultadosCompArt from './ResultadosCompArt';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography
function BarraYResultados({ tipo }) {

    const [words, setWords] = useState(null)
    const [data, setData] = useState()
    const [leyes, setLeyes] = useState()
    const [tipoBusq, settipoBusq] = useState()

    useEffect(() => {
        function getData() {
            fetch('/articulos.json')
                .then(function (response) {
                    return response.json()
                })
                .then(function (myJson) {
                    setData(myJson)
                })

        }
        getData()
    }, [])

    const placeholders = (
        tipo === "leyes" ? "Buscar por título" :
            tipo === "estado" ? "Buscar por estado" :
                tipo === "articulo" ? "Busque artículos  por palabra clave" :
                    null
    )

    const handleSearch = (value) => {
        setWords(value)
        console.log(value)
    }

    const handleChange = e => {
        setWords(e.target.value)
    };

    const handleLeyChange = e => {
        setWords(e)
    };

    const handleArtChange = e => {
        setWords(e)
    };

    const handleArtSearch = (value) => {
        setWords(value)
        console.log(value)
    }


    useEffect(() => {
        function makeMenu(data) {
            let leyes = []
            let res = []
            let n = 0
            for (let i in data) {
                leyes.push(...Object.keys(data[i]))
            }
            leyes.forEach(e => {
                n = n + 1
                res.push(
                    {value:e}
                )
            })
            setLeyes(res)
        }

        if (data) {
            makeMenu(data)
        }
    }, [data])

    return (
        <div>
            <Input.Search size="large" placeholder={placeholders} onSearch={handleSearch} enterButton />
            <br/>
            <br/>
            {tipo === "articulo" && leyes ?
                <div>
                    <Text>Ó seleccione una ley y busque por número de artículo</Text>
                    <br />
                    <AutoComplete
                        style={{
                            width: "100%",
                            marginBottom:"5px"
                        }}
                        options={leyes}
                        onChange={handleLeyChange}
                        placeholder="Busque una ley por nombre"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                    <Input.Search size="large" placeholder="No. de articulo" onChange={handleArtChange} onSearch={handleArtSearch} enterButton />
                </div>
                :
                null}
            {tipo === "leyes" ?
                <ListaResultados tipo={tipo} words={words} />
                :
                tipo === "estado" ?
                    <CollapseEstados tipo={tipo} words={words} data={data} />
                    :
                    <ResultadosCompArt data={data} words={words} tipoBusq={tipoBusq} />

            }
        </div>
    )
}

export default BarraYResultados
