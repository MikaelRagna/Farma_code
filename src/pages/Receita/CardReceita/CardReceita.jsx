import React, { useContext } from "react";

import "./CardReceita.css";
import { AddRemedioContext } from "../ReceitaContext/AddRemedioContext";

function CardReceita({ b }) {
  const { setIndicacoes, RemedioIndicado, setResult } =
    useContext(AddRemedioContext); 

    function addQuantidade(){
      b.quantidade = 1
    }

  return (
    <button
      onClick={() => {
        {
          addQuantidade();
          RemedioIndicado(b);
          setIndicacoes("");
        }
        setResult(false);
      }}
      className="cardReceita"
    >
      <img src={b.urlImage} alt="" />
      <div className="cardReceita-info">
        <h3>{b.nome}</h3>
      </div>
      <p>{`R$${b.preco}`}</p>
    </button>
  );
}

export default CardReceita;
