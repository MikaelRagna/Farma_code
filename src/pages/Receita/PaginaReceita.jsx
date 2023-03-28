import React from "react";
import Header from "../../Components/header";
import './style.css'
import Receita from "./Receita/Receita";
import { AddRemedioContextProvider } from "./ReceitaContext/AddRemedioContext";

function PaginaReceita() {
  return (
    <div>
      <Header />
      <AddRemedioContextProvider>
        <Receita />
      </AddRemedioContextProvider>
    </div>
  );
}

export default PaginaReceita;
