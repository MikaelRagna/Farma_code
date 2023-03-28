import React, { useContext } from 'react'
import './header.css'
import Logo from "../../../assets/logo2.svg"
import Busca from "../../../assets/lupa.png"
import ModalCesta from './modalCesta/modalCesta'
import { ModalContext } from './modalCesta/useModalContext/ModalContext';
import Header2 from './header2/header2';
import CriandoCard from '../ConteinerCard/conteinerCard';

function Header() {
  const { openModal, quantidadeTotal, receitaCesta} = useContext(ModalContext)
  let cond = false

  if( quantidadeTotal != 0 ||receitaCesta !=0){
    cond = true
  }

  return (
    <div className='header'>
      <div className="header-pmenoss">
        <img className='header-logo' src={Logo}></img>
        <div className='buscador'>
          <img src={Busca} className='busca-lupa' />
          <input className='buscador-input' type="text" placeholder='O que você procura?' />
        </div>
        <div className='btn-content'>
          <button onClick={openModal} className='btn-cesta' />
          <div className={cond ? 'item-add' : 'none'} onChange={() => mudaSacola()}>{ quantidadeTotal + receitaCesta }</div>
          <span className='btn-text'>Minha Cesta</span>
          <ModalCesta />
        </div>
        <Header2 />
      </div>
      <CriandoCard className="backgroundCard"/>
    </div>
  )
}
export default Header