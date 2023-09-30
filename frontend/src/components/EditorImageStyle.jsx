import positionGauche from "../assets/images/positionGauche.png"
import positionCentre from "../assets/images/positionCentre.png"
import positionDroite from "../assets/images/positionDroite.png"
import ombre from "../assets/images/ombre.png"
import ombreOff from "../assets/images/ombreOff.png"
import bordureRadius from "../assets/images/bordureRadius.png"
import bordureOn from "../assets/images/bordureOn.png"
import bordureOff from "../assets/images/bordureOff.png"
import marges from "../assets/images/marges.png"
import { SketchPicker } from "react-color"
import { React, useState, useEffect } from "react"
import axios from "axios"

export default function EditorTextStyle({
  images,
  setImages,
  pagesOfScenarioSelected,
  setSavedImageStyles,
  user,
}) {
  const [mounted, setMounted] = useState(false)
  const [coordX, setCoordX] = useState(0)
  const [coordY, setCoordY] = useState(0)
  const [coordZ, setCoordZ] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [itemHeight, setItemHeight] = useState(0)
  const [autoHeight, setAutoHeight] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const [borderActived, setBorderActived] = useState(false)
  const [appliedBorderStyle, setappliedBorderStyle] = useState("none")
  const [borderThickness, setBorderThickness] = useState(1)
  const [pickerBorderColor, setPickerBorderColor] = useState("#000000")
  const [borderColor, setBorderColor] = useState("#000000")
  const [borderColorVisible, setBorderColorVisible] = useState(false)
  const [divBorderRadius, setDivBorderRadius] = useState(0)
  const [divPadding, setDivPadding] = useState(0)
  const [shadowActived, setShadowActived] = useState(false)
  const [ombreX, setOmbreX] = useState(0)
  const [ombreY, setOmbreY] = useState(0)
  const [ombreAlpha, setOmbreAlpha] = useState(0)
  const [ombreBeta, setOmbreBeta] = useState(0)
  const [pickerShadowColor, setPickerShadowColor] = useState("#000000")
  const [shadowColor, setShadowColor] = useState("#000000")
  const [shadowColorVisible, setShadowColorVisible] = useState(false)

  // passage de l'état mounted à true une fois que la page est montée
  useEffect(() => {
    setMounted(true)
  }, [])

  // mise à jour des states de style lorsqu'on clique sur un textarea
  useEffect(() => {
    if (mounted && images) {
      const item = images.filter((texte) => texte.selected === true)[0]

      if (item) {
        const itemStyle = item.style

        setCoordX(parseInt(itemStyle.left, 10))
        setCoordY(parseInt(itemStyle.top, 10))
        setCoordZ(itemStyle.zIndex)
        setItemWidth(parseInt(itemStyle.width, 10))

        if (itemStyle.height === "auto") {
          setAutoHeight(true)
        } else {
          setAutoHeight(false)
          setItemHeight(parseInt(itemStyle.height, 10))
        }

        if (itemStyle.borderStyle === "none") {
          setBorderActived(false)
          setappliedBorderStyle("none")
        } else if (itemStyle.borderStyle === "solid") {
          setBorderActived(true)
          setappliedBorderStyle("solid")
        } else if (itemStyle.borderStyle === "dotted") {
          setBorderActived(true)
          setappliedBorderStyle("dotted")
        } else if (itemStyle.borderStyle === "dashed") {
          setBorderActived(true)
          setappliedBorderStyle("dashed")
        } else if (itemStyle.borderStyle === "ridge") {
          setBorderActived(true)
          setappliedBorderStyle("ridge")
        } else if (itemStyle.borderStyle === "outset") {
          setBorderActived(true)
          setappliedBorderStyle("outset")
        } else if (itemStyle.borderStyle === "inset") {
          setBorderActived(true)
          setappliedBorderStyle("inset")
        } else if (itemStyle.borderStyle === "double") {
          setBorderActived(true)
          setappliedBorderStyle("double")
        } else if (itemStyle.borderStyle === "groove") {
          setBorderActived(true)
          setappliedBorderStyle("groove")
        }

        setBorderThickness(parseInt(itemStyle.borderWidth, 10))
        setDivBorderRadius(parseInt(itemStyle.borderRadius, 10))
        setDivPadding(parseInt(itemStyle.padding, 10))

        setBorderColor(itemStyle.borderColor)

        const borderColorR = itemStyle.borderColor
          .slice(5, itemStyle.borderColor.length - 1)
          .split(",")[0]
        const borderColorG = itemStyle.borderColor
          .slice(5, itemStyle.borderColor.length - 1)
          .split(",")[1]
        const borderColorB = itemStyle.borderColor
          .slice(5, itemStyle.borderColor.length - 1)
          .split(",")[2]
        const borderColorA = itemStyle.borderColor
          .slice(5, itemStyle.borderColor.length - 1)
          .split(",")[3]

        setPickerBorderColor({
          r: borderColorR,
          g: borderColorG,
          b: borderColorB,
          a: borderColorA,
        })

        if (itemStyle.boxShadow === "0px 0px 0px 0px rgba(0,0,0,0)") {
          setShadowActived(false)
        } else {
          setShadowActived(true)
        }

        const colorShadow = itemStyle.boxShadow.split(" ")[4]
        const shadowColorR = colorShadow
          .slice(5, colorShadow.length - 1)
          .split(",")[0]
        const shadowColorG = colorShadow
          .slice(5, colorShadow.length - 1)
          .split(",")[1]
        const shadowColorB = colorShadow
          .slice(5, colorShadow.length - 1)
          .split(",")[2]
        const shadowColorA = colorShadow
          .slice(5, colorShadow.length - 1)
          .split(",")[3]
        setShadowColor(
          `rgba(${shadowColorR},${shadowColorG},${shadowColorB},${shadowColorA})`
        )

        setPickerShadowColor({
          r: shadowColorR,
          g: shadowColorG,
          b: shadowColorB,
          a: shadowColorA,
        })

        setOmbreX(parseInt(itemStyle.boxShadow.split(" ")[0], 10))
        setOmbreY(parseInt(itemStyle.boxShadow.split(" ")[1], 10))
        setOmbreAlpha(parseInt(itemStyle.boxShadow.split(" ")[2], 10))
        setOmbreBeta(parseInt(itemStyle.boxShadow.split(" ")[3], 10))

        setOpacity(itemStyle.opacity)
      }
    }
  }, [images, mounted])

  // --------------------------------------------------------------------
  // -----FONCTIONS SECTION - POSITION DU COMPOSANT---------------------
  // ------------------------------------------------------------------
  const handleClickTextareaOnLeft = () => {
    const marge = parseInt(
      pagesOfScenarioSelected.filter((page) => page.selected === true)[0].style
        .padding,
      10
    )

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, left: `${marge}%` } }
          : item
      )
    )
  }

  const handleClickTextareaOnCenter = () => {
    const item = images.filter((texte) => texte.selected === true)[0]
    // const itemWidth = parseInt(item.style.width.slice(0, item.style.width.length - 2) )
    const itemWidth = parseInt(item.style.width, 10)
    const newLeft = (100 - itemWidth) / 2 + "%"

    // const newLeft = (pageWidth -itemWidth)/2 +"px";

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, left: newLeft } }
          : item
      )
    )
  }

  const handleClickTextareaOnRight = () => {
    const marge = parseInt(
      pagesOfScenarioSelected.filter((page) => page.selected === true)[0].style
        .padding,
      10
    )

    const item = images.filter((texte) => texte.selected === true)[0]
    const itemWidth = parseInt(item.style.width, 10)
    // console.log("pageWidth",pageWidth,"itemWidth",itemWidth);
    const newLeft = 100 - itemWidth - marge + "%"

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, left: newLeft } }
          : item
      )
    )
  }

  const handleChangeCoordX = (e) => {
    setCoordX(e.target.value)

    const newLeft = e.target.value + "%"

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, left: newLeft } }
          : item
      )
    )
  }

  const handleChangeCoordY = (e) => {
    setCoordY(e.target.value)

    const newTop = e.target.value + "%"

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, top: newTop } }
          : item
      )
    )
  }

  const handleChangeCoordZ = (e) => {
    setCoordZ(e.target.value)

    const newZindex = e.target.value

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, zIndex: newZindex } }
          : item
      )
    )
  }

  const handleChangeItemWidth = (e) => {
    setItemWidth(e.target.value)

    const newWidth = e.target.value + "%"

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, width: newWidth } }
          : item
      )
    )
  }

  const handleChangeItemHeight = (e) => {
    setItemHeight(e.target.value)

    const newHeight = e.target.value + "%"

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, height: newHeight } }
          : item
      )
    )
  }

  const handleChangeAutoHeight = (e) => {
    setAutoHeight(!autoHeight)

    // si autoHeight était en auto (true) --> on calcule la taille relative de l'image et on l'injecte dans itemHeight et l'image sélectionnée
    if (autoHeight === true) {
      // NOTE : largeur page = 1000px et hauteur page = 1414px
      const selectedImage = images.find((image) => image.selected === true)
      const imageHeightWidthRatio =
        selectedImage.realImageHeight / selectedImage.realImageWidth
      const pageHeightWidthRatio = 1414 / 1000
      const imageWidth = parseInt(selectedImage.style.width, 10)

      const newHeight =
        (imageWidth * imageHeightWidthRatio) / pageHeightWidthRatio

      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, height: newHeight + "%" } }
            : item
        )
      )

      setItemHeight(newHeight)
    } else {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, height: "auto" } }
            : item
        )
      )
    }

    // si autoheight était à false on passe image selected.style.height = auto
  }

  const handleChangeOpacity = (e) => {
    setOpacity(e.target.value)

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, opacity: e.target.value } }
          : item
      )
    )
  }

  // ---FIN SECTION---------------------------------------------------------------------------

  // --------------------------------------------------------------------
  // -----FONCTIONS SECTION - BORDURES---------------------
  // ------------------------------------------------------------------
  const handleClickAjoutBordure = () => {
    const item = images.filter((texte) => texte.selected === true)[0]

    if (item.style.borderStyle === "none") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "solid" } }
            : item
        )
      )

      setappliedBorderStyle("solid")
    } else if (item.style.borderStyle === "solid") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "dotted" } }
            : item
        )
      )

      setappliedBorderStyle("dotted")
    } else if (item.style.borderStyle === "dotted") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "dashed" } }
            : item
        )
      )

      setappliedBorderStyle("dashed")
    } else if (item.style.borderStyle === "dashed") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "double" } }
            : item
        )
      )

      setappliedBorderStyle("double")
    } else if (item.style.borderStyle === "double") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "groove" } }
            : item
        )
      )

      setappliedBorderStyle("groove")
    } else if (item.style.borderStyle === "groove") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "ridge" } }
            : item
        )
      )

      setappliedBorderStyle("ridge")
    } else if (item.style.borderStyle === "ridge") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "outset" } }
            : item
        )
      )

      setappliedBorderStyle("outset")
    } else if (item.style.borderStyle === "outset") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "inset" } }
            : item
        )
      )

      setappliedBorderStyle("inset")
    } else if (item.style.borderStyle === "inset") {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "solid" } }
            : item
        )
      )

      setappliedBorderStyle("solid")
    }
  }

  const handleClickBorderOff = () => {
    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, borderStyle: "none" } }
          : item
      )
    )

    setappliedBorderStyle("none")
  }

  const handleChangeBorderThickness = (e) => {
    setBorderThickness(e.target.value)

    const newBorderWidth = e.target.value + "px"

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, borderWidth: newBorderWidth } }
          : item
      )
    )
  }

  const handleClickDivBorderColor = () => {
    setBorderColorVisible(true)
  }

  const handleChangeColorBorder = (color) => {
    setPickerBorderColor(color.rgb)
    setBorderColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: {
                ...item.style,
                borderColor: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
              },
            }
          : item
      )
    )
  }

  const handleLeaveBorderColor = () => {
    setBorderColorVisible(false)
  }

  const handleChangeDivBorderRadius = (e) => {
    setDivBorderRadius(e.target.value)

    const newBorderRadius = e.target.value + "px"

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, borderRadius: newBorderRadius } }
          : item
      )
    )
  }

  const handleChangeDivPadding = (e) => {
    setDivPadding(e.target.value)

    const newPadding = e.target.value + "px"

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, padding: newPadding } }
          : item
      )
    )
  }

  // ---FIN SECTION---------------------------------------------------------------------------

  // --------------------------------------------------------------------
  // -----FONCTIONS SECTION - OMBRE---------------------
  // ------------------------------------------------------------------
  const handleClickShadowOn = () => {
    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: {
                ...item.style,
                boxShadow: "15px 15px 15px 5px rgba(0,0,0,1)",
              },
            }
          : item
      )
    )
  }

  const handleClickShadowOff = () => {
    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: {
                ...item.style,
                boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
              },
            }
          : item
      )
    )
  }

  const handleChangeOmbreX = (e) => {
    setOmbreX(e.target.value)

    const item = images.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[0] = e.target.value + "px"

    const newBoxShadow = tabShadow.join(" ")

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, boxShadow: newBoxShadow } }
          : item
      )
    )
  }

  const handleChangeOmbreY = (e) => {
    setOmbreY(e.target.value)

    const item = images.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[1] = e.target.value + "px"

    const newBoxShadow = tabShadow.join(" ")

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, boxShadow: newBoxShadow } }
          : item
      )
    )
  }

  const handleChangeOmbreAlpha = (e) => {
    setOmbreAlpha(e.target.value)

    const item = images.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[2] = e.target.value + "px"

    const newBoxShadow = tabShadow.join(" ")

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, boxShadow: newBoxShadow } }
          : item
      )
    )
  }

  const handleChangeOmbreBeta = (e) => {
    setOmbreBeta(e.target.value)

    const item = images.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[3] = e.target.value + "px"

    const newBoxShadow = tabShadow.join(" ")

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, boxShadow: newBoxShadow } }
          : item
      )
    )
  }

  const handleClickDivShadowColor = () => {
    setShadowColorVisible(true)
  }

  const handleChangeColorShadow = (color) => {
    setPickerShadowColor(color.rgb)
    setShadowColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )

    const item = images.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[4] = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`

    const newBoxShadow = tabShadow.join(" ")

    setImages((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, boxShadow: newBoxShadow } }
          : item
      )
    )
  }

  const handleLeaveShadowColor = () => {
    setShadowColorVisible(false)
  }

  // ---FIN SECTION---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  // ----SAUVEGARDE DE STYLES----------------------------------------------------
  // ------------------------------------------------------------------------------
  const handleClickSaveStyle = () => {
    const savedBoxShadow = `${ombreX}px ${ombreY}px ${ombreAlpha}px ${ombreBeta}px ${shadowColor}`

    const newStyleName = prompt("Veuillez définir un nom pour ce style")

    const newStyleCss = {
      utilisateurs_id: user.id,
      textStyleName: newStyleName,
      position: "absolute",
      boxSizing: "border-box",
      zIndex: coordZ,
      borderStyle: appliedBorderStyle,
      borderColor,
      borderWidth: `${borderThickness}px`,
      borderRadius: `${divBorderRadius}px`,
      boxShadow: savedBoxShadow,
      padding: `${divPadding}px`,
      opacity,
    }

    // on peut maintenant poster ce nouveau style puis récupérer l'ensemble des styles de images de l'utilisateur

    axios
      .post(`http://localhost:4242/saved_style_image`, newStyleCss)
      .then(() => {
        axios
          .get(`http://localhost:4242/saved_style_image/utilisateur/${user.id}`)
          .then(({ data }) => setSavedImageStyles(data))
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }

  // ---FIN SECTION---------------------------------------------------------------------------

  return (
    <main className="main-editorTextStyle">
      <p>Image position & dimensions</p>
      <div className="positions-composant">
        <img
          src={positionGauche}
          className="cursorHover"
          alt="position gauche"
          title="Positionner l'élément à gauche"
          onClick={handleClickTextareaOnLeft}
        />
        <img
          src={positionCentre}
          className="cursorHover"
          alt="position centre"
          title="Centrer l'élément dans la page"
          onClick={handleClickTextareaOnCenter}
        />
        <img
          src={positionDroite}
          className="cursorHover"
          alt="position droite"
          title="Positionner l'élément à droite"
          onClick={handleClickTextareaOnRight}
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

          <div className="dimensionHimage">
            <p>H :</p>

            {!autoHeight && (
              <input
                type="number"
                min={0}
                max={100}
                value={itemHeight}
                onChange={handleChangeItemHeight}
              />
            )}

            <div className="checkboxDimensionH">
              <label htmlFor="checkboxDimensionH-imageStyle">Auto</label>
              <input
                type="checkbox"
                className="cursorHover"
                id="checkboxDimensionH-imageStyle"
                checked={autoHeight}
                onChange={handleChangeAutoHeight}
              />
            </div>
          </div>
        </div>
      </section>

      <p>Borders</p>
      <section className="section-bordures">
        <div className="section-bordures-ligne1">
          <img
            src={bordureOn}
            className="cursorHover"
            alt="bordure on"
            title="Ajouter une bordure à l'élément - Cliquez plusieurs fois pour changer le style"
            onClick={handleClickAjoutBordure}
            style={
              borderActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
            }
          />
          <img
            src={bordureOff}
            className="cursorHover"
            alt="bordure off"
            title="Supprimer la bordure"
            onClick={handleClickBorderOff}
            style={
              borderActived === false
                ? { boxShadow: "0px 0px 20px 5px #ffbd59" }
                : {}
            }
          />
          <label htmlFor="borderThickness">ep :</label>
          <input
            type="number"
            id="borderThickness"
            min={1}
            max={50}
            value={borderThickness}
            onChange={handleChangeBorderThickness}
          />
          <div
            className="text-color cursorHover"
            onClick={handleClickDivBorderColor}
          >
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
              max={1000}
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
              max={500}
              value={divPadding}
              onChange={handleChangeDivPadding}
            />
          </div>
        </div>
      </section>

      <p>Shadows</p>
      <section className="section-ombre">
        <div className="choix-ombre">
          <div className="images-ombre">
            <img
              src={ombre}
              className="cursorHover"
              alt="presence ombre"
              title="Ajouter une ombre à l'élément"
              onClick={handleClickShadowOn}
              style={
                shadowActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
              }
            />
            <img
              src={ombreOff}
              className="cursorHover"
              alt="pas d'ombre"
              title="Supprimer l'ombre"
              onClick={handleClickShadowOff}
              style={
                shadowActived === false
                  ? { boxShadow: "0px 0px 20px 5px #ffbd59" }
                  : {}
              }
            />
          </div>

          <div
            className="text-color cursorHover"
            onClick={handleClickDivShadowColor}
          >
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
            min={-200}
            max={200}
            value={ombreX}
            onChange={handleChangeOmbreX}
          />
          <label htmlFor="ombreY">y :</label>
          <input
            type="number"
            id="ombreY"
            min={-200}
            max={200}
            value={ombreY}
            onChange={handleChangeOmbreY}
          />
          <label htmlFor="ombreAlpha">&#945; :</label>
          <input
            type="number"
            id="ombreAlpha"
            min={0}
            max={200}
            value={ombreAlpha}
            onChange={handleChangeOmbreAlpha}
          />
          <label htmlFor="ombreBeta">&#946; :</label>
          <input
            type="number"
            id="ombreBeta"
            min={0}
            max={200}
            value={ombreBeta}
            onChange={handleChangeOmbreBeta}
          />
        </div>
      </section>

      <p>Transparency</p>
      <section className="section-opacity">
        <input
          type="number"
          max={1}
          min={0}
          step={0.05}
          value={opacity}
          onChange={handleChangeOpacity}
        />
      </section>

      <button
        type="button"
        onClick={handleClickSaveStyle}
        className="cursorHover"
      >
        Sauvegarder ce style
      </button>
    </main>
  )
}
