import React from 'react'
import {Col, Row} from 'antd'
import MenuDemograficos from '../components/MenuDemograficos'

function Demograficos() {

    return (
        <div>
                        <Row>
                <Col sm={24}>
                    <MenuDemograficos/>
                </Col>
            </Row>
            
        </div>
    )
}

export default Demograficos
