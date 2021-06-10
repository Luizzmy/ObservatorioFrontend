import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { Spin, Space} from 'antd'


function LineasChart({title, data}) {

    const [options, setOptions] = useState()

    useEffect(() => {
        async function makeOptions(){
                let seriesArr=[]
                let seriesNames=[]
                let selectedSeries=["egresos_pcp"]
                for(let i=0; i<selectedSeries.length; i++){
                    seriesArr.push(
                        // data[0][i]
                        {
                        type: 'line',
                        datasetId: 'dataset_since_2019',
                        showSymbol: false,
                        name:`${selectedSeries[i]}`,
                        encode: {
                            x: 'fecha',
                            y: `${selectedSeries[i]}`,
                            itemName: 'fecha',
                            tooltip: [`${selectedSeries[i]}`],
                        }
                    }
                    )
                    i=i+1
                    seriesNames.push(selectedSeries[i])
                    
                }
                console.log(seriesArr)
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
                    seriesArr
                    // [{
                    //     type: 'line',
                    //     datasetId: 'dataset_since_2019',
                    //     showSymbol: false,
                    //     encode: {
                    //         x: 'fecha',
                    //         y: 'egresos_pcp',
                    //         itemName: 'fecha',
                    //         tooltip: ['egresos_pcp'],
                    //     }
                    // },
                    // {
                    //     type: 'line',
                    //     datasetId: 'dataset_since_2019',
                    //     showSymbol: false,
                    //     encode: {
                    //         x: 'fecha',
                    //         y: 'egresos_ga',
                    //         itemName: 'fecha',
                    //         tooltip: ['egresos_ga'],
                    //     }
                    // }, 
                    // {
                    //     type: 'line',
                    //     datasetId: 'dataset_since_1950_of_france',
                    //     showSymbol: false,
                    //     encode: {
                    //         x: 'Year',
                    //         y: 'Income',
                    //         itemName: 'Year',
                    //         tooltip: ['Income'],
                    //     }
                    // }
                //  ]
                };
            setOptions(option)


            }

        makeOptions()
    }, [data])


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
