import api from "../../../../.api.config.json";
import { createContext, useState } from "react";
import GeraPdf from "../../link/components/GeraPdf/GeraPdf";
import {useNavigate} from 'react-router-dom'

export const AddRemedioContext = createContext();

export function AddRemedioContextProvider({ children }) {
  const [dados, setDados] = useState([]);
  const [rem, setRem] = useState([]);
  const [btnRemedio, setBtnRemedio] = useState(false);
  const [encontrado, setEncontrado] = useState([]);
  const [indicacoes, setIndicacoes] = useState("");
  const [result, setResult] = useState(false);
  const [remPost, setRemPost] = useState([]);
  const [nomePaciente, setNomePaciente] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [emailDoc, setEmailDoc] = useState("");
  const [precoTotal, setPrecoTotal] = useState("");
  const navigate = useNavigate()

  function AddRemedio(remedio) {
    setRem([...rem, remedio[0]]);
  }

  function RemedioIndicado(remedio) {
    setRemPost([remedio]);
  }

  function DeleteRemedio(remadd) {
    setRem(rem.filter((rem) => rem.idKey !== remadd.idKey));
  }

  function Indicacao(remadd, idKey) {
    remadd[0].indicacao = indicacoes;
    remadd[0].idKey = idKey;
    remadd[0].precoTotal = precoTotal
    setRemPost([]);
  }

  function ConcluirReceita(listados) {
    let medic = [];
    listados.map((e) => {
      medic.push({
        remedio: { nome: e.nome },
        prescricao: e.indicacao,
        quantidade: e.quantidade,
        precoTotal: e.precoTotal,
        id: e._id
      });
    });
    fetch(`${api.link}/receita/cadastro/`, {
      method: "POST",
      body: JSON.stringify({
        nome_paciente: nomePaciente,
        lista_de_medicamentos: medic,
        validade: dataValidade,
        email: emailDoc,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        GeraPdf(data);
      })
      // .catch((err) => console.error(err));
      // navigate('/dashboard')
    }

  return (
    <AddRemedioContext.Provider
      value={{
        rem,
        setRem,
        AddRemedio,
        DeleteRemedio,
        result,
        setResult,
        btnRemedio,
        setBtnRemedio,
        encontrado,
        setEncontrado,
        RemedioIndicado,
        remPost,
        setRemPost,
        Indicacao,
        setIndicacoes,
        indicacoes,
        dados,
        setDados,
        nomePaciente,
        setNomePaciente,
        ConcluirReceita,
        dataValidade,
        setDataValidade,
        emailDoc,
        setEmailDoc,
        precoTotal,
        setPrecoTotal
      }}
    >
      {children}
    </AddRemedioContext.Provider>
  );
}
