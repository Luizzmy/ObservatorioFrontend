import React, { useState } from 'react'
import { Typography, Modal } from 'antd'
import ModalArticulo from './ModalArticulo';

const { Text } = Typography

function isNumeric(num) {
    if (num !== " ") {
        return !isNaN(num)
    } else {
        return false
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function ModifiedText({ text, leyes, data, leyAct, estadoAct, datatot }) {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [articulo, setArticulo] = useState()

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }


    let allLeyes = []
    for (let i in datatot) {    
        for (let j in datatot[i]) {
            allLeyes.push(j)
        }
    }


    const handleOnClick = (articulo, ley) => {
        setArticulo(articulo)
        setIsModalVisible(true)
    }

    let leyesArr = []
    leyes.forEach(l => {
        leyesArr.push(l.value)
    })
    const element = "a"
    let artAct = []
    if (estadoAct) {
        artAct = (Object.keys(data[estadoAct][leyAct]))
        artAct = artAct.reverse()
        leyesArr = leyesArr.concat(artAct)
    } else {
        artAct = (Object.keys(data[leyAct]))
        artAct = artAct.reverse()
        leyesArr = leyesArr.concat(artAct)
    }

    let modifiedWords = leyesArr.reduce(
        (prev, word) => {
            let newWords = [];
            const reg = new RegExp(escapeRegExp(word), "gi");
            let index;

            prev.forEach(e => {
                // Only match for element which is string, if it is not string,
                // it's already processed(like span or something)
                if (typeof e === "string") {
                    let wordLength = word.length;
                    let matched = false;

                    do {
                        const { index } = reg.exec(e) || {};

                        // Keep matching till no more matches found
                        if (index !== undefined) {
                            newWords.push(e.substr(0, index));
                            //First conditional if word is an article
                            if (word.toLowerCase().normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .includes("articulo")) {
                                    //If article is included in the same law
                                if (e.substr(index + wordLength, 50)
                                    .toLowerCase().normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .includes("de esta ley") ||
                                    e.substr(index + wordLength, 50)
                                        .toLowerCase().normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, "")
                                        .includes("presente ley")) {
                                            //If article is followed by an extra number (not a correct match)
                                    if (!isNumeric(e.substr(index + wordLength, 1))) {
                                        newWords.push(
                                            React.createElement(
                                                element,
                                                {
                                                    key: `position-${newWords.length}-${index}`,
                                                    // href: "https://www.sopitas.com/",
                                                    onClick: () => { handleOnClick(e.substr(index, wordLength)) },
                                                    target: "_blank"
                                                },
                                                e.substr(index, wordLength)

                                            )
                                        );
                                    }
                                    else {
                                        newWords.push(e.substr(index, wordLength))
                                        matched = false
                                    }
                                }
                                else allLeyes.forEach(l=>{
                                    if(e.substr(index+wordLength, 70)
                                    .toLowerCase().normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .includes(l)){
                                        newWords.push(
                                            React.createElement(
                                                element,
                                                {
                                                    key: `position-${newWords.length}-${index}`,
                                                    // href: "https://www.sopitas.com/",
                                                    onClick: () => { handleOnClick(e.substr(index, wordLength), l) },
                                                    target: "_blank"
                                                },
                                                e.substr(index, wordLength)

                                            )
                                        );
                                    }
                                })
                            } else {
                                newWords.push(
                                    React.createElement(
                                        element,
                                        {
                                            key: `position-${newWords.length}-${index}`,
                                            //   href:"link para descargar ley"
                                        },
                                        e.substr(index, wordLength)

                                    )
                                );
                            }

                            // You can also directly use span here instead of React.createElement
                            // newWords.push(<span>{e.substr(index, wordLength)}</span>);
                            newWords.push(e.substr(index + wordLength));
                            matched = true;
                        }
                    } while (index);

                    // If word is not matched, push original sentence
                    if (!matched) {
                        newWords.push(e);
                    }
                } else {
                    // Push processed element as it is
                    newWords.push(e);
                }
            });

            return newWords;
        },
        [text]
    )

    return (
        <>
            <Text>{modifiedWords}</Text>
            <Modal title={articulo} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <ModalArticulo articulo={articulo} data={data} ley={leyAct} />
            </Modal>
        </>
    )
}

export default ModifiedText
