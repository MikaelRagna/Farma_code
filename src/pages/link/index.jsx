import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "./components/container_med";
import Loc from "./components/container_loc";
import "./link.css";
import api from "../../../.api.config.json";
import GeraPdf from "./components/GeraPdf/GeraPdf";

export default function Link() {
  const [receita, setReceita] = useState();
  const [stores, setStores] = useState();
  const [idMed, setIdMed] = useState([]);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const { hash } = useParams();

  const navigate = useNavigate()

  

  useEffect(() => {
    fetch(`${api.link}/receita/get/${hash}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIdMed(data.receita.lista_de_medicamentos);
        setReceita(data.receita);
        console.log(data);

        let ids = [];
        data.receita.lista_de_medicamentos.map((e) => {
          ids.push(e.id);
        });

        setIdMed(ids);
      });

      const location = {
        localizacao_cliente: {
          latitude: lat,
          longitude: long,
        },
        lista_remedios: idMed,
      };

      navigator.geolocation.watchPosition(position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude)
      })

    fetch(`${api.link}/calcular/distancia`, {
      method: "POST",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        // console.log(data);
      });
  }, [lat, long]);

  const redirect = () => {
    navigate(`/${hash}`)
  }

  return (
    <div className="link_container">
      <div className="container_receita">
        <div className="link_header">
          <h1 className="link_title">Receita Farma Code</h1>
          <h3 className="link_subtitle">
            Consulte sua receita virtual de um jeito rápido e prático
          </h3>
        </div>

        <div className="link_body">
          {receita ? (
            <>
              <p className="body_title">Paciente: {receita.nome_paciente}</p>
              <p className="body_subtitle">Validade: {receita.validade}</p>
              <p className="body_subtitle">
                <span className="subtitle_title">Código da receita: </span>
                <span style={{ fontStyle: "italic" }}>{receita.hash}</span>
              </p>

              {receita.lista_de_medicamentos.map((item, i) => (
                <Item nome={item.remedio.nome} desc={item.prescricao} key={i} quantidade={item.quantidade}/>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="container_download">
        <div className="download_title">
          <p className="body_title">Baixe sua receita digital</p>
          <p className="body_subtitle">Faça download de sua receita virtual</p>
        </div>

        <div className="btn_container">
          <button
            className="download_btn"
            onClick={() => {
              GeraPdf(receita);
            }}
          >
            Fazer download
          </button>
        </div>
      </div>

      <div className="container_loc">
        <div className="loc_title">
          <p className="body_title">Lojas mais proximas de você</p>
          <p className="body_subtitle">Confira abaixo:</p>
        </div>

        <div className="loc_body">
          {stores ? (
            <>
              <Loc loc={stores} qtdRem={idMed}/>
            </>
          ) : (
            ""
          )}

          <div className="red_container">
            <div>
              <p className="body_title">Ou peça pela nossa loja virtual!</p>
              <p className="body_subtitle">Clique no link abaixo:</p>
            </div>
              <button className="btn_red" onClick={() => redirect()}>Clique para ir a loja virtual</button>
          </div>

        </div>
      </div>
    </div>
  );
}
