import { useState, useEffect } from "react"
import EditorPage from "../components/EditorPage"
import saveDisquette from "../assets/images/saveDisquette.svg"
import addText from "../assets/images/addText.svg"
import addImg from "../assets/images/addImg.svg"
import EditorTextStyle from "../components/EditorTextStyle"

export default function Editor() {
  const [mounted, setMounted] = useState(false)
  const [pageWidth, setPageWidth] = useState()
  const [pageHeight, setPageHeight] = useState()
  const [pageOffsetX, setPageOffsetX] = useState()
  const [pageOffsetY, setPageOffsetY] = useState()

  const [addNewText, setAddNewText] = useState(false)
  const [textes, setTextes] = useState([])

  const maPage = document.querySelector(".section-page")

  // --------------------------------------------------------------
  // --------AJOUT DE NOUVEAUX ELEMENTS DANS LA PAGE--------------
  // -----------------------------------------------------------
  const handleClickNewTextZone = () => {
    setAddNewText(true)
  }

  const handleClickDropNewText = (e) => {
    // console.log(
    //   "e.clientX",
    //   e.clientX,
    //   "e.pageX",
    //   e.pageX,
    //   "offsetLeft",
    //   maPage.offsetLeft,
    //   "boundingLeft",
    //   maPage.getBoundingClientRect().left
    // )
    // console.log(
    //   "e.clientY",
    //   e.clientY,
    //   "e.pageY",
    //   e.pageY,
    //   "offsetTop",
    //   maPage.offsetTop,
    //   "boundingTop",
    //   maPage.getBoundingClientRect().top
    // )

    const newTop = (100 * (e.pageY - pageOffsetY)) / pageHeight + "%"

    const newLeft = (100 * (e.pageX - pageOffsetX)) / pageWidth + "%"
    let newID = null

    if (textes.length === 0) {
      newID = 1
    } else {
      newID = textes[textes.length - 1].id + 1
    }

    const newTextearea = {
      id: newID,
      text: "",
      placeHolder: "Tapez votre texte",
      style: {
        backgroundColor: "none",
        position: "absolute",
        top: newTop,
        left: newLeft,
        border: "none",
        width: "50%",
        height: "5%",
      },
    }

    if (addNewText === true) {
      const newTextes = textes
      newTextes.push(newTextearea)
      //   console.log("newTextes", newTextes)
      setTextes(newTextes)
      setAddNewText(false)
    }
  }
  // ------------------------------------------------------------
  // -----------------------------------------------------------

  // ---------------------------------------------------------------
  // ----DRAG & DROP : DEPLACEMENT DES TEXTAREA ET DES IMAGES
  // -----------------------------------------------------------
  const handleDragStart = (event, id) => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
    // event.dataTransfer.setData(
    //   "application/json",
    //   JSON.stringify(event.target.value)
    // )
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    // console.log("pageOffsetX", pageOffsetX)

    const newTop = 100 * ((event.pageY - pageOffsetY) / pageHeight) + "%"

    // const newLeft = event.pageX;
    const newLeft = 100 * ((event.pageX - pageOffsetX) / pageWidth) + "%"
    // console.log("newTop", newTop, "newLeft", newLeft)
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, top: newTop, left: newLeft } }
          : item
      )
    )
  }
  // ------------------------------------------------------------------------
  // --------------------------------------------------------------------------

  // quand on clique sur un élément son state selected passe à true, le state des autres éléments passe à false
  // ceci permet de modifier le style ou la position uniquement de l'élément sélectionné
  const handleClickElement = (id) => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
  }

  // enregistrement du texte des textearea lors de leur modification
  const handleChangeTexte = (id, newText) => {
    // console.log("id",id);
    setTextes((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    )
  }

  // -----------------------------------------------------------------------
  // ----FONCTIONS DE CHANGEMENT DE STYLE DES TEXTAREA--------------------
  // --------------------------------------------------------------------

  const handleClickBordureEpaisse = () => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, border: "5px solid black" } }
          : item
      )
    )
  }

  const handleClickBordureFine = () => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, border: "1px solid grey" } }
          : item
      )
    )
  }

  const handleClickTextareaOnLeft = () => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? { ...item, style: { ...item.style, left: 0 } }
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

    // console.log(textes)
  }
  // ------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  // ----------------------------------------------------------------
  // ---MISE A JOUR DE WIDTH ET HEIGHT LORS DE L'ETIREMENT DES TEXTAREA----
  // ---------------------------------------------------------------
  const [resizing, setResizing] = useState(null)

  const handleMouseDown = (e, id) => {
    // Détecter si l'utilisateur a cliqué sur le coin inférieur droit de la zone de texte
    if (
      e.target === e.currentTarget &&
      e.nativeEvent.offsetX > e.target.clientWidth - 30 &&
      e.nativeEvent.offsetY > e.target.clientHeight - 30
    ) {
      // Si oui, activer le redimensionnement
      setResizing(id)

      handleClickElement()
    }
  }

  const handleMouseMove = (e) => {
    const scrollY = window.pageYOffset
    // Si le redimensionnement est activé
    if (resizing !== null) {
      // Mettre à jour les champs width et height de l'objet style dans l'état textes
      setTextes((prevState) =>
        prevState.map((item) =>
          item.id === resizing
            ? {
                ...item,
                style: {
                  ...item.style,
                  width: `${
                    100 * ((e.pageX - pageOffsetX) / pageWidth) -
                    parseInt(item.style.left, 10)
                  }%`,
                  height: `${
                    100 * ((e.pageY + scrollY - pageOffsetY) / pageHeight) -
                    parseInt(item.style.top, 10)
                  }%`,
                },
              }
            : item
        )
      )
      // console.log("newWidth", `${e.pageX - parseInt(textes[resizing].style.left,10)}px`);
    }
  }

  const handleMouseUp = () => {
    // Désactiver le redimensionnement
    setResizing(null)
    // console.log("resizing up", resizing)
  }
  // -----------------------------------------------------------------------
  // --------------------------------------------------------------------

  // --------------------------------
  // mise à jour des dimensions et position de maPage lorsque la taille de la fenêtre change

  const handleResize = () => {
    const rect = maPage.getBoundingClientRect()
    setPageWidth(rect.width)
    setPageOffsetX(rect.left)
    // setPageOffsetY(rect.top); //bizarrement ça marche moins bien si on met ça à jour également
  }

  window.onresize = handleResize
  // Explication du pourquoi on fait ça :
  //   rect.width et rect.left sont des propriétés de l’objet retourné par la méthode getBoundingClientRect de l’élément maPage. rect.width représente la largeur de l’élément maPage, tandis que rect.left représente la distance entre le bord gauche de l’élément maPage et le bord gauche du viewport (c’est-à-dire la zone visible de la page).
  // Il est important de mettre à jour les valeurs de pageWidth et pageOffsetX lorsque la taille de la fenêtre change, car cela peut affecter les dimensions et la position de l’élément maPage. Si ces valeurs ne sont pas mises à jour, les calculs effectués dans les fonctions de gestion des événements, telles que handleDrop, peuvent être incorrects, ce qui peut entraîner un positionnement incorrect des éléments déposés.
  // En ajoutant un gestionnaire d’événements pour l’événement resize de la fenêtre, vous vous assurez que les valeurs de pageWidth et pageOffsetX sont correctement mises à jour chaque fois que la taille de la fenêtre change. Cela devrait aider à garantir que les calculs effectués dans les fonctions de gestion des événements sont corrects, même lorsque la taille de la fenêtre change
  // --------------------------------------

  // initialisation des dimensions et position de maPage une fois que la page est montée
  useEffect(() => {
    if (mounted) {
      setPageWidth(maPage.clientWidth) // largeur de maPage
      setPageHeight(maPage.clientHeight) // hauteur de maPage
      setPageOffsetX(maPage.getBoundingClientRect().left) // décalage à gauche de maPage
      setPageOffsetY(maPage.getBoundingClientRect().top) // décalage du haut de maPage
    }
  }, [mounted])

  // passage de l'état mounted à true une fois que la page est montée
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div className="fausse-navbar"></div>

      <section className="editor-bandeau-superieur">
        <div className="editor-bandeau-gauche">
          <img src={saveDisquette} alt="save" />
          <button type="button">Nouveau</button>
          <button type="button">Ouvrir</button>
        </div>

        <div className="editor-bandeau-centre">
          <div className="new-text-image">
            <img
              src={addText}
              alt="new textarea"
              onClick={handleClickNewTextZone}
            />
            <img src={addImg} alt="new image" onClick={() => {}} />
          </div>
          <div className="saved-styles-text">
            <p>Styles des textes</p>
            <div className="saved-styles-container">
              <div className="saved-style">
                <p>Style 1</p>
              </div>
              <div className="saved-style">
                <p>Style 2</p>
              </div>
            </div>
          </div>
          <div className="saved-styles-images">
            <p>Styles des images</p>
            <div className="saved-styles-container">
              <div className="saved-style">
                <p>Style 1</p>
              </div>
              <div className="saved-style">
                <p>Style 2</p>
              </div>
            </div>
          </div>
        </div>

        <div className="editor-bandeau-droite">
          <p>Styles des pages</p>
          <div className="saved-styles-container">
            <div className="saved-style">
              <p>Style 1</p>
            </div>
            <div className="saved-style">
              <p>Style 2</p>
            </div>
          </div>
        </div>
        {/* <button type="button" onClick={handleClickNewTextZone}>
          Nouvelle Zone de texte
        </button> */}
      </section>

      <main className="editor-main">
        <section className="sommaire-editeur">
          <div className="section-sommaire"></div>

          <div className="configurator">
            <EditorTextStyle />
            <div>
              <button type="button" onClick={handleClickBordureEpaisse}>
                Bordure épaisse
              </button>
              <button type="button" onClick={handleClickBordureFine}>
                Bordure Fine
              </button>
            </div>
            <div>
              <button type="button" onClick={handleClickTextareaOnLeft}>
                Positionner à gauche
              </button>
              <button type="button" onClick={handleClickTextareaOnCenter}>
                Centrer
              </button>
              <button type="button" onClick={handleClickTextareaOnRight}>
                Positionner à droite
              </button>
            </div>
            {textes.length > 0 && (
              <div>
                <h1>{`width : ${textes[0].style.width}`}</h1>
                <h1>{`height : ${textes[0].style.height}`}</h1>
                <h1>{`top : ${textes[0].style.top}`}</h1>
                <h1>{`left : ${textes[0].style.left}`}</h1>
              </div>
            )}
          </div>
        </section>

        <div className="editor-page-container">
          <EditorPage
            textes={textes}
            handleClickDropNewText={handleClickDropNewText}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleChangeTexte={handleChangeTexte}
            handleDragStart={handleDragStart}
            handleClickElement={handleClickElement}
            handleMouseDown={handleMouseDown}
          />
        </div>
      </main>
    </>
  )
}
