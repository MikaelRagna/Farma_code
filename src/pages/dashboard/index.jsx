import React, { useState, useEffect } from "react";
import Receita from "./components/receitas";
import "./dashboard.css";
import Logout from "../../assets/logout.png";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/header";
import api from "../../../.api.config.json"

export default function Dashboard() {

  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();
  const [entrada, setEntrada] = useState("");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const response_session = sessionStorage.getItem("token")  ;
    const status_session = response_session ? JSON.parse(response_session) : [];
    const response_local = localStorage.getItem("token");
    const status_local = response_local ? JSON.parse(response_local) : [];
    let emailDoc = ''
    let id = 0 

    if (status_local.token == true) {
      emailDoc = status_local.emailDoc
      id = status_local.idDoc

    } else if(status_session.token == true) {
      emailDoc = status_session.emailDoc
      id = status_session.idDoc

    }else{

      return navigate("/login");
    }

    document.title = "Médico - Dashboard";
    fetch(
      `${api.link}/receita/all/${id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReceitas(data.receitas);
      });

  }, []);

  const logout = () => {
    const newToken ={
      token: false
    }
    localStorage.setItem("token", JSON.stringify(newToken));
    sessionStorage.setItem("token", JSON.stringify(newToken));
    return navigate("/login");
  };

  const busca = (buscando) => {
    let buscas = entrada.toLocaleLowerCase();

    let filtrado = buscando.filter((paciente) =>
      paciente.nome_paciente.toLocaleLowerCase().includes(buscas)
    );

    return filtrado;
  };

  return (
    <div>
      <Header/>
      <div className="main_dash">
        <div className="menu">
          <a className="menu_link" onClick={() => {navigate('/dashboard')}}>Dashboard</a>
          <a className="menu_link" onClick={() => {navigate('/receitas')}}>Cadastrar receita</a>

          <img src={Logout} className="icon_logout" onClick={logout} />
        </div>

        <div className="title_dash">
          <div className="pipe"></div>
          <div className="titles">
            <h1>Receitas</h1>
            <h3>Confira todas as receitas cadastradas por você</h3>
          </div>

          <input
            type="text"
            placeholder="Pesquisar..."
            value={entrada}
            onChange={(e) => {
              setEntrada(e.target.value);
              setSearch(busca(receitas));
            }}
          />
        </div>

        {entrada === "" ? (
          <div className="container-receitas">
            {receitas.map((item, i) => (
              <Receita
                count={i + 1}
                link={item.hash}
                key={item._id}
                vencimento={item.validade}
                nomePaciente={item.nome_paciente}
                remedios={item.lista_de_medicamentos}
              />
            ))}
          </div>
        ) : (
          <div className="container-receitas">
            {search.map((item, i) => (
              <Receita
                count={i + 1}
                key={item._id}
                link={item.hash}
                vencimento={item.validade}
                nomePaciente={item.nome_paciente}
                remedios={item.lista_de_medicamentos}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
