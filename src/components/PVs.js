import React from 'react'
import { Table, Tag, Space, Typography } from 'antd';

const {Text, Title}=Typography

const searchRegExp = /\s/g;
const replaceWith = '-';

function PVs({data, ents, rate}) {

    let cols=[]
    let entsArr=ents
    // console.log(entsArr)

    console.log(ents)

    ents.forEach(e => {
      cols.push({
        title:e,
        dataIndex:e.replace(searchRegExp, replaceWith),
        key:e.replace(searchRegExp, replaceWith)
      })
    });

    let tableData=[]
    for(let i=0; i<data.length; i++){
       let result={}
       ents.forEach((key, j) => result[key.replace(searchRegExp, replaceWith)] = parseFloat(data[i][j+1]) ? Math.floor(parseFloat(data[i][j+1])).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): data[i][j+1])
      result['key']=i
     tableData.push(result)
    }

    // console.log(cols)
    // console.log(tableData)
    return (
        <div>
            <Table columns={cols} dataSource={tableData} scroll={{x:true}}/>
        </div>
    )
}

export default PVs
