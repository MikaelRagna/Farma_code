import React, { createContext, useState, } from 'react';

// context
export const ModalContext = createContext({});

// Provider
export function ModalProvider ({ children }) {
  const [modal, setModal] = useState(true); //
  const [quantidadeTotal, setQuantidadeTotal] = useState(0)
  const [sacola, setSacola] = useState([])
  const [receitaCesta, setReceitaCesta] = useState(0)
  const openModal = ()=>{
    setModal(!modal)
  }

  const closeModal = ()=>{
    setModal(true)
  }
  
  return (
    <ModalContext.Provider value={{ modal, setModal, openModal, closeModal, quantidadeTotal, setQuantidadeTotal, sacola, setSacola, receitaCesta, setReceitaCesta }}>
      {children}
    </ModalContext.Provider>
  );
};
