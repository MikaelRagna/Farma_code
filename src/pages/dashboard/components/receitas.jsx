import React, { useState } from "react";
import "./receitas.css";
import Show from "../../../assets/vector.png";

export default function Receita(props) {
  const [status, setStatus] = useState(false);

  const show = () => {
    setStatus(!status);
  };


  return (

    <div className="receita_row" >
      <div className="item">
        <div className="item_title">
          <p className="paciente">Paciente: {props.nomePaciente}</p>
          <a className="link" href={`/receitadigital/${props.link}`}>Link para receita</a>
          <p className="validade">Data de validade: {props.vencimento}</p>
        </div>

        <img src={Show} alt="icon_show" className="icon_show" onClick={show}  />
      </div>

      <div className={status ? "info_show" : "none"}>
        <p className="content_title">Lista de medicamentos</p>
        <div className="content_info">

          {props.remedios.map((item ,i) => {
            return (
              <div key={i} className="content_item">
                <p className="remedio_name">{item.remedio.nome}</p>
                <p className="remedio_desc">{item.prescricao}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
