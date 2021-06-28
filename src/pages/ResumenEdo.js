import React from 'react'
import MenuResumen from '../components/MenuResumen'
import { useContextData } from '../hooks/context';
import { Redirect} from 'react-router-dom'

function ResumenEdo() {

    const { user } = useContextData()

    return user ? (


        <div>
            <MenuResumen tipo={"edo"}/>
        </div>
    )
    :<Redirect to={"/"}/>

}

export default ResumenEdo
