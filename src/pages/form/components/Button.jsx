import React from "react";

export default function Button(props) {
    return (
        <button className="btn" onClick={props.onClick}>
            {props.texto}
        </button>
    );
}