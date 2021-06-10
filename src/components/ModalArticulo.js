import React, { useState, useEffect } from 'react'
import {Modal, Typography} from 'antd'

const {Text}=Typography

function capitalizeFirstLetter(string) {
  string=  string.charAt(0).toUpperCase().replace("i", "í") + string.slice(1);
  console.log(string)
    return string
}

function ModalArticulo({data, articulo, ley}) {

  console.log(data)
  console.log(articulo)
  console.log(ley)

  const [articuloFiltered, setArticuloFiltered] = useState()

  useEffect(() => {
    function getArticulo(data, articulo, ley){
      
      console.log(data[ley][capitalizeFirstLetter(articulo)])
    }
    getArticulo(data, articulo, ley)
  }, [])


    

    return (
        <div style={{textAlign:"left"}}>
            <Text><b>Ley: </b>{ley}</Text><br/>
            <Text><b>{articulo}: </b>{data[ley][capitalizeFirstLetter(articulo)].texto}</Text>

        </div>
    )
}

export default ModalArticulo
