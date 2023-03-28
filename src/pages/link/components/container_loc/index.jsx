import React from "react";

export default function Loc(props) {

  const ord_cres = props.loc.lojas.filter(e => e.dist > e.dist)

  console.log(ord_cres);

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
