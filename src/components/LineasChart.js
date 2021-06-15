import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { Spin, Space } from 'antd'


function LineasChart({ title, data, series, entidades }) {

    const [options, setOptions] = useState()

    let datasetArr = [{
        id: 'dataset_raw',
        source: data
    }]
    let seriesArr = []
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
                            { dimension: "serie", "=": `${e}` }
                        ]
                    }
                }
            }
        )
        entidades.forEach(d=>{
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
                        tooltip: [`${e}`],
                    }
                }
            )
                
        })


    });

    useEffect(() => {
        async function makeOptions() {


            const option = {
                dataset: datasetArr,
                // title: {
                //     text: title
                // },
                legend: {
                    show: true,
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    nameLocation: 'middle'
                },
                yAxis: {
                    type:"value",
                    axisLabel: {
                        formatter: function (value, index) {
                            if(value>500000){
                                return (value/100000 + " M").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            } else
                            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
                        }
                    },
                    // name: 'egresos_pcp'
                },
                series: seriesArr
                //     {
                //         type: 'line',
                //         datasetId: 'dataset_since_2019',
                //         showSymbol: false,
                //         name: `${series}`,
                //         itemStyle: {
                //             color: "#306151"
                //         },
                //         encode: {
                //             x: 'fecha',
                //             y: `${series}`,
                //             itemName: 'fecha',
                //             tooltip: [`${series}`],
                //         }
                //     }

            };
            setOptions(option)

        }
        // }

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
