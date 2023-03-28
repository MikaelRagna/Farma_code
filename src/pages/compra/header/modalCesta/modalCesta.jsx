import { useParams } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react";
import './modalCesta.css'
import api from '../../../../../.api.config.json'
import { ModalContext } from './useModalContext/ModalContext'

export default function ModalCesta() {
    const { modal, closeModal, quantidadeTotal, sacola, receitaCesta, setReceitaCesta  } = useContext(ModalContext)
    const [listaReceita, setListaReceita] = useState([])
    const [objetoReceita, setObjetoReceita] = useState({})
    const { hash } = useParams()
   
    useEffect(() => {
        fetch(`${api.link}/receita/get/${hash}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setListaReceita(data.receita.lista_de_medicamentos)
                setObjetoReceita(data.receita.lista_de_medicamentos)
                console.log(listaReceita);
                setRec
                
                setReceitaCesta(data.receita.lista_de_medicamentos.length)
                setObjetoReceita(
                    ...objetoReceita,
                    item                
                )
                handleAdd()
            })
            .catch(err => console.log(err))
    }, [])


    const item = {
        ...objetoReceita,
        n:objetoReceita.quantidade
    }

    const handleAdd = () => {
      
        
    }

    return (
        <div className={modal ? "none" : "modalBackgorund"}>
            <div className='modalCesta' >
                <div className="header-sacola"><button
                    className="btn-fecha-modal" onClick={closeModal}>x</button>
                    <p className="titulo-menu-header">Minha cesta</p>
                    <span className="item-tot">{ listaReceita ?
                        <div>{listaReceita.length +quantidadeTotal /*qtdTReceita.qtdRec*/}</div>
                        :
                        <div>{ quantidadeTotal}</div>
                    }</span>
                </div>
                <div className="produstos-selecioandos"></div>
                <div className='valores'>
                    <div className="muda" >
                        {sacola.map((item) => <div key={item._id} className="item"><span>{item.nome} {item.qtdI + 1} <img src={item.urlImage} className="item-img" /> </span></div>)}
                        {listaReceita ?
                            listaReceita.map((ele, i) =>
                                <div className="item" key={i}>
                                    {ele.remedio.nome}
                                    
                                    <p key={i} className="valor">  {ele.quantidade}</p>
                          
                                </div>)
                            :
                            <div></div>
                        }
                    </div>
                </div>
                <button className="btn-ofertas">Ver ofertas</button>
            </div>
        </div>
    )
}  