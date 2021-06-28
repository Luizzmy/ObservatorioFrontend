import React from 'react'
import MenuResumen from '../components/MenuResumen'
import { useContextData } from '../hooks/context';
import { Redirect} from 'react-router-dom'

function ResumenAct() {

    const { user } = useContextData()
    console.log(user)

    
    return user ? (


        <div>
            <MenuResumen tipo={"act"}/>
        </div>
    )
    :<Redirect to={"/"}/>

}

export default ResumenAct
