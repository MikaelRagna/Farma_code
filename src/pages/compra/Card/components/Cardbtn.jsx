import React, { useState, useContext, useEffect } from "react";
import "./Cardbtn.css"
import { ModalContext } from "../../header/modalCesta/useModalContext/ModalContext";

export default function Cardbtn(props) {
    const {quantidadeTotal, setQuantidadeTotal, setSacola, sacola } = useContext(ModalContext)
    const [quantidadeIndividual, setQuantidadeIndividual] = useState(1)
    const item = {
        ...props.produto,
        quantidade:quantidadeIndividual,
        precoTotal: parseFloat(props.preco),
        remedio:{
            nome:props.produto.nome
        } 
    }
    useEffect(() => {
        setSacola([
            ...sacola,
            item
        ])
        setQuantidadeIndividual(item.quantidade+1)
        setQuantidadeTotal(quantidadeTotal+1)
    }, [])

    const handleAdd = () => {
        props.setValue(props.value + 1)
        setQuantidadeTotal(quantidadeTotal + 1)
        preenche()
        console.log(item.preco);
    }

    const handleRemove = () => {
        if (props.value > 1) {
            props.setValue(props.value - 1)
            setQuantidadeTotal(quantidadeTotal - 1)
            sacola.filter((element) => {
                if (element.nome == item.nome) {
                    element.quantidade-=1
                }
            })
        } else {
            props.setValue(0)
            props.setBtnadciona(true)
            setSacola(sacola.filter((element) =>
                element.quantidade !== 0 
            ))
            setQuantidadeTotal(quantidadeTotal - 1)
            return
        }
    }
    
    const preenche = () => {
            sacola.filter((element) => {
                if (element.nome == item.nome) {
                    element.quantidade+=1
                    element.precoTotal = parseFloat(element.preco) * element.quantidade
                }
            })
    }
    
    return (
        <div className="btn-Card">
            <button className="btn-valor-produto" onClick={() => handleRemove()}>-</button>
            <p className="valor-produto">{props.value}
            </p><button className="btn-valor-produto" onClick={() => handleAdd()}>+</button>
        </div>
    )
}