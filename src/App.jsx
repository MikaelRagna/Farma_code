import React, {useContext} from "react"
import PaginaPrincipal from "./pages/compra/PaginaPrincipal";
import PaginaReceita from "./pages/Receita/PaginaReceita";
import "./Components/settings/Reset.css"
import { Outlet } from "react-router-dom";



function App() {
  return (
    <div>
      <Outlet/>
    </div>
  )    
}

export default App;
