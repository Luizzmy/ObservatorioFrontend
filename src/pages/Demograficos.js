import React from 'react'
import {Col, Row} from 'antd'
import MenuDemograficos from '../components/MenuDemograficos'
import { useContextData } from '../hooks/context';
import { Redirect} from 'react-router-dom'

function Demograficos() {
    const { user } = useContextData()
    console.log(user)

    return user ? (

        <div>
                        <Row>
                <Col sm={24}>
                    <MenuDemograficos/>
                </Col>
            </Row>
            
        </div>
    )
    :<Redirect to={"/"}/>
}

export default Demograficos
