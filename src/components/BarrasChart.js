import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { Spin, Space} from 'antd'

function BarrasChart({data, series, entidades}) {
    console.log(series)
    console.log(data)
    console.log(entidades)

    const [options, setOptions] = useState()

    let seriesArr=[]

    data.forEach(e => {
        console.log(e[Object.keys(e)[0]])
        seriesArr.push(
            {
                name: Object.keys(e)[0].replace("demo-", ""),
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: e[Object.keys(e)[0]][1].slice(1,e[Object.keys(e)[0]][1].length-2)
            }
        )
    });

    useEffect(() => {
        async function makeOptions(){

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: entidades,
                        axisLabel:{
                            height:60,
                            width:90,
                            rotate:90,
                            overflow:"truncate",
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                    }
                ],
                series:seriesArr 
            }
            setOptions(option)
        }
        makeOptions()
    }, [series])


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

export default BarrasChart
