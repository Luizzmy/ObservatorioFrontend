import React from 'react'
import { Table, Tag, Space } from 'antd';
import {getCSVData} from './MenuEscenarios'

const searchRegExp = /\s/g;
const replaceWith = '-';

function makeColumns(data){
  let arr=[]
  data[0].forEach(e => {
    arr.push({
      title:e,
      dataIndex:e.replace(searchRegExp, replaceWith),
      key:e.replace(searchRegExp, replaceWith)
    })
  });
  return arr
}

function makeTableData(data){
  let arr=[]
  for(let i=1; i<data.length; i++){
    let result={}
    data[0].forEach((key, j) => result[key.replace(searchRegExp, replaceWith)] = data[i][j])
    result['key']=i
    arr.push(result)
  }
  return arr
}


function TablaResumen({data}) {

  makeColumns(data)
  console.log(makeTableData(data))

    return (
        <div>
            <Table columns={makeColumns(data)} dataSource={makeTableData(data)} scroll={{ x: 1300 }} />
        </div>
    )
}

export default TablaResumen
