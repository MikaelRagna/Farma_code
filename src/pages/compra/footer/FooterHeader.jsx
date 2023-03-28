import React from "react";
import "./FooterHeader.css"
import icon from "../../../assets/next.png"

export default function FooterHeader() {
    return (
        <div className="footer-barra-procura">
            <label className="label-texto" htmlFor="footer-email">RECEBA AS MELHORES OFERTAS!</label>
            <div className="box-input-email"><input className="input-email" id="footer-email" placeholder="Digite seu e-mail!" /><button className="input-btn_email"><img className="btn-icon-input" src={icon} alt="" /></button></div>
        </div>

        
    )
}