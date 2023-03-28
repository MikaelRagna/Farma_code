import React, { useContext, useState, useEffect } from "react";
import { ModalRemedioAdd } from "../ModalAdiçãoRemedios/ModalRemedioAdd";
import { useNavigate } from "react-router-dom";
import { AddRemedioContext } from "../ReceitaContext/AddRemedioContext";

import RemedioIndicado from "../RemedioIndicado/RemedioIndicado";
import Logout from "../../../assets/logout.png";
import "./Receita.css";

function Receita() {
  useEffect(() => {
    const response_session = sessionStorage.getItem("token");
    const status_session = response_session ? JSON.parse(response_session) : [];
    const response_local = localStorage.getItem("token");
    const status_local = response_local ? JSON.parse(response_local) : [];
    let id = 0;
    let email = ''

    if (status_local.token == true) {
      id = status_local.idDoc;
      email = status_local.emailDoc;
      setEmailDoc(email)
    } else if (status_session.token == true) {
      id = status_session.idDoc;
      email = status_session.emailDoc;
      setEmailDoc(email)

    } else {
      return navigate("/login");
    }
  },[]);

  document.title = "Médico - Cadastro Receita";
  const navigate = useNavigate();
  const {
    rem,
    nomePaciente,
    setNomePaciente,
    ConcluirReceita,
    btnRemedio,
    setBtnRemedio,
    dataValidade,
    setDataValidade,
    setEmailDoc
  } = useContext(AddRemedioContext);

  const logout = () => {
    localStorage.setItem("token", false);
    sessionStorage.setItem("token", false);
    return navigate("/login");
  };
  function formataBr(d){
    let formatado = d.split('-').reverse().join('/');
    return formatado
  }
  return (
    <div className="container">
      <div className="menu">
        <a
          className="menu_link"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </a>
        <a
          className="menu_link"
          onClick={() => {
            navigate("/receitas");
          }}
        >
          Cadastrar receita
        </a>

        <img src={Logout} className="icon_logout" onClick={logout} />
      </div>

      <div className="container-receita">
        <div className="container-receita-header">
          <img src="https://cdn.discordapp.com/attachments/1083095695445213244/1083096087289675896/farmabg.jpeg" alt="Logo " />
          <div className="container-receita-title">
            <h1>Receita Farma Code</h1>
            <h3>Crie receitas de um modo fácil e prático</h3>
          </div>
        </div>
        <h2>Dados do Paciente</h2>
        <div className="container-label">
          <label className="label-nome">
            Nome
            <input
              defaultValue={nomePaciente || ""}
              onInput={(e) => {
                setNomePaciente(e.target.value);
              }}
              type="text"
              placeholder="Digite o nome do paciente"
            />
          </label>

          <label className="label-idade">
            idade
            <input type="text" name="paciente" placeholder="Digite a idade" maxLength={3} />
          </label>
          <label className="label-dataValidade">
            Data de Validade
            <input 
            defaultValue={dataValidade || ""}
            onInput={(e) => {
              
              setDataValidade(formataBr(e.target.value));
            }}
            type="date" 
            name="data"
            placeholder="00/00/0000"
             />
          </label>
        </div>
        <div className="prescricoes">
          <h2>Prescrições</h2>
          <button onClick={() => setBtnRemedio(true)}>
            Adicionar Prescrição
          </button>
        </div>
        {btnRemedio ? <ModalRemedioAdd /> : <></>}
        {rem.length !== 0 ? <RemedioIndicado r={rem} /> : null}

        <button
          onClick={() => {ConcluirReceita(rem)
          }}
          disabled={rem.length === 0}
          className="concluir-receita"
        >
          Concluir receita
        </button>
      </div>
    </div>
  );
}

export default Receita;
