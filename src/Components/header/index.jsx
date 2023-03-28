import React from 'react';
import './header.css';  
import logo from '../../assets/logo2.svg';
import Lock from "../../assets/cadeado.png";
import { useNavigate } from 'react-router-dom';

function Header(){

  const navigate = useNavigate();

    const nav = () =>{
      navigate('/')
    };

    return(
        <div className="header-pmenos">
        <img className='header-logoo' src={logo} onClick={() => nav() }></img>
        <div className='btn-content'>
          <img src={Lock} alt="Certificado de segurança" className='btn-img'/>
          <span className='btn-text'>Ambiente seguro</span>
        </div>
      </div>
    )

}

export default Header