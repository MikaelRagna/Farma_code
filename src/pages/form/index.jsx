import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";
import "./form.css";
import Header from "../../Components/header";
import { useEffect } from "react";
import api from "../../../.api.config.json"

export default function Form() {

  const [name, setName] = useState("");

  const [token, setToken] = useState("");

  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");

  const [rePass, setRePass] = useState("");

  const navigate = useNavigate();

  const showRegister = () => {
    let form_log = document.querySelector(".login_container");
    let form_reg = document.querySelector(".register_container");
    let main = document.querySelector(".main");
    let form_container = document.querySelector(".form_container");

    form_reg.style.display = "block";
    form_log.style.display = "none";
    main.style.height = "auto";
    form_container.style.height = "auto";
    document.title = "Registro - Médico";
  };

  const showLogin = () => {
    let form_log = document.querySelector(".login_container");
    let form_reg = document.querySelector(".register_container");
    let main = document.querySelector(".main");
    let form_container = document.querySelector(".form_container");

    form_reg.style.display = "none";
    form_log.style.display = "block";
    main.style.height = "90vh";
    form_container.style.height = "auto";
    document.title = "Login - Médico";
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const checkbox = document.querySelector("#rememberMe").checked;

    if (email == "" || pass == "") {
      document.querySelector(".msg_required").style.display = "flex";

      setTimeout(() => {
        document.querySelector(".msg_required").style.display = "none";
      }, 5000);

      return;
    }

    const newData = {
      input_email: email,
      pass: pass,
    };

    fetch(`${api.link}/medico/login`, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          const infos = 
          {
            token: true,
            idDoc: data.id,
            emailDoc: data.email
          }

        if (checkbox) {
            localStorage.setItem("token", JSON.stringify(infos));
            navigate("/dashboard");
        } else {
            sessionStorage.setItem("token", JSON.stringify(infos));
            navigate("/dashboard");
        }
        } else {
          if (data.erro) {
            document.querySelector(".msg_erro").style.display = "flex";

            setTimeout(() => {
              document.querySelector(".msg_erro").style.display = "none";
            }, 5000);
          }
        }
      });

    setEmail("");
    setPass("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (email == "" || pass == "" || name == "") {
      document.querySelector(".msg_required_reg").style.display = "flex";

      setTimeout(() => {
        document.querySelector(".msg_required_reg").style.display = "none";
      }, 5000);

      return;
    }

    if (pass !== rePass) {
      document.querySelector(".msg_repass").style.display = "flex";

      setTimeout(() => {
        document.querySelector(".msg_repass").style.display = "none";
      }, 5000);

      return;
    }

    const newDoc = {
      nome: name,
      email: email,
      senha: pass,
      token: token,
    };

    fetch(
      `${api.link}/medico/cadastro`,
      {
        method: "POST",
        body: JSON.stringify(newDoc),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          document.querySelector(".msg_erro_reg").style.display = "flex";

          console.log(data.erro);

          setTimeout(() => {
            document.querySelector(".msg_erro_reg").style.display = "none";
          }, 5000);

          return
        }else{
          document.querySelector(".msg_ok").style.display = "flex";

          setTimeout(() => {
          document.querySelector(".msg_ok").style.display = "none";
            
          }, 5000);
        }
      })
      .catch((err) => console.log(err));

    setName("");
    setEmail("");
    setPass("");
    setRePass("");
    setToken("");
  };

  return (
    <>
    <Header />
      <div className="main">
        <div className="form_container">
          <button onClick={showLogin} className="btn_login btn_change">
            Fazer login
          </button>
          <button onClick={showRegister} className="btn_register btn_change">
            Registrar
          </button>
          <form>
            <div className="login_container">
              <h2 className="form_title">Fazer Login:</h2>

              <Input
                placeholder="Digite seu e-mail..."
                tipo="text"
                value={email}
                setValue={setEmail}
                texto="E-mail:"
              />

              <Input
                value={pass}
                placeholder="Digite sua senha..."
                tipo="password"
                setValue={setPass}
                texto="Senha:"
              />

              <div className="msg_erro">E-mail ou senha incorretos!</div>
              <div className="msg_required">
                Os campos precisam ser preenchidos!
              </div>

              <div className="checkbox_container">
                <input
                  className="input-checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                />

                <label htmlFor="rememberMe">Lembre-se de Mim</label>
              </div>

              <Button texto="Continuar" onClick={handleLogin} />
            </div>
          </form>
          <form>
            <div className="register_container">
              <h2 className="form_title">Fazer Registro:</h2>

              <Input
                tipo="text"
                value={name}
                placeholder="Digite seu nome"
                texto="Nome:"
                setValue={setName}
              />

              <Input
                placeholder="Digite sua e-mail..."
                tipo="text"
                value={email}
                setValue={setEmail}
                texto="E-mail:"
              />

              <Input
                placeholder="Digite sua senha..."
                tipo="password"
                value={pass}
                setValue={setPass}
                texto="Senha:"
              />

              <Input
                placeholder="Repita sua senha..."
                tipo="password"
                value={rePass}
                setValue={setRePass}
                texto="Digite a senha novamente:"
              />

              <Input
                placeholder="Digite seu token..."
                tipo="text"
                value={token}
                setValue={setToken}
                texto="Digite seu token:"
              />

              <div className="msg_required_reg">
                Os campos precisam ser preenchidos!
              </div>
              <div className="msg_erro_reg">
                Email já cadastrado, tente novamente!
              </div>
              <div className="msg_repass">As senhas precisam ser iguais!</div>
              <div className="msg_ok">Cadastrado com sucesso, faça seu login!</div>

              <Button texto="Continuar" onClick={handleRegister} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
