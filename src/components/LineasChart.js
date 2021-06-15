import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { Spin, Space} from 'antd'


function LineasChart({title, data, series}) {

    const [options, setOptions] = useState()
    const [seriesSelec, setSeriesSelec] = useState()
    const [seriesNames, setSeriesNames] = useState()


    // useEffect(() => {
    //     function makeSeries(){
    //         let seriesArr=[]
    //         let seriesNames=[]
    //             series.forEach(s=>{
    //                 seriesArr.push(
    //                     {
    //                     type: 'line',
    //                     datasetId: 'dataset_since_2019',
    //                     showSymbol: false,
    //                     name:`${s}`,
    //                     encode: {
    //                         x: 'fecha',
    //                         y: `${s}`,
    //                         itemName: 'fecha',
    //                         tooltip: [`${s}`],
    //                     }
    //                 }
    //                 )
    //             seriesNames.push(s)
    //             })
    //         setSeriesSelec(seriesArr)
    //         setSeriesNames(seriesNames)
    //     }
    //     makeSeries()
    // }, [series, data])
    useEffect(() => {
        async function makeOptions(){
            console.log(series)
            // if(seriesSelec){

            
                const option = {
                    dataset: [{
                        id: 'dataset_raw',
                        source: data
                    }, {
                        id: 'dataset_since_2019',
                        fromDatasetId: 'dataset_raw',
                        transform: {
                            type: 'filter',
                            config: {
                                and: [
                                    { dimension: 'fecha', gte: 2019 }
                                ]
                            }
                        }
                    }
                ],
                    // title: {
                    //     text: title
                    // },
                    legend:{
                        show:true,
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        nameLocation: 'middle'
                    },
                    yAxis: {
                        // name: 'egresos_pcp'
                    },
                    series: 
                     {
                     type: 'line',
                     datasetId: 'dataset_since_2019',
                     showSymbol: false,
                     name:`${series}`,
                     itemStyle:{
                         color:"#306151"
                     },
                     encode: {
                         x: 'fecha',
                         y: `${series}`,
                         itemName: 'fecha',
                         tooltip: [`${series}`],
                     }
                 }
                    
                };
            setOptions(option)

            }
            // }

        makeOptions()
    }, [data, series])


    return (
        <div>
            {options ?
                <div style={{ textAlign: "right" }}>
                    <ReactECharts
                        option={options}
                        style={{ height: 600, width: "100%" }}
                    />
                </div>
                : <Space size="middle">
                    <Spin />
                </Space>
            }

        </div>
    )
}

export default LineasChart
