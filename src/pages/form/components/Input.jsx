import React from "react";

export default function Input(props) {

  const handleValue = (e) => {
    props.setValue(e.target.value);
  }

  return (
    <div>
      <label>
        <h3 className="h3_title">{props.texto}</h3>
      </label>
      <input 
        placeholder={props.placeholder} 
        value={props.value} type={props.tipo} 
        onChange={handleValue}
      />   
    </div>
  );
}
