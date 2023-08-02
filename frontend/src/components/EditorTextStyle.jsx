import positionGauche from "../assets/images/positionGauche.png"
import positionCentre from "../assets/images/positionCentre.png"
import positionDroite from "../assets/images/positionDroite.png"
import positionJustify from "../assets/images/positionJustify.png"
import ombre from "../assets/images/ombre.png"
import ombreOff from "../assets/images/ombreOff.png"
import bordureRadius from "../assets/images/bordureRadius.png"
import bordureOn from "../assets/images/bordureOn.png"
import bordureOff from "../assets/images/bordureOff.png"
import miseEnGras from "../assets/images/miseEnGras.png"
import miseEnItalic from "../assets/images/miseEnItalic.png"
import soulignage from "../assets/images/soulignage.png"
import marges from "../assets/images/marges.png"
import { SketchPicker } from "react-color"
import { React, useState } from "react"

export default function EditorTextStyle() {
  const [coordX, setCoordX] = useState(0)
  const [coordY, setCoordY] = useState(0)
  const [coordZ, setCoordZ] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [itemHeight, setItemHeight] = useState(0)
  const [font, setFont] = useState("Serif")
  const [pickerTextColor, setPickerTextColor] = useState("#000000")
  const [textColor, setTextColor] = useState("#000000")
  const [textColorVisible, setTextColorVisible] = useState(false)
  const [borderThickness, setBorderThickness] = useState(1)
  const [pickerBorderColor, setPickerBorderColor] = useState("#000000")
  const [borderColor, setBorderColor] = useState("#000000")
  const [borderColorVisible, setBorderColorVisible] = useState(false)
  const [divBorderRadius, setDivBorderRadius] = useState(0)
  const [divPadding, setDivPadding] = useState(0)
  const [ombreX, setOmbreX] = useState(0)
  const [ombreY, setOmbreY] = useState(0)
  const [ombreAlpha, setOmbreAlpha] = useState(0)
  const [ombreBeta, setOmbreBeta] = useState(0)
  const [pickerShadowColor, setPickerShadowColor] = useState("#000000")
  const [shadowColor, setShadowColor] = useState("#000000")
  const [shadowColorVisible, setShadowColorVisible] = useState(false)
  const [blur, setBlur] = useState(0)
  const [pickerBackColor, setPickerBackColor] = useState("#000000")
  const [backColor, setBackColor] = useState("#000000")
  const [backColorVisible, setBackColorVisible] = useState(false)

  const handleChangeCoordX = (e) => {
    setCoordX(e.target.value)
  }

  const handleChangeCoordY = (e) => {
    setCoordY(e.target.value)
  }

  const handleChangeCoordZ = (e) => {
    setCoordZ(e.target.value)
  }

  const handleChangeItemWidth = (e) => {
    setItemWidth(e.target.value)
  }

  const handleChangeItemHeight = (e) => {
    setItemHeight(e.target.value)
  }

  const handleChangeFont = (e) => {
    setFont(e.target.value)
  }

  const handleClickDivTextColor = () => {
    setTextColorVisible(true)
  }

  const handleChangeColorText = (color) => {
    setPickerTextColor(color.rgb)
    setTextColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )
  }

  const handleLeaveTextColor = () => {
    setTextColorVisible(false)
  }

  const handleChangeBorderThickness = (e) => {
    setBorderThickness(e.target.value)
  }

  const handleClickDivBorderColor = () => {
    setBorderColorVisible(true)
  }

  const handleChangeColorBorder = (color) => {
    setPickerBorderColor(color.rgb)
    setBorderColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )
  }

  const handleLeaveBorderColor = () => {
    setBorderColorVisible(false)
  }

  const handleChangeDivBorderRadius = (e) => {
    setDivBorderRadius(e.target.value)
  }

  const handleChangeDivPadding = (e) => {
    setDivPadding(e.target.value)
  }

  const handleChangeOmbreX = (e) => {
    setOmbreX(e.target.value)
  }

  const handleChangeOmbreY = (e) => {
    setOmbreY(e.target.value)
  }

  const handleChangeOmbreAlpha = (e) => {
    setOmbreAlpha(e.target.value)
  }

  const handleChangeOmbreBeta = (e) => {
    setOmbreBeta(e.target.value)
  }

  const handleClickDivShadowColor = () => {
    setShadowColorVisible(true)
  }

  const handleChangeColorShadow = (color) => {
    setPickerShadowColor(color.rgb)
    setShadowColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )
  }

  const handleLeaveShadowColor = () => {
    setShadowColorVisible(false)
  }

  const handleChangeBlur = (e) => {
    setBlur(e.target.value)
  }

  const handleClickDivBackColor = () => {
    setBackColorVisible(true)
  }

  const handleChangeColorBack = (color) => {
    setPickerBackColor(color.rgb)
    setBackColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )
  }

  const handleLeaveBackColor = () => {
    setBackColorVisible(false)
  }

  return (
    <main className="main-editorTextStyle">
      <p>Position du composant</p>
      <div className="positions-composant">
        <img
          src={positionGauche}
          alt="position gauche"
          title="Positionner l'élément à gauche"
        />
        <img
          src={positionCentre}
          alt="position centre"
          title="Centrer l'élément dans la page"
        />
        <img
          src={positionDroite}
          alt="position droite"
          title="Positionner l'élément à droite"
        />
      </div>

      <section className="positions-detaillees">
        <div className="positions-xy">
          <div className="positionX">
            <p>X :</p>
            <input
              type="number"
              min={0}
              max={100}
              value={coordX}
              onChange={handleChangeCoordX}
            />
          </div>
          <div className="positionY">
            <p>Y :</p>
            <input
              type="number"
              min={0}
              max={100}
              value={coordY}
              onChange={handleChangeCoordY}
            />
          </div>
          <div className="positionZ">
            <p>Z :</p>
            <input
              type="number"
              min={0}
              max={10}
              value={coordZ}
              onChange={handleChangeCoordZ}
            />
          </div>
        </div>
        <div className="dimensions-wh">
          <div className="dimensionW">
            <p>W :</p>
            <input
              type="number"
              min={0}
              max={100}
              value={itemWidth}
              onChange={handleChangeItemWidth}
            />
          </div>
          <div className="dimensionH">
            <p>H :</p>
            <input
              type="number"
              min={0}
              max={100}
              value={itemHeight}
              onChange={handleChangeItemHeight}
            />
          </div>
        </div>
      </section>

      <p>Texte</p>
      <div className="positions-composant">
        <img
          src={positionGauche}
          alt="alignement gauche"
          title="Aligner le texte à gauche"
        />
        <img
          src={positionCentre}
          alt="alignement centre"
          title="Centrer le texte"
        />
        <img
          src={positionDroite}
          alt="alignement droite"
          title="Aligner le texte à droite"
        />
        <img
          src={positionJustify}
          alt="alignement justifié"
          title="Justifier le texte"
        />
      </div>

      <section className="style-texte">
        <img src={miseEnGras} alt="Mettre en gras" title="Mettre en gras" />
        <img
          src={miseEnItalic}
          alt="Mettre en italique"
          title="Mettre en italique"
        />
        <img src={soulignage} alt="Souligner" title="Souligner" />
      </section>

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

        <div className="text-color" onClick={handleClickDivTextColor}>
          <div className="choix-color">
            <p>A</p>
            <div style={{ backgroundColor: textColor }}></div>
          </div>
          <div className="choice-arrow"></div>
          {textColorVisible && (
            <div
              className="textColorPicker-container"
              onMouseLeave={handleLeaveTextColor}
            >
              <SketchPicker
                color={pickerTextColor}
                onChangeComplete={handleChangeColorText}
                width="300px"
              />
            </div>
          )}
        </div>
      </section>

      <p>Bordures</p>
      <section className="section-bordures">
        <div className="section-bordures-ligne1">
          <img
            src={bordureOn}
            alt="bordure on"
            title="Ajouter une bordure à l'élément"
          />
          <img
            src={bordureOff}
            alt="bordure off"
            title="Supprimer la bordure"
          />
          <label htmlFor="borderThickness">ep :</label>
          <input
            type="number"
            id="borderThickness"
            min={1}
            max={15}
            value={borderThickness}
            onChange={handleChangeBorderThickness}
          />
          <div className="text-color" onClick={handleClickDivBorderColor}>
            <div className="choix-color">
              <img className="imgChoixColor" src={bordureOn} alt="bordure on" />
              <div style={{ backgroundColor: borderColor }}></div>
            </div>
            <div className="choice-arrow"></div>
            {borderColorVisible && (
              <div
                className="textColorPicker-container"
                onMouseLeave={handleLeaveBorderColor}
              >
                <SketchPicker
                  color={pickerBorderColor}
                  onChangeComplete={handleChangeColorBorder}
                  width="300px"
                />
              </div>
            )}
          </div>
        </div>
        <div className="section-bordures-ligne2">
          <div className="div-bordures-ligne2">
            <img
              src={bordureRadius}
              alt="bordure radius"
              title="Entrez à côté un rayon pour les bordures"
            />
            <input
              type="number"
              min={0}
              max={500}
              value={divBorderRadius}
              onChange={handleChangeDivBorderRadius}
            />
          </div>
          <div className="div-bordures-ligne2">
            <img
              src={marges}
              alt="marges intérieures"
              title="Entrez à côté une valeur pour les marges intérieures"
            />
            <input
              type="number"
              min={0}
              max={200}
              value={divPadding}
              onChange={handleChangeDivPadding}
            />
          </div>
        </div>
      </section>

      <p>Ombre</p>
      <section className="section-ombre">
        <div className="choix-ombre">
          <div className="images-ombre">
            <img
              src={ombre}
              alt="presence ombre"
              title="Ajouter une ombre à l'élément"
            />
            <img src={ombreOff} alt="pas d'ombre" title="Supprimer l'ombre" />
          </div>

          <div className="text-color" onClick={handleClickDivShadowColor}>
            <div className="choix-color">
              <img className="imgChoixColor" src={ombre} alt="couleur ombre" />
              <div style={{ backgroundColor: shadowColor }}></div>
            </div>
            <div className="choice-arrow"></div>
            {shadowColorVisible && (
              <div
                className="textColorPicker-container"
                onMouseLeave={handleLeaveShadowColor}
              >
                <SketchPicker
                  color={pickerShadowColor}
                  onChangeComplete={handleChangeColorShadow}
                  width="300px"
                />
              </div>
            )}
          </div>
        </div>

        <div className="shadow-values">
          <label htmlFor="ombreX">x :</label>
          <input
            type="number"
            id="ombreX"
            min={0}
            max={50}
            value={ombreX}
            onChange={handleChangeOmbreX}
          />
          <label htmlFor="ombreY">y :</label>
          <input
            type="number"
            id="ombreY"
            min={0}
            max={50}
            value={ombreY}
            onChange={handleChangeOmbreY}
          />
          <label htmlFor="ombreAlpha">&#945; :</label>
          <input
            type="number"
            id="ombreAlpha"
            min={0}
            max={50}
            value={ombreAlpha}
            onChange={handleChangeOmbreAlpha}
          />
          <label htmlFor="ombreBeta">&#946; :</label>
          <input
            type="number"
            id="ombreBeta"
            min={0}
            max={50}
            value={ombreBeta}
            onChange={handleChangeOmbreBeta}
          />
        </div>
      </section>

      <p>Arrière plan</p>
      <section className="section-background">
        <div className="div-blur">
          <label htmlFor="blur">Flou :</label>
          <input
            type="number"
            id="blur"
            min={0}
            max={50}
            value={blur}
            onChange={handleChangeBlur}
          />
        </div>

        <div className="text-color" onClick={handleClickDivBackColor}>
          <div
            className="choix-color"
            style={{ backgroundColor: backColor }}
          ></div>

          <div className="choice-arrow"></div>

          {backColorVisible && (
            <div
              className="textColorPicker-container"
              onMouseLeave={handleLeaveBackColor}
            >
              <SketchPicker
                color={pickerBackColor}
                onChangeComplete={handleChangeColorBack}
                width="300px"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
