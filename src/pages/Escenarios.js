import React from 'react'
import {Col, Row} from 'antd'
import LineasChart from '../components/LineasChart'
import MenuEscenarios from '../components/MenuEscenarios'

function Escenarios() {
    return (
        <div>
            <Row>
                <Col sm={24}>
                    <MenuEscenarios/>
                </Col>
            </Row>
        </div>
    )
}

export default Escenarios
