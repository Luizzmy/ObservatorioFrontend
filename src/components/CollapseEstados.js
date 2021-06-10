import React, { useEffect, useState } from 'react'
import { Row, Col, Collapse } from 'antd';
import ResultadosDosColumnas from './ResultadosDosColumnas';
const { Panel } = Collapse;

function CollapseEstados({ tipo, words, data, leyes }) {

    function callback(e) {
        console.log(e);
    }

    function CollapsedEstados({ data }) {
        let res = []
        let n = 0
        for (let i in data) {
            res.push(<Panel header={i} key={n}>
                <ResultadosDosColumnas data={data[i]} leyesObjs={leyes} datatot={data} />
            </Panel>)
            n = n + 1
        }
        let filteredRes=[]
        if(words){
            filteredRes=res.filter(r=>r.props.header.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .includes(words.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
        }
        return (
            <>
                <Collapse defaultActiveKey={['0']} onChange={callback}>
                    {filteredRes.length>0 ? filteredRes : res}
                </Collapse>
            </>
        )

    }

    return (
        <div>
            {data ?
                <CollapsedEstados data={data} />
                :
                null}
        </div>
    )
}

export default CollapseEstados
