import positionGauche from "../assets/images/positionGauche.png"
import positionCentre from "../assets/images/positionCentre.png"
import positionDroite from "../assets/images/positionDroite.png"
import positionJustify from "../assets/images/positionJustify.png"
// import ombre from "../assets/images/ombre.png"
// import bordureRadius from "../assets/images/bordureRadius.png"
// import bordureOn from "../assets/images/bordureOn.png"
// import bordureOff from "../assets/images/bordureOff.png"
import { useState } from "react"

export default function EditorTextStyle() {
  const [font, setFont] = useState("Serif")

  const handleChangeFont = (e) => {
    setFont(e.target.value)
  }

  return (
    <main className="main-editorTextStyle">
      <p>Position du composant</p>
      <div className="positions-composant">
        <img src={positionGauche} alt="position gauche" />
        <img src={positionCentre} alt="position centre" />
        <img src={positionDroite} alt="position droite" />
      </div>

      <section className="positions-detaillees">
        <div className="positions-xy">
          <div className="positionX">
            <p>X :</p>
            <input type="number" min={0} max={100} />
          </div>
          <div className="positionY">
            <p>Y :</p>
            <input type="number" min={0} max={100} />
          </div>
        </div>
        <div className="dimensions-wh">
          <div className="dimensionW">
            <p>W :</p>
            <input type="number" min={0} max={100} />
          </div>
          <div className="dimensionH">
            <p>H :</p>
            <input type="number" min={0} max={100} />
          </div>
        </div>
      </section>

      <p>Texte</p>
      <div className="positions-composant">
        <img src={positionGauche} alt="alignement gauche" />
        <img src={positionCentre} alt="alignement centre" />
        <img src={positionDroite} alt="alignement droite" />
        <img src={positionJustify} alt="alignement justifié" />
      </div>

      <section className="police-couleur-texte">
        <select
          value={font}
          onChange={handleChangeFont}
          style={{ fontFamily: font }}
        >
          <option value="Arial" style={{ fontFamily: "Arial" }}>
            Arial
          </option>
          <option value="Cambria" style={{ fontFamily: "Cambria" }}>
            Cambria
          </option>
          <option value="cursive" style={{ fontFamily: "cursive" }}>
            Cursive
          </option>
          <option value="Courier New" style={{ fontFamily: "Courier New" }}>
            Courier New
          </option>
          <option value="fantasy" style={{ fontFamily: "fantasy" }}>
            Fantasy
          </option>
          <option
            value="Franklin Gothic Medium"
            style={{ fontFamily: "Franklin Gothic Medium" }}
          >
            Franklin Gothic Medium
          </option>
          <option value="Georgia" style={{ fontFamily: "Georgia" }}>
            Georgia
          </option>
          <option value="Gill Sans MT" style={{ fontFamily: "Gill Sans MT" }}>
            Gill Sans MT
          </option>
          <option value="Impact" style={{ fontFamily: "Impact" }}>
            Impact
          </option>
          <option value="Lucida Sans" style={{ fontFamily: "Lucida Sans" }}>
            Lucida Sans
          </option>
          <option value="monospace" style={{ fontFamily: "monospace" }}>
            Monospace
          </option>
          <option value="sans-serif" style={{ fontFamily: "sans-serif" }}>
            Sans-serif
          </option>
          <option value="serif" style={{ fontFamily: "serif" }}>
            Serif
          </option>
          <option value="Segoe UI" style={{ fontFamily: "Segoe UI" }}>
            Segoe UI
          </option>
          <option
            value="Times New Roman"
            style={{ fontFamily: "Times New Roman" }}
          >
            Times New Roman
          </option>
          <option value="Trebuchet MS" style={{ fontFamily: "Trebuchet MS" }}>
            Trebuchet MS
          </option>
          <option value="Verdana" style={{ fontFamily: "Verdana" }}>
            Verdana
          </option>
        </select>

        {/* font-family:"Arial";
        font-family: "Cambria";
        font-family: 'Courier New';
        font-family: cursive;
        font-family: fantasy;
        font-family: 'Franklin Gothic Medium';
        font-family: "Georgia";
        font-family: 'Gill Sans MT';
        font-family: "Impact";
        font-family: 'Lucida Sans';
        font-family: monospace;
        font-family: 'Segoe UI';
        font-family: "Times New Roman";
        font-family: 'Trebuchet MS';
        font-family: "Verdana"; */}
      </section>
    </main>
  )
}
