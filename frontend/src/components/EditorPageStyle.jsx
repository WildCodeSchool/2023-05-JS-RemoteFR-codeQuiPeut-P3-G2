import { SketchPicker } from "react-color"
import { React, useState, useEffect } from "react"
import axios from "axios"
import marges from "../assets/images/marges.png"

export default function EditorPageStyle(props) {
  const {
    pagesOfScenarioSelected,
    setPagesOfScenarioSelected,
    setSavedPageStyles,
    user,
  } = props

  const [mounted, setMounted] = useState(false)
  const [pickerBackColor, setPickerBackColor] = useState("rgba(255,255,255,1)")
  const [backColor, setBackColor] = useState("rgba(255,255,255,1)")
  const [backColorVisible, setBackColorVisible] = useState(false)
  const [divPaddingPage, setDivPaddingPage] = useState(0)

  const handleClickDivBackColor = () => {
    setBackColorVisible(true)
  }

  const handleLeaveBackColor = () => {
    setBackColorVisible(false)
  }

  const handleChangeColorBack = (color) => {
    setPickerBackColor(color.rgb)
    setBackColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )

    setPagesOfScenarioSelected((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: {
                ...item.style,
                backgroundColor: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
              },
            }
          : item
      )
    )
  }

  const handleChangeDivPaddingPage = (e) => {
    setDivPaddingPage(e.target.value)
    const newPaddingPage = e.target.value + "px"

    setPagesOfScenarioSelected((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, padding: newPaddingPage } }
          : item
      )
    )
  }

  // ---------------------------------------------------------------------------------------------
  // ----SAUVEGARDE DE STYLES----------------------------------------------------
  // ------------------------------------------------------------------------------
  const handleClickSaveStyle = () => {
    const newStyleName = prompt("Veuillez définir un nom pour ce style")

    const newStyleCss = {
      utilisateurs_id: user.id,
      background_color: backColor,
      padding: `${divPaddingPage}px`,
      styleName: newStyleName,
    }

    // on peut maintenant poster ce nouveau style puis récupérer l'ensemble des styles de textes de l'utilisateur

    axios
      .post(`http://localhost:4242/saved_style_page`, newStyleCss)
      .then(() => {
        axios
          .get(`http://localhost:4242/saved_style_page/utilisateur/${user.id}`)
          .then(({ data }) => setSavedPageStyles(data))
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }

  // ---FIN SECTION---------------------------------------------------------------------------

  // passage de l'état mounted à true une fois que la page est montée
  useEffect(() => {
    setMounted(true)
  }, [])

  // mise à jour des states de style lorsqu'on change de page
  useEffect(() => {
    if (mounted && pagesOfScenarioSelected) {
      const itemStyle = pagesOfScenarioSelected.filter(
        (page) => page.selected === true
      )[0].style
      setBackColor(itemStyle.backgroundColor)

      const backColorR = itemStyle.backgroundColor
        .slice(5, itemStyle.backgroundColor.length - 1)
        .split(",")[0]
      const backColorG = itemStyle.backgroundColor
        .slice(5, itemStyle.backgroundColor.length - 1)
        .split(",")[1]
      const backColorB = itemStyle.backgroundColor
        .slice(5, itemStyle.backgroundColor.length - 1)
        .split(",")[2]
      const backColorA = itemStyle.backgroundColor
        .slice(5, itemStyle.backgroundColor.length - 1)
        .split(",")[3]

      setPickerBackColor({
        r: backColorR,
        g: backColorG,
        b: backColorB,
        a: backColorA,
      })

      setDivPaddingPage(parseInt(itemStyle.padding, 10))
    }
  }, [pagesOfScenarioSelected])

  return (
    <main className="main-editorPageStyle">
      <p>Couleur de fond de la page</p>

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

      <p>Largeur des marges</p>

      <div className="div-marges">
        <img
          src={marges}
          alt="marges intérieures"
          title="Entrez à côté une valeur pour les marges intérieures"
        />
        <input
          type="number"
          min={0}
          max={500}
          value={divPaddingPage}
          onChange={handleChangeDivPaddingPage}
        />
      </div>

      <button type="button" onClick={handleClickSaveStyle}>
        Sauvegarder ce style
      </button>
    </main>
  )
}
