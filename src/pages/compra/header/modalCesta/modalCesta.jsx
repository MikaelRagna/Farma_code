import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./modalCesta.css";
import api from "../../../../../.api.config.json";
import { ModalContext } from "./useModalContext/ModalContext";

export default function ModalCesta() {
  const {
    modal,
    closeModal,
    quantidadeTotal,
    sacola,
    setSacola,
    cestaTotal,
    setCestaTotal,
  } = useContext(ModalContext);
  const [listaReceita, setListaReceita] = useState([]);
  const { hash } = useParams();

  useEffect(() => {
    fetch(`${api.link}/receita/get/${hash}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSacola(data.receita.lista_de_medicamentos);
        setListaReceita(data.receita.lista_de_medicamentos);
      })
      .catch((err) => console.log(err));
  }, []);

  let total = 0;
  let valorTotal = 0;

  const apresente = () => {
    sacola.map((ele) => (valorTotal += parseFloat(ele.precoTotal)));
    sacola.map((ele) => (total += ele.quantidade));
    setCestaTotal(total);
    return total, valorTotal;
  };
  apresente();
  const handleAdd = () => {};

  return (
    <div className={modal ? "none" : "modalBackgorund"}>
      <div className="modalCesta">
        <div className="header-sacola">
          <button className="btn-fecha-modal" onClick={closeModal}>
            x
          </button>
          <p className="titulo-menu-header">Minha cesta</p>
          <span className="item-tot">
            {sacola ? <div>{total}</div> : <div>{}</div>}
          </span>
        </div>
        <div className="produstos-selecioandos"></div>
        <div className="valores">
          <div className="muda">
            {sacola.map((item) => (
              <div key={item._id} className="conteiner-item">
                <span className="item-cesta">
                  {item.remedio.nome}
                  <span className="conteiner-valores">
                    <span className="btn-produto-cesta"> <button className="btn-produto-cesta">-</button> {item.quantidade} <button className="btn-produto-cesta">+</button></span>
                    <span>R${parseFloat(item.precoTotal)}</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="valor-total">
          <span className="text-subtotal">Sub total:</span>
          <span className="text-valorTotal">R${valorTotal}</span>
        </div>
        <button className="btn-ofertas">Finalizar Pedido</button>
      </div>
    </div>
  );
}
