import React, {useState, useEffect} from 'react'
import { CSVLink } from "react-csv";
import { Button } from 'antd';

const searchRegExp = /\s/g;
const replaceWith = '-';

function getCSVData(data) {
    let CSVdata = []
    for (let i = 1; i < data.length; i++) {
      var result = {};
      data[0].forEach((key, j) => result[key.replace(searchRegExp, replaceWith)] = data[i][j])
      CSVdata.push(result)
    }
    return CSVdata
  }

function getHeaders(data) {
    let headers = []
    data[0].forEach(e => {
      headers.push({
        label: e,
        key: e.replace(searchRegExp, replaceWith)
      })
    })
    return headers
  }

function CSVdownload({data}) {

    console.log(data)

  const [csvReport, setcsvReport] = useState()

    useEffect(() => {
        function getCSV(){
          let dataArr = []
          if(data){
            data.forEach(e => {
              dataArr.push(Object.values(e))
             })
             console.log(dataArr)
            const csvReport = {
              data: getCSVData(dataArr),
              headers: getHeaders(dataArr),
              filename: 'Descarga_de_datos.csv'
             };
            setcsvReport(csvReport)
          }
        }
        getCSV()
      }, [data])


    return (
        <div>
                        {csvReport ?
              <CSVLink {...csvReport}><Button type="primary" >Descargar CSV</Button></CSVLink>
              :
              null
            }
            
        </div>
    )
}

export default CSVdownload
