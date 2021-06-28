import React from 'react'
import {Col, Row} from 'antd'
import LineasChart from '../components/LineasChart'
import MenuEscenarios from '../components/MenuEscenarios'
import { useContextData } from '../hooks/context';
import { Redirect} from 'react-router-dom'
  //User context data



function Escenarios() {
    const { user } = useContextData()
    // console.log(user)

    return user ? (
    // return(
        
        <div>
            

<Row>
<Col sm={24}>
    <MenuEscenarios/>
</Col>
</Row>

        </div>
    )
     :<Redirect to={"/"}/>
}

export default Escenarios
