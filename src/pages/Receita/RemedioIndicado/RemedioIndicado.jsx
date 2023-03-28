import { useContext } from "react";
import { AddRemedioContext } from "../ReceitaContext/AddRemedioContext";
import "./RemedioIndicado.css";

function RemedioIndicado(r) {
  const { DeleteRemedio } = useContext(AddRemedioContext);

  return (
    <div className="remedios-indicado-main">
      {r.r.map((obj, i) => {
        return (
          <div className="remedios-box" key={obj.nome + i}>
            <div className="remedios-indicados">
              <div className="remedios-indicados-info">
                <div className="info-1">{obj.nome}</div>
                <div className="info-2">{obj.indicacao}</div>
                <div>{obj.quantidade} unid.</div>
              </div>
            </div>
            <button
              onClick={() => {
                DeleteRemedio(obj);
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default RemedioIndicado;
