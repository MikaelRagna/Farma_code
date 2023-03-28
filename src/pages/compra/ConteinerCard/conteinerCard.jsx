import { useState,useEffect } from 'react'
import Card from '../Card/Card'
import './conteinerCard.css'
import api from "../../../../.api.config.json"

export default function CriandoCard() {
    const [produto, setProduto] = useState([])
   
    useEffect(()=>{
        fetch(`${api.link}/produto/todos`, {
            method:'GET',
            headers:{
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setProduto(data.produto
        )})
        .catch(err => console.log(err))  
    }, [])

    return(
        <div className='conteineCards'>
            <h1 className='titulo-conteiner'>Medicamentos</h1>
            <div className='gridProdutos'>
            {produto.map((item)=> 
            <Card 
            key={item._id}
            nome={item.nome} 
            img={item.urlImage}
            value={item.preco}
            item={item}
            />)}  
            </div>
        </div> 
    )
}