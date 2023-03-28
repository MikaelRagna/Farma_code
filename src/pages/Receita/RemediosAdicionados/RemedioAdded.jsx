import { useContext } from "react";
import { AddRemedioContext } from "../ReceitaContext/AddRemedioContext";
import "./RemedioAdded.css";

export function RemedioAdded({ r }) {
  const { setRemPost, setPrecoTotal } = useContext(AddRemedioContext);

  function handleQuantidade(e, obj) {
    if (e.target.classList.contains("inc")) {
      setRemPost(
        obj.map((element) => {
          let copy = element;
          copy.quantidade += 1;
          return copy;
        })
      );
    } else{
      if(obj[0].quantidade > 1){
        setRemPost(
          obj.map((element) => {
            let copy = element;
            copy.quantidade -= 1;
            return copy;
          })
        );
      }
    }
  }

  return (
    <div className="box-remedio">
      {r.map((obj, i) => {
        let operacaoPreco = parseFloat(obj.preco.replace(',', '.')) * obj.quantidade;
        let conversaoPreco = operacaoPreco.toFixed(2)
        let precoTotal = conversaoPreco.replace('.', ',')
        setPrecoTotal(precoTotal)
        return (
          <div className="remedio-adicionado" key={obj.nome + i}>
            <img src={obj.urlImage} alt="" />
            <div className="remedio-adicionado-info">
              <div>{obj.nome}</div>
            </div>
            <p className="remedio-adicionado-preco">R${precoTotal}</p>
            <div className="controle-quantidade">
              <button
                className="btn-inc inc"
                onClick={(e) => {
                  handleQuantidade(e, r);
                }}
              >
                +
              </button>
              <p className="contador-quantidade">{obj.quantidade}</p>
              <button
                className="btn-dec dec"
                onClick={(e) => {
                  handleQuantidade(e, r);
                }}
              >
                -
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
