import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { Spin, Space } from 'antd'


function LineasChart({ title, data, series, entidades, dataPEF, cocPEF }) {

    const [options, setOptions] = useState()
    


    let datasetArr = [{
        id: 'dataset_raw',
        source: data
    }]
    let seriesArr = []

    if (dataPEF) {
        console.log(dataPEF)
        datasetArr.push({
            id: 'dataset_pef',
            source: dataPEF
        },
            {

                id: `dataset_since_2019_PEF`,
                fromDatasetId: 'dataset_pef',
                transform: {
                    type: 'filter',
                    config: {
                        and: [
                            { dimension: 'fecha', gte: 2019 },
                            { dimension: "serie", "=": `${dataPEF[1][3]}` }
                        ],
                    }
                }

            })
        seriesArr.push({
            type: 'line',
            datasetId: `dataset_since_2019_PEF`,
            showSymbol: false,
            name: `PEF`,
            // itemStyle: {
            //     color: "#306151"
            // },
            encode: {
                x: 'fecha',
                y: `PEF`,
                itemName: 'fecha',
                tooltip: [`PEF`],
            }
        })
    }
    series.forEach(e => {
        datasetArr.push(
            {
                id: `dataset_since_2019_${e}`,
                fromDatasetId: 'dataset_raw',
                transform: {
                    type: 'filter',
                    config: {
                        and: [
                            { dimension: 'fecha', gte: 2019 },
                            { dimension: "fecha", "<": 2119 },
                            { dimension: "serie", "=": `${e}` }
                        ],
                    }
                }
            }
        )
        // datasetArr.push(
        //     {
        //         id: `dataset_since_2019_PEF`,
        //         fromDatasetId: 'dataset_PEF',
        //         transform: {
        //             type: 'filter',
        //             config: {
        //                 and: [
        //                     { dimension: 'fecha', gte: 2019 },
        //                     { dimension: "serie", "=": `${e}` }
        //                 ],
        //             }
        //         }
        //     }
        // )
        if (!e.includes("PEF")) {
            entidades.forEach(d => {
                seriesArr.push(
                    {
                        type: 'line',
                        datasetId: `dataset_since_2019_${e}`,
                        showSymbol: false,
                        name: `${e}-${d}`,
                        // itemStyle: {
                        //     color: "#306151"
                        // },
                        encode: {
                            x: 'fecha',
                            y: `${d}`,
                            itemName: 'fecha',
                            tooltip: [1],
                        }
                    }
                )

            })

        }


    });

    useEffect(() => {
        async function makeOptions() {


            const option = {
                dataset: datasetArr,
                grid:{
                    left:"25%"
                },
                legend: {
                    show: true,
                    type:"scroll",
                    scrollDataIndex:0,
                    padding: 0,
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    nameLocation: 'middle'
                },
                yAxis: {
                    type: "value",
                    scale:true,
                    axisLabel: {
                        formatter: function (value, index) {
                            if(cocPEF){
                                return value + "%"
                            } else {
                                if (value > 500000) {
                                    return (value / 1000000 + "M").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                } else
                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            }

                    },
                },
                series: seriesArr,
            };
            setOptions(option)

        }
        // }

        makeOptions()
    }, [data])


    return (
        <div>
            {options ?
                <div style={{ textAlign: "right", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <ReactECharts
                        option={options}
                        style={{ height: "50vh", width: "100%" }}
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
