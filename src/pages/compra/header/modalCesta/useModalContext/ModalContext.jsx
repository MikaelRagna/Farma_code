import React, { createContext, useState, } from 'react';

// context
export const ModalContext = createContext({});

// Provider
export function ModalProvider ({ children }) {
  const [modal, setModal] = useState(true); //
  const [quantidadeTotal, setQuantidadeTotal] = useState(0)
  const [sacola, setSacola] = useState([])
  
  const [cestaTotal, setCestaTotal] = useState(0)

  const openModal = ()=>{
    setModal(!modal)
  }

  const closeModal = ()=>{
    setModal(true)
  }
  
  return (
    <ModalContext.Provider value={{ modal, setModal, openModal, closeModal, quantidadeTotal, setQuantidadeTotal, sacola, setSacola, cestaTotal, setCestaTotal }}>
      {children}
    </ModalContext.Provider>
  );
};
