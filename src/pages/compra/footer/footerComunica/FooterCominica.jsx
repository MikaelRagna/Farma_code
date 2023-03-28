import React from "react";
import "./FooterCominica.css"

export default function FooterCominica() {
    return (
        <div className="footerCominica">
            <div className="conteiners-informa" >
                <div >
                    <div>
                        <p className="texto-Sac">Fala com a Farma Code<br /> <span className="text-Sac-tel">Conheça nossos Telefones</span>  </p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className="texto-Sac" >Televendas<br />
                        <a className="text-Sac-tel" href="tel:41128282">4112-8282</a> 
                        </p>
                    </div>
                </div>
                <div>
                    <div >
                        <p className="texto-Sac" >Atendimento ao cliente<br/>
                        <a className="text-Sac-tel" href="tel:18112751313">1811 275 1313</a>
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className="texto-Sac" >Horário do SAC das 06:00 às 00:00<br />
                        <span ><a className="text-email" href="mailto:sac@farmacode.com.br">sac@farmacode.com.br</a></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}