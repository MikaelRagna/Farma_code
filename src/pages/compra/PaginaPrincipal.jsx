import React, {useContext} from "react"
import Header from "./header/header"
import { useEffect, useState } from "react"
import Footer from "./footer/FooterHeader"
import FooterFinal from "./footer/footerFinal/FooterFinal"
import FooterCominica from "./footer/footerComunica/FooterCominica"
import {ModalProvider} from "./header/modalCesta/useModalContext/ModalContext"


function PaginaPrincipal() {
  const [latitude, setLatitude ] = useState('');
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);
    return (
      <div>
      <ModalProvider>
      <Header/>
      </ModalProvider>
      <Footer/>
      <FooterCominica/>
      <FooterFinal/>
      </div>
    )    
  }

  export default PaginaPrincipal