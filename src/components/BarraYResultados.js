import React, { useState, useEffect } from 'react'
import { Input, AutoComplete } from 'antd';
import { SelectProps } from 'antd/es/select';
import ListaResultados from './ListaResultados';
import CollapseEstados from './CollapseEstados';
import ResultadosCompArt from './ResultadosCompArt';

function BarraYResultados({ tipo }) {

    const [words, setWords] = useState(null)
    const [data, setData] = useState()

    useEffect(() => {
        function getEstados() {
            fetch('/articulos.json')
                .then(function (response) {
                    return response.json()
                })
                .then(function (myJson) {
                    setData(myJson)
                })

        }
        getEstados()
    }, [])

    const placeholders = (
        tipo === "leyes" ? "Buscar por título" :
            tipo === "estado" ? "Buscar por estado" :
                tipo === "articulo" ? "Buscar por palabra clave" :
                    null
    )

    const handleSearch = (value) => {
        setWords(value)
        console.log(value)
    }

    const handleChange = e => {
        setWords(e.target.value)
    };


    return (
        <div>
            <Input.Search size="large" placeholder={placeholders} onChange={handleChange} onSearch={handleSearch} enterButton />
            {tipo === "leyes" ?
                <ListaResultados tipo={tipo} words={words} />
                :
                tipo==="estado" ?
                <CollapseEstados tipo={tipo} words={words} data={data} />
                :
                <ResultadosCompArt data={data}/>

            }
        </div>
    )
}

export default BarraYResultados
