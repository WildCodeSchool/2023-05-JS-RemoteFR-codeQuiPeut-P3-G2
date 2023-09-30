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
          <img src={ScripLogo} alt="logo scripter"></img>
        </div>
        <div className="logoSoc">
          <img src={facebook} alt="logo facebook" className="cursorHover"></img>
          <img src={tikTok} alt="logo tiktok" className="cursorHover"></img>
          <img src={twitter} alt="logo twitter" className="cursorHover"></img>
          <img
            src={instagram}
            alt="logo instagram"
            className="cursorHover"
          ></img>
        </div>
      </div>
    </main>
  )
}

export default Footer
