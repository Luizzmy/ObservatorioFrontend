import React, { useEffect, useState } from 'react'
import { obtainResumenAct, obtainResumenEdo } from '../services/index'
import TablaResumen from './TablaResumen'

function MenuResumen({tipo}) {

    const [data, setData] = useState()

    useEffect(() => {
        async function getData() {
            if(tipo==="edo"){
                const { data } = await obtainResumenEdo()
                setData(data)
            }else {
                const { data } = await obtainResumenAct()
                setData(data)
            }
        }
        getData()
    }, [])

    return (
        <div>
            {data ?
                <TablaResumen data={data}/>
                :
                null
            }
        </div>
    )
}

export default MenuResumen
