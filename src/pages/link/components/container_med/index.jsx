import React from "react";
import './index.css'

export default function Item(props){
    return(
        <div>
            <div className="item_title">

            {props.nome}
            </div>

            <div className="item_desc">

            {props.desc}
            </div>

        </div>
    )
}