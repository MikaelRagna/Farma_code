import React from "react";
import CardReceita from "../CardReceita/CardReceita";

import "./ListaResultado.css";

function ListaResultado({ lista }) {
  return (
    <div>
      {lista.map((l) => {
        return (
          <div className="listaResultado" key={l.nome}>
            <CardReceita b={l} />
          </div>
        );
      })}
    </div>
  );
}

export default ListaResultado;
