import React, { useEffect } from 'react'
import BarraYResultados from '../components/BarraYResultados'
import { useContextData } from '../hooks/context';
import { Redirect} from 'react-router-dom'


function Buscador({match: { params: { tipo }}}) {
    const { user } = useContextData()
    console.log(user)


    return user ? (

        <div>
            <BarraYResultados tipo={tipo}/>
        </div>
    )
    :<Redirect to={"/"}/>
}

export default Buscador
