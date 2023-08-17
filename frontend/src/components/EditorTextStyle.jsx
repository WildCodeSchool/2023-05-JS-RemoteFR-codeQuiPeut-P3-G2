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
import { React, useState, useEffect } from "react"

export default function EditorTextStyle({
  textes,
  setTextes,
  savedTextStyles,
  setSavedTextStyles,
}) {
  const [mounted, setMounted] = useState(false)
  const [coordX, setCoordX] = useState(0)
  const [coordY, setCoordY] = useState(0)
  const [coordZ, setCoordZ] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [itemHeight, setItemHeight] = useState(0)
  const [alignLeftActived, setAlignLeftActived] = useState(false)
  const [alignCenterActived, setAlignCenterActived] = useState(false)
  const [alignRightActived, setAlignRightActived] = useState(false)
  const [alignJustifyActived, setAlignJustifyActived] = useState(false)
  const [appliedTextAlign, setappliedTextAlign] = useState("normal")
  const [boldActived, setBoldActived] = useState(false)
  const [appliedFontWeight, setappliedFontWeight] = useState("normal")
  const [italicActived, setItalicActived] = useState(false)
  const [appliedFontStyle, setappliedFontStyle] = useState("normal")
  const [underlineActived, setUnderlineActived] = useState(false)
  const [appliedTextDecoration, setappliedTextDecoration] = useState("none")
  const [font, setFont] = useState("Serif")
  const [divFontSize, setDivFontSize] = useState(20)
  const [pickerTextColor, setPickerTextColor] = useState("#000000")
  const [textColor, setTextColor] = useState("#000000")
  const [textColorVisible, setTextColorVisible] = useState(false)
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
  const [blur, setBlur] = useState(0)
  const [pickerBackColor, setPickerBackColor] = useState("#000000")
  const [backColor, setBackColor] = useState("#000000")
  const [backColorVisible, setBackColorVisible] = useState(false)

  // passage de l'état mounted à true une fois que la page est montée
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && textes) {
      const item = textes.filter((texte) => texte.selected === true)[0]

      if (item) {
        const itemStyle = item.style

        setCoordX(parseInt(itemStyle.left, 10))
        setCoordY(parseInt(itemStyle.top, 10))
        setCoordZ(itemStyle.zIndex)
        setItemWidth(parseInt(itemStyle.width, 10))
        setItemHeight(parseInt(itemStyle.height, 10))

        if (itemStyle.textAlign === "left") {
          setAlignLeftActived(true)
          setAlignCenterActived(false)
          setAlignRightActived(false)
          setAlignJustifyActived(false)
        } else if (itemStyle.textAlign === "center") {
          setAlignLeftActived(false)
          setAlignCenterActived(true)
          setAlignRightActived(false)
          setAlignJustifyActived(false)
        } else if (itemStyle.textAlign === "right") {
          setAlignLeftActived(false)
          setAlignCenterActived(false)
          setAlignRightActived(true)
          setAlignJustifyActived(false)
        } else if (itemStyle.textAlign === "justify") {
          setAlignLeftActived(false)
          setAlignCenterActived(false)
          setAlignRightActived(false)
          setAlignJustifyActived(true)
        }

        if (itemStyle.fontWeight === 700) {
          setBoldActived(true)
        } else {
          setBoldActived(false)
        }

        if (itemStyle.fontStyle === "italic") {
          setItalicActived(true)
        } else {
          setItalicActived(false)
        }

        if (itemStyle.textDecoration === "underline") {
          setUnderlineActived(true)
        } else {
          setUnderlineActived(false)
        }

        setFont(itemStyle.fontFamily)

        setDivFontSize(parseFloat(itemStyle.fontSize, 10))

        setTextColor(itemStyle.color)

        const textColorR = itemStyle.color
          .slice(5, itemStyle.color.length - 1)
          .split(",")[0]
        const textColorG = itemStyle.color
          .slice(5, itemStyle.color.length - 1)
          .split(",")[1]
        const textColorB = itemStyle.color
          .slice(5, itemStyle.color.length - 1)
          .split(",")[2]
        const textColorA = itemStyle.color
          .slice(5, itemStyle.color.length - 1)
          .split(",")[3]

        setPickerTextColor({
          r: textColorR,
          g: textColorG,
          b: textColorB,
          a: textColorA,
        })

        if (itemStyle.borderStyle === "none") {
          setBorderActived(false)
        } else {
          setBorderActived(true)
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

        setBlur(
          parseInt(
            itemStyle.backdropFilter.slice(
              5,
              itemStyle.backdropFilter.length - 1
            ),
            10
          )
        )

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
      }
    }
  }, [textes])

  // --------------------------------------------------------------------
  // -----FONCTIONS SECTION - POSITION DU COMPOSANT---------------------
  // ------------------------------------------------------------------
  const handleClickTextareaOnLeft = () => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, left: 0 } }
          : item
      )
    )
  }

  const handleClickTextareaOnCenter = () => {
    const item = textes.filter((texte) => texte.selected === true)[0]
    // const itemWidth = parseInt(item.style.width.slice(0, item.style.width.length - 2) )
    const itemWidth = parseInt(item.style.width, 10)
    const newLeft = (100 - itemWidth) / 2 + "%"

    // const newLeft = (pageWidth -itemWidth)/2 +"px";

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, left: newLeft } }
          : item
      )
    )
  }

  const handleClickTextareaOnRight = () => {
    const item = textes.filter((texte) => texte.selected === true)[0]
    const itemWidth = parseInt(item.style.width, 10)
    // console.log("pageWidth",pageWidth,"itemWidth",itemWidth);
    const newLeft = 100 - itemWidth + "%"

    setTextes((prevState) =>
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

    setTextes((prevState) =>
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

    setTextes((prevState) =>
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

    setTextes((prevState) =>
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

    setTextes((prevState) =>
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

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, height: newHeight } }
          : item
      )
    )
  }

  // ---FIN SECTION---------------------------------------------------------------------------

  // --------------------------------------------------------------------
  // -----FONCTIONS SECTION - TEXTE---------------------
  // ------------------------------------------------------------------
  const handleClickAlignLeft = () => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, textAlign: "left" } }
          : item
      )
    )

    setappliedTextAlign("left")
  }

  const handleClickAlignCenter = () => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, textAlign: "center" } }
          : item
      )
    )

    setappliedTextAlign("center")
  }

  const handleClickAlignRight = () => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, textAlign: "right" } }
          : item
      )
    )

    setappliedTextAlign("right")
  }

  const handleClickAlignJustify = () => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, textAlign: "justify" } }
          : item
      )
    )

    setappliedTextAlign("justify")
  }

  const handleClickBold = () => {
    const item = textes.filter((texte) => texte.selected === true)[0]

    if (item.style.fontWeight === 700) {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, fontWeight: 400 } }
            : item
        )
      )

      setappliedFontWeight(400)
    } else {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, fontWeight: 700 } }
            : item
        )
      )

      setappliedFontWeight(700)
    }
  }

  const handleClickItalic = () => {
    const item = textes.filter((texte) => texte.selected === true)[0]

    if (item.style.fontStyle === "normal") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, fontStyle: "italic" } }
            : item
        )
      )

      setappliedFontStyle("italic")
    } else {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, fontStyle: "normal" } }
            : item
        )
      )

      setappliedFontStyle("normal")
    }
  }

  const handleClickUnderline = () => {
    const item = textes.filter((texte) => texte.selected === true)[0]

    if (item.style.textDecoration === "none") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, textDecoration: "underline" } }
            : item
        )
      )

      setappliedTextDecoration("underline")
    } else {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, textDecoration: "none" } }
            : item
        )
      )

      setappliedTextDecoration("none")
    }
  }

  const handleChangeFont = (e) => {
    setFont(e.target.value)

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, fontFamily: e.target.value } }
          : item
      )
    )
  }

  const handleClickDivTextColor = () => {
    setTextColorVisible(true)
  }

  const handleClickFontSize = (e) => {
    setDivFontSize(e.target.value)
    const newFontSize = e.target.value + "rem"

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: { ...item.style, fontSize: newFontSize },
            }
          : item
      )
    )
  }

  const handleChangeColorText = (color) => {
    setPickerTextColor(color.rgb)
    setTextColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: {
                ...item.style,
                color: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
              },
            }
          : item
      )
    )
  }

  const handleLeaveTextColor = () => {
    setTextColorVisible(false)
  }

  // ---FIN SECTION---------------------------------------------------------------------------

  // --------------------------------------------------------------------
  // -----FONCTIONS SECTION - BORDURES---------------------
  // ------------------------------------------------------------------
  const handleClickAjoutBordure = () => {
    const item = textes.filter((texte) => texte.selected === true)[0]

    if (item.style.borderStyle === "none") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "solid" } }
            : item
        )
      )

      setappliedBorderStyle("solid")
    } else if (item.style.borderStyle === "solid") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "dotted" } }
            : item
        )
      )

      setappliedBorderStyle("dotted")
    } else if (item.style.borderStyle === "dotted") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "dashed" } }
            : item
        )
      )

      setappliedBorderStyle("dashed")
    } else if (item.style.borderStyle === "dashed") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "double" } }
            : item
        )
      )

      setappliedBorderStyle("double")
    } else if (item.style.borderStyle === "double") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "groove" } }
            : item
        )
      )

      setappliedBorderStyle("groove")
    } else if (item.style.borderStyle === "groove") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "ridge" } }
            : item
        )
      )

      setappliedBorderStyle("ridge")
    } else if (item.style.borderStyle === "ridge") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "outset" } }
            : item
        )
      )

      setappliedBorderStyle("outset")
    } else if (item.style.borderStyle === "outset") {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, borderStyle: "inset" } }
            : item
        )
      )

      setappliedBorderStyle("inset")
    } else if (item.style.borderStyle === "inset") {
      setTextes((prevState) =>
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
    setTextes((prevState) =>
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

    setTextes((prevState) =>
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

    setTextes((prevState) =>
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

    setTextes((prevState) =>
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

    setTextes((prevState) =>
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
    setTextes((prevState) =>
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
    setTextes((prevState) =>
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

    const item = textes.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[0] = e.target.value + "px"

    const newBoxShadow = tabShadow.join(" ")

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, boxShadow: newBoxShadow } }
          : item
      )
    )
  }

  const handleChangeOmbreY = (e) => {
    setOmbreY(e.target.value)

    const item = textes.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[1] = e.target.value + "px"

    const newBoxShadow = tabShadow.join(" ")

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, boxShadow: newBoxShadow } }
          : item
      )
    )
  }

  const handleChangeOmbreAlpha = (e) => {
    setOmbreAlpha(e.target.value)

    const item = textes.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[2] = e.target.value + "px"

    const newBoxShadow = tabShadow.join(" ")

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, boxShadow: newBoxShadow } }
          : item
      )
    )
  }

  const handleChangeOmbreBeta = (e) => {
    setOmbreBeta(e.target.value)

    const item = textes.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[3] = e.target.value + "px"

    const newBoxShadow = tabShadow.join(" ")

    setTextes((prevState) =>
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

    const item = textes.filter((texte) => texte.selected === true)[0]

    const tabShadow = item.style.boxShadow.split(" ")
    tabShadow[4] = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`

    const newBoxShadow = tabShadow.join(" ")

    setTextes((prevState) =>
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

  // --------------------------------------------------------------------
  // -----FONCTIONS SECTION - ARRIERE PLAN---------------------
  // ------------------------------------------------------------------

  const handleChangeBlur = (e) => {
    setBlur(e.target.value)

    const newBlur = `blur(${e.target.value + "px"})`

    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: {
                ...item.style,
                backdropFilter: newBlur,
                WebkitBackdropFilter: newBlur,
              },
            }
          : item
      )
    )
  }

  const handleClickDivBackColor = () => {
    setBackColorVisible(true)
  }

  const handleChangeColorBack = (color) => {
    setPickerBackColor(color.rgb)
    setBackColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    )

    setTextes((prevState) =>
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

  const handleLeaveBackColor = () => {
    setBackColorVisible(false)
  }
  // ---FIN SECTION---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  // ----SAUVEGARDE DE STYLES----------------------------------------------------
  // ------------------------------------------------------------------------------
  const handleClickSaveStyle = () => {
    const savedBoxShadow = `${ombreX}px ${ombreY}px ${ombreAlpha}px ${ombreBeta}px ${shadowColor}`

    const newStyleCss = {
      backgroundColor: backColor,
      position: "absolute",
      boxSizing: "border-box",
      zIndex: coordZ,
      borderStyle: appliedBorderStyle,
      borderColor,
      borderWidth: borderThickness,
      borderRadius: divBorderRadius,
      boxShadow: savedBoxShadow,
      fontSize: `${divFontSize}rem`,
      fontStyle: appliedFontStyle,
      textDecoration: appliedTextDecoration,
      fontWeight: appliedFontWeight,
      fontFamily: font,
      color: textColor,
      padding: divPadding,
      textAlign: appliedTextAlign,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
    }

    const newStyleName = prompt("Veuillez définir un nom pour ce style")

    const newStyleId =
      savedTextStyles.length === 0
        ? 1
        : Math.max(...savedTextStyles.map((obj) => obj.id)) + 1

    const newStyle = {
      id: newStyleId,
      styleName: newStyleName,
      styleCss: newStyleCss,
      showDelete: false,
    }

    setSavedTextStyles((prevState) => [...prevState, newStyle])
  }

  // ---FIN SECTION---------------------------------------------------------------------------

  return (
    <main className="main-editorTextStyle">
      <p>Position du composant</p>
      <div className="positions-composant">
        <img
          src={positionGauche}
          alt="position gauche"
          title="Positionner l'élément à gauche"
          onClick={handleClickTextareaOnLeft}
        />
        <img
          src={positionCentre}
          alt="position centre"
          title="Centrer l'élément dans la page"
          onClick={handleClickTextareaOnCenter}
        />
        <img
          src={positionDroite}
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
          onClick={handleClickAlignLeft}
          style={
            alignLeftActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
          }
        />
        <img
          src={positionCentre}
          alt="alignement centre"
          title="Centrer le texte"
          onClick={handleClickAlignCenter}
          style={
            alignCenterActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
          }
        />
        <img
          src={positionDroite}
          alt="alignement droite"
          title="Aligner le texte à droite"
          onClick={handleClickAlignRight}
          style={
            alignRightActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
          }
        />
        <img
          src={positionJustify}
          alt="alignement justifié"
          title="Justifier le texte"
          onClick={handleClickAlignJustify}
          style={
            alignJustifyActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
          }
        />
      </div>

      <section className="style-texte">
        <img
          src={miseEnGras}
          alt="Mettre en gras"
          title="Mettre en gras"
          onClick={handleClickBold}
          style={boldActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}}
        />
        <img
          src={miseEnItalic}
          alt="Mettre en italique"
          title="Mettre en italique"
          onClick={handleClickItalic}
          style={italicActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}}
        />
        <img
          src={soulignage}
          alt="Souligner"
          title="Souligner"
          onClick={handleClickUnderline}
          style={
            underlineActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
          }
        />
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

        <input
          type="number"
          step={0.1}
          value={divFontSize}
          min={0.1}
          max={15}
          onChange={handleClickFontSize}
        />

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
            title="Ajouter une bordure à l'élément - Cliquez plusieurs fois pour changer le style"
            onClick={handleClickAjoutBordure}
            style={
              borderActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
            }
          />
          <img
            src={bordureOff}
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

      <p>Ombre</p>
      <section className="section-ombre">
        <div className="choix-ombre">
          <div className="images-ombre">
            <img
              src={ombre}
              alt="presence ombre"
              title="Ajouter une ombre à l'élément"
              onClick={handleClickShadowOn}
              style={
                shadowActived ? { boxShadow: "0px 0px 20px 5px #ffbd59" } : {}
              }
            />
            <img
              src={ombreOff}
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

      <p>Arrière plan</p>
      <section className="section-background">
        <div className="div-blur">
          <label htmlFor="blur">Flou :</label>
          <input
            type="number"
            id="blur"
            min={0}
            max={100}
            value={blur}
            onChange={handleChangeBlur}
            title="Mettre de la transparence à l'arrière plan pour en observer l'effet"
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

      <button type="button" onClick={handleClickSaveStyle}>
        Sauvegarder ce style
      </button>
    </main>
  )
}
