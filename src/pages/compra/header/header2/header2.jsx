import React from "react";
import './header2.css'
import { useNavigate } from "react-router-dom";
export default function Header2(){
    const navigate = useNavigate();

    const rotaLogin=()=>{
        navigate("/login")
    }

    return (
        <div className="conteiner-header-menu">
            <span className="menu-header"><img className="icon-menu" />Todas Categorias</span>
            <span className="opcoes-menu">Medicamentos</span>
            <span className="opcoes-menu" onClick={()=>rotaLogin()}>Receitas</span>   
        </div>
    )
}