import React from "react";
import "./index.css";

export default function Item(props) {
  return (
    <div>
      <div className="item_title">
        <div>
          {" "}
          {props.quantidade} unidades de <span className="">{props.nome}</span>
        </div>
      </div>

      <div className="item_desc">{props.desc}</div>
    </div>
  );
}
