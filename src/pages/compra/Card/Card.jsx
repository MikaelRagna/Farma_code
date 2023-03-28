import React, { useState } from "react"
import './Card.css'
import Cardbtn from "./components/Cardbtn"
import { ModalContext } from "../header/modalCesta/useModalContext/ModalContext"

export default function Card(props) {
    const  [btnadciona, setBtnadciona] = useState(true)
    const [count, setCount] = useState(0)
    const clicka = ()=>{
        setBtnadciona(false)
        setCount(1)
    }

    return (
            <div className="produtos" >
                <img className="img-produtos" src={props.img} alt="" />
                <h1 className="titulo-produtos">{props.nome}</h1>
                <span className="preco-produtos">R${props.value}</span>
                {
                btnadciona ? 
                <button className="btn-produtos" onClick={() => clicka()}>Adicionar</button>
                :
                <Cardbtn
                produto={props.item}
                setBtnadciona={setBtnadciona} 
                value={count} 
                setValue={setCount}
                />}
           </div>
    )
}