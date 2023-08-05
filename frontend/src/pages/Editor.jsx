import { useState, useEffect } from "react"
import EditorPage from "../components/EditorPage"
import saveDisquette from "../assets/images/saveDisquette.svg"
import addText from "../assets/images/addText.svg"
import addImg from "../assets/images/addImg.svg"
import undo from "../assets/images/undo.png"
import redo from "../assets/images/redo.png"
import iconSupprimer from "../assets/images/iconSupprimer.svg"
import EditorTextStyle from "../components/EditorTextStyle"

export default function Editor() {
  const [mounted, setMounted] = useState(false)
  const [pageWidth, setPageWidth] = useState()
  const [pageHeight, setPageHeight] = useState()
  const [pageOffsetX, setPageOffsetX] = useState()
  const [pageOffsetY, setPageOffsetY] = useState()
  const [addNewText, setAddNewText] = useState(false)
  const [textes, setTextes] = useState([])
  const [images, setImages] = useState([])
  const [pageHistory, setPageHistory] = useState([]) // pour pouvoir faire un undo
  const [pageFuture, setPageFuture] = useState([]) // pour pouvoir faire un redo
  const [savedTextStyles, setSavedTextStyles] = useState([])
  const [indexAfficheStyleText, setIndexAfficheStyleText] = useState({
    min: 0,
    max: 2,
  })

  const maPage = document.querySelector(".section-page")

  // --------------------------------------------------------------
  // --------AJOUT DE NOUVEAUX ELEMENTS DANS LA PAGE--------------
  // -----------------------------------------------------------
  const handleClickNewTextZone = () => {
    setAddNewText(true)
  }

  const handleClickDropNewText = (e) => {
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
      selected: true,
      style: {
        backgroundColor: "rgba(250,250,250,1)",
        position: "absolute",
        width: "50%",
        height: "5%",
        boxSizing: "border-box",
        top: newTop,
        left: newLeft,
        zIndex: 0,
        borderStyle: "none",
        borderColor: "rgba(200,200,200,1)",
        borderWidth: 1,
        borderRadius: 0,
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        fontSize: "20px",
        fontStyle: "normal",
        textDecoration: "none",
        fontWeight: 400,
        fontFamily: "cursive",
        color: "rgba(0,0,0,1)",
        padding: "4px",
        textAlign: "left",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
      },
    }

    if (addNewText === true) {
      // quand on ajoute un élément à la page on ne peux plus rétablir l'ancien état
      setPageFuture([])
      // Par contre on ajoute le nouvel élément à l'historique
      setPageHistory((prevState) => {
        const newTexteHistory = JSON.parse(JSON.stringify(textes)) // obligé sinon ça copie la référence de textes et du coup la suite ne fonctionne pas
        newTexteHistory.pop() // textes étant mis à jour avec un nouvel élément, on enlève cet élément
        const newState = [...prevState, { textes: newTexteHistory, images }]
        return newState
      })

      const newTextes = textes
      newTextes.push(newTextearea)
      setTextes(newTextes)
      setAddNewText(false)

      // le champ selected de tous les textes passe à false sauf celui qu'on vient de déposer
      setTextes((prevState) =>
        prevState.map((item) =>
          item.id === newID
            ? { ...item, selected: true }
            : { ...item, selected: false }
        )
      )
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

  // application d'un style sauvegardé à la textarea sélectionnée
  const handleClickApplyTextStyle = (styleToApply) => {
    setTextes((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: {
                ...styleToApply,
                width: item.style.width,
                height: item.style.height,
                left: item.style.left,
                top: item.style.top,
              },
            }
          : item
      )
    )
  }

  // ----------------------------------------------------------------------------
  // ------FONCTIONS CLICK SUR FLECHES PERMETTANT LE CHANGEMENT D'AFFICHAGE DES STYLES SAUVEGARDES----
  // ---------------------------------------------------------------------------
  const handleClickNextStylesText = () => {
    if (indexAfficheStyleText.max < savedTextStyles.length - 1) {
      setIndexAfficheStyleText((prevState) => ({
        min: prevState.min + 3,
        max: prevState.max + 3,
      }))
    }
  }

  const handleClickPreviousStylesText = () => {
    if (indexAfficheStyleText.min > 0) {
      if (indexAfficheStyleText.min - 3 < 0) {
        setIndexAfficheStyleText((prevState) => ({
          min: 0,
          max: 2,
        }))
      } else {
        setIndexAfficheStyleText((prevState) => ({
          min: prevState.min - 3,
          max: prevState.max - 3,
        }))
      }
    }
  }

  // ----FIN SECTION--------------------------------------------------

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR SUPPRESSION DES STYLES ENREGISTRES----
  // ---------------------------------------------------------------------------
  const handleContextMenuStyleText = (event, index) => {
    event.preventDefault()
    setSavedTextStyles((prevState) => {
      const newState = [...prevState]
      newState[index] = { ...newState[index], showDelete: true }
      return newState
    })

    setTextes((prevState) =>
      prevState.map((item) => ({ ...item, selected: false }))
    )
  }

  const handleLeaveContextMenuStyleText = (index) => {
    setSavedTextStyles((prevState) => {
      const newState = [...prevState]
      newState[index] = { ...newState[index], showDelete: false }
      return newState
    })
  }

  const handleDeleteStyleText = (index) => {
    setSavedTextStyles((prevState) => prevState.filter((_, i) => i !== index))
  }

  // ----FIN SECTION--------------------------------------------------

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR SUPPRESSION DES ELEMENTS DE LA PAGE----
  // ---------------------------------------------------------------------------

  const handleClickDeleteElement = () => {
    // A MODIFIER QUAND IL Y AURA DES IMAGES
    const newPageHistory = {
      textes,
      images,
    }
    setPageHistory((prevState) => {
      const newState = prevState
      newState.push(newPageHistory)
      return newState
    })
    setTextes((prevState) => prevState.filter((text) => !text.selected))
    // console.log("newPageHistory", newPageHistory);
  }
  // ----FIN SECTION--------------------------------------------------

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR GERER L'ANNULATION ET LE RETABLISSEMENT DES ACTIONS DANSLA PAGE----
  // ---------------------------------------------------------------------------

  // Fonction pour gérer l'annulation
  const handleClickUndo = () => {
    if (pageHistory.length > 0) {
      const prevStates = pageHistory.pop()
      setPageHistory(pageHistory)
      setPageFuture([{ textes, images }, ...pageFuture])
      setTextes(prevStates.textes)
      setImages(prevStates.images)
    } else {
      // setTextes([])
      // setImages([])
    }
  }

  // Fonction pour gérer le rétablissement
  const handleClickRedo = () => {
    if (pageFuture.length > 0) {
      const nextStates = pageFuture.shift()
      setPageFuture(pageFuture)
      setPageHistory([...pageHistory, { textes, images }])
      setTextes(nextStates.textes)
      setImages(nextStates.images)
    }
  }

  // ----FIN SECTION--------------------------------------------------

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

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR la GESTION DES RACCOURCIS CLAVIER----
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // annulation avec la combinaison de touche ctrl + z

    const handleKeyDownEditor = (event) => {
      if (event.ctrlKey && event.key === "z") {
        // console.log("undo")
        handleClickUndo()
      } else if (event.ctrlKey && event.key === "y") {
        // console.log("redo")
        handleClickRedo()
      }
    }

    document.addEventListener("keydown", handleKeyDownEditor)

    return () => {
      document.removeEventListener("keydown", handleKeyDownEditor)
    }
  }, [])
  // ----FIN SECTION--------------------------------------------------

  return (
    <>
      <div className="fausse-navbar"></div>

      <section className="editor-bandeau-superieur">
        <div className="editor-bandeau-gauche">
          <img src={saveDisquette} alt="save" />
          <button type="button">Nouveau</button>
          <button type="button">Ouvrir</button>
          <img
            src={undo}
            alt="annuler"
            onClick={handleClickUndo}
            title="Annuler suppression d'élément (ctrl + z)"
          />
          <img
            src={redo}
            alt="Rétablir"
            onClick={handleClickRedo}
            title="Rétablir suppression d'élément (ctrl + y)"
          />
        </div>

        <div className="editor-bandeau-centre">
          <div className="new-text-image">
            <img
              src={addText}
              alt="new textarea"
              onClick={handleClickNewTextZone}
              title="Ajouter une zone de texte"
            />
            <img
              src={addImg}
              alt="new image"
              onClick={() => {}}
              title="Importer une image"
            />
            <img
              src={iconSupprimer}
              alt="supprimer élément"
              onClick={handleClickDeleteElement}
              title="Supprimer l'élement sélectionné (ctrl + suppr)"
            />
          </div>

          <section className="container-saved-styles-text">
            <div className="saved-styles-text">
              <p>Styles des textes</p>
              <div className="saved-styles-container">
                {savedTextStyles
                  .filter(
                    (item, index) =>
                      index >= indexAfficheStyleText.min &&
                      index <= indexAfficheStyleText.max
                  )
                  .map((item, index) => (
                    <button
                      className="saved-style"
                      onClick={() => handleClickApplyTextStyle(item.styleCss)}
                      onContextMenu={(event) =>
                        handleContextMenuStyleText(event, index)
                      }
                      onMouseLeave={() =>
                        handleLeaveContextMenuStyleText(index)
                      }
                      key={item.id}
                    >
                      {item.styleName}
                      {savedTextStyles[index].showDelete && (
                        <input
                          type="button"
                          className="button-suppression-style"
                          onClick={() => handleDeleteStyleText(index)}
                          onMouseLeave={() =>
                            handleLeaveContextMenuStyleText(index)
                          }
                          value="Supprimer"
                        />
                      )}
                    </button>
                  ))}
              </div>
            </div>
            <div className="arrowButton-container">
              <button
                className="arrowButton"
                onClick={handleClickPreviousStylesText}
              >
                <div className="arrowButtonPrevious"></div>{" "}
              </button>
              <button
                className="arrowButton"
                onClick={handleClickNextStylesText}
              >
                <div className="arrowButtonNext"></div>{" "}
              </button>
            </div>
          </section>

          <section className="container-saved-styles-image">
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

            <div className="arrowButton-container">
              <button className="arrowButton">
                <div className="arrowButtonPrevious"></div>{" "}
              </button>
              <button className="arrowButton">
                <div className="arrowButtonNext"></div>{" "}
              </button>
            </div>
          </section>
        </div>

        <div className="editor-bandeau-droite">
          <section className="container-pages-saved-styles">
            <p>Styles des pages</p>
            <div className="saved-styles-container">
              <div className="saved-style">
                <p>Style 1</p>
              </div>
              <div className="saved-style">
                <p>Style 2</p>
              </div>
            </div>
          </section>

          <div className="arrowButton-container">
            <button className="arrowButton">
              <div className="arrowButtonPrevious"></div>{" "}
            </button>
            <button className="arrowButton">
              <div className="arrowButtonNext"></div>{" "}
            </button>
          </div>
        </div>
      </section>

      <main className="editor-main">
        <section className="sommaire-editeur">
          <div className="section-sommaire"></div>

          <div className="configurator">
            <EditorTextStyle
              textes={textes}
              setTextes={setTextes}
              savedTextStyles={savedTextStyles}
              setSavedTextStyles={setSavedTextStyles}
            />

            {/* {textes.length > 0 && (
              <div>
                <h1>{`width : ${textes[0].style.width}`}</h1>
                <h1>{`height : ${textes[0].style.height}`}</h1>
                <h1>{`top : ${textes[0].style.top}`}</h1>
                <h1>{`left : ${textes[0].style.left}`}</h1>
              </div>
            )} */}
          </div>
        </section>

        <div className="editor-page-container">
          <EditorPage
            textes={textes}
            setTextes={setTextes}
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
