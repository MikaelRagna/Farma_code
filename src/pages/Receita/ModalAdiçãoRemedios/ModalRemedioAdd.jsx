import React, { useContext, useState, useEffect } from "react";
import "./ModalRemedioAdd.css";
import ListaResultado from "../ListaResultado/ListaResultado";
import { AddRemedioContext } from "../ReceitaContext/AddRemedioContext";
import { RemedioAdded } from "../RemediosAdicionados/RemedioAdded";
import api from "../../../../.api.config.json"

export function ModalRemedioAdd() {
  const {
    AddRemedio,
    rem,
    result,
    setResult,
    setBtnRemedio,
    remPost,
    setRemPost,
    encontrado,
    setEncontrado,
    indicacoes,
    setIndicacoes,
    Indicacao,
    dados,
    setDados,
  } = useContext(AddRemedioContext);
  const [rput, setRput] = useState("");

  useEffect(() => {
    fetch(
      `${api.link}/produto/todos`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDados(data.produto);
      })
      .catch((err) => console.log(err));
  }, []);

  function Busca(buscando) {
    let buscas = buscando.toLocaleLowerCase();

    let buscado = dados.filter((remedio) =>
      remedio.nome.toLocaleLowerCase().includes(buscas)
    );
    return buscado;
  }
  function ModalResultado() {
    if (rput === "") {
      setResult(false);
    }
    if (result) {
      return (
        <div className="sugestao">
          <ListaResultado lista={encontrado} />
        </div>
      );
    }
  }

  return (
    <div className="back-modal">
      <div className="modal-box">
        <button
          className="modal-box-fechar"
          onClick={() => {
            setBtnRemedio(false);
            setIndicacoes("");
            setRemPost([]);
          }}
        >
          X
        </button>
        <div className="modal-box-title">
          <h2 className="box-title">Adicionar medicamento</h2>
          <span>Adicionar medicamento e prescrição de uso</span>
        </div>
        <div className="modal-box-label">
          <div>
            <label>
              Medicamento
              <input
                className="modal-box-medicamento"
                type="text"
                placeholder="Digite o nome do medicamento"
                defaultValue={rput}
                onInput={(e) => {
                  setRput(e.target.value);
                  setEncontrado(Busca(rput));
                  setResult(true);
                }}
              />
            </label>
            {result && ModalResultado()}

            <RemedioAdded r={remPost} />
          </div>

          <div className="container-inidicacao-btn">
            <label className="modal-back-indicacao">
              Adicionar prescrição
              <textarea
                maxLength={60}
                type="text"
                defaultValue={indicacoes}
                onInput={(e) => {
                  setIndicacoes(e.target.value);
                }}
              />
            </label>
            <button
              onClick={() => {
                setBtnRemedio(false);
                Indicacao(remPost, rem.length);
                AddRemedio(remPost);
                setIndicacoes("");
              }}
              disabled={remPost.length === 0}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
