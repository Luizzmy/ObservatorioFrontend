import React, { useEffect } from 'react'
import BarraYResultados from '../components/BarraYResultados'

function Buscador({match: { params: { tipo }}}) {

    
    return (
        <div>
            <BarraYResultados tipo={tipo}/>
        </div>
    )
}

export default Buscador
