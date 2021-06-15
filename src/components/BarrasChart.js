import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { Spin, Space} from 'antd'

function BarrasChart({data, variable}) {
    console.log(variable)

    const [options, setOptions] = useState()

    useEffect(() => {
        async function makeOptions(){

            var app = {};

var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];

app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    // onChange: function () {
    //     var labelOption = {
    //         normal: {
    //             rotate: app.config.rotate,
    //             align: app.config.align,
    //             verticalAlign: app.config.verticalAlign,
    //             position: app.config.position,
    //             distance: app.config.distance
    //         }
    //     };
        // myChart.setOption({
        //     series: [{
        //         label: labelOption
        //     }, {
        //         label: labelOption
        //     }, {
        //         label: labelOption
        //     }, {
        //         label: labelOption
        //     }]
        // });
    // }
};

let entidades=[]
data.forEach(e => {
    entidades.push(e[0])
});
console.log(entidades)
let series=[]
data.forEach(e=>{
    series.push(e[variable[0]])
})

let filteredData=data.filter(e=>e[0]==="Aguascalientes")
console.log(filteredData[0].slice(1,filteredData[0].length))


            var labelOption = {
                show: true,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: function (params){
                    console.log(params)
                    return (`${params.name}`)
                },
                fontSize: 16,
            };

            const option = {
                legend:{

                },
                tooltip:{

                },
                xAxis: {
                    show:true,
                    axisLabel:{
                        height:60,
                        width:60,
                        rotate:90,
                        overflow:"truncate",
                    },
                    type: 'category',
                    data: entidades.slice(1, entidades.length-1)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name:`${variable[1]}`,
                    data: series.slice(1, entidades.length-1),
                    type: 'bar',
                    itemStyle:{
                        color:"#306151"
                    },
                    // label: labelOption
                }]
            }
            setOptions(option)
        }
        makeOptions()
    }, [variable])


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
