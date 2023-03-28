import React from "react";

export default function Loc(props) {


  return (
    <div>
      {props.loc.lojas.map((item) => (
        <div key={item._doc._id}>
          <div className="item_title">
            {item._doc.endereco}
          </div>
          <div className="item_desc">   
            <p>A <span style={{ color: "#464646" }}>{item.dist} Km</span> de você! </p>
          </div>
        </div>
      ))}
    </div>
  );
}
