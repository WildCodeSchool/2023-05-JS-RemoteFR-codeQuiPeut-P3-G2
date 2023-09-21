import "./Footer.scss"
import React from "react"
import facebook from "../assets/facebook.svg"
import twitter from "../assets/twitter.svg"
import tikTok from "../assets/tikTok.svg"
import instagram from "../assets/instagram.svg"
import ScripLogo from "../assets/ScripLogo.png"

const Footer = () => {
  return (
    <main>
      <div className="footerFront" alt="footer">
        <p> @WildCodeSchool, inc</p>
        <div className="logoScripter">
          <img src={ScripLogo}></img>
        </div>
        <div className="logoSoc">
          <img src={facebook} alt=""></img>
          <img src={tikTok} alt=""></img>
          <img src={twitter} alt=""></img>
          <img src={instagram} alt=""></img>
        </div>
      </div>
    </main>
  )
}

export default Footer
