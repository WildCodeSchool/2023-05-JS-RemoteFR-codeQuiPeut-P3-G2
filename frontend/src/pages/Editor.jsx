import axios from "axios"
import { useState, useEffect } from "react"
import EditorPage from "../components/EditorPage"
import saveDisquette from "../assets/images/saveDisquette.svg"
import addText from "../assets/images/addText.svg"
// import addImg from "../assets/images/addImg.svg"
import undo from "../assets/images/undo.png"
import redo from "../assets/images/redo.png"
import iconSupprimer from "../assets/images/iconSupprimer.svg"
import EditorTextStyle from "../components/EditorTextStyle"
import EditorPageStyle from "../components/EditorPageStyle"
import SommaireEditor from "../components/SommaireEditor"
import Navbar from "../components/Navbar"

export default function Editor() {
  const [user, setUser] = useState({}) // à SUPPRIMER par la suite, à récupérer via un context
  const [author, setAuthor] = useState({}) // (id, authorName)
  const [campagnesUtilisateur, setCampagnesUtilisateur] = useState([]) // (id, campagneName)
  const [editedCampagne, setEditedCampagne] = useState({})
  const [scenariosOfEditedCampagne, setScenariosOfEditedCampagne] = useState([])
  const [pagesOfScenarioSelected, setPagesOfScenarioSelected] = useState([])
  const [selectedElementType, setSelectedElementType] = useState("none")
  const [showMenuOpen, setShowMenuOpen] = useState(false)
  const [deletedImages, setDeletedImages] = useState([])
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
  const [savedPageStyles, setSavedPageStyles] = useState([])
  const [indexAfficheStyleText, setIndexAfficheStyleText] = useState({
    min: 0,
    max: 2,
  })
  const [indexAfficheStylePage, setIndexAfficheStylePage] = useState({
    min: 0,
    max: 1,
  })

  const maPage = document.querySelector(".section-page")

  // récupération de l'utilisateur ... A SUPPRIMER PLUS TARD
  // puis de l'auteur (pas à supprimer)
  // puis de ses campagnes

  useEffect(() => {
    axios
      .get("http://localhost:4242/utilisateurs/1")
      .then(({ data }) => {
        setUser(data)
        return data
      })
      .then((userData) => {
        axios
          .get(`http://localhost:4242/auteurs/user/${userData.id}`)
          .then(({ data }) => {
            setAuthor(data)
            return data
          })
          .then((author) => {
            axios
              .get(`http://localhost:4242/auteurs/${author.id}/campagnes`) // A MODIFIER - NE FONCTIONNE PAS ?? (sur de ça ? a verifier)
              .then(({ data }) => setCampagnesUtilisateur(data))
              .catch((err) => console.error(err))
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }, [])

  // --------------------------------------------------------------
  // --------AJOUT DE NOUVEAUX ELEMENTS DANS LA PAGE--------------
  // -----------------------------------------------------------
  const handleClickNewTextZone = () => {
    // console.log("test");
    setAddNewText(true)
  }

  const handleClickDropNewText = (e) => {
    const newTop = (100 * (e.pageY - pageOffsetY)) / pageHeight + "%"

    const newLeft = (100 * (e.pageX - pageOffsetX)) / pageWidth + "%"
    const idPageSelected = pagesOfScenarioSelected.filter(
      (item) => item.selected === true
    )[0].id

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

      // on crée un nouveau texte dans la base de donnée puis on le récupère pour l'injecter dans newtextarea

      axios
        .post(`http://localhost:4242/pages/${idPageSelected}/newtexte`, {
          top: newTop,
          left: newLeft,
        })
        .then(() => {
          axios
            .get(`http://localhost:4242/lasttexte`) // on va chercher les textes de la page sélectionnée
            .then(({ data }) => {
              // const newTextes = textes
              // newTextes.push(data)
              const newTextes = [...textes, data]
              setTextes(newTextes)
            })
        })
        .catch(function (error) {
          console.error(error)
        })

      setAddNewText(false)
    } else {
      // si on n'est pas en train d'ajouter un élément dans la page alors on affiche l'éditeur de style de la page
      const pageID = pagesOfScenarioSelected.filter(
        (page) => page.selected === true
      )[0].id
      handleClickElementPage(pageID)
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
  const handleClickElementTexte = (id, e) => {
    // quand on clique sur un texte
    e.stopPropagation() // permet de ne pas lancer les évenements au click de l'élément parent (page) qui a aussi un evenement onClick qui lui est propre

    setSelectedElementType("texte")

    setTextes((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )

    setPagesOfScenarioSelected((prevStates) =>
      prevStates.map((item) => ({ ...item, styleSelected: false }))
    )

    setImages((prevState) =>
      prevState.map((item) => ({ ...item, selected: false }))
    )
  }

  const handleClickElementImage = (id, e) => {
    // quand on clique sur un texte
    e.stopPropagation() // permet de ne pas lancer les évenements au click de l'élément parent (page) qui a aussi un evenement onClick qui lui est propre

    setSelectedElementType("image")

    setImages((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )

    setPagesOfScenarioSelected((prevStates) =>
      prevStates.map((item) => ({ ...item, styleSelected: false }))
    )

    setTextes((prevState) =>
      prevState.map((item) => ({ ...item, selected: false }))
    )
  }

  const handleClickElementPage = (id) => {
    // quand on clique sur une page
    setSelectedElementType("page")

    if (selectedElementType === "page") {
      setTextes((prevState) =>
        prevState.map((item) => ({ ...item, selected: false }))
      )

      setPagesOfScenarioSelected((prevState) =>
        prevState.map((item) =>
          item.id === id
            ? { ...item, styleSelected: true }
            : { ...item, styleSelected: false }
        )
      )

      setImages((prevState) =>
        prevState.map((item) => ({ ...item, selected: false }))
      )
    }
  }

  // enregistrement du texte des textearea lors de leur modification
  const handleChangeTexte = (id, newText) => {
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

      handleClickElementTexte()
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

  // application d'un style sauvegardé à la page sélectionnée
  const handleClickApplyPageStyle = (styleToApply) => {
    setPagesOfScenarioSelected((prevState) =>
      prevState.map((item) =>
        item.selected === true
          ? {
              ...item,
              style: styleToApply,
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

  const handleClickNextStylesPage = () => {
    if (indexAfficheStylePage.max < savedPageStyles.length - 1) {
      setIndexAfficheStylePage((prevState) => ({
        min: prevState.min + 2,
        max: prevState.max + 2,
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

  const handleClickPreviousStylesPage = () => {
    if (indexAfficheStylePage.min > 0) {
      if (indexAfficheStylePage.min - 2 < 0) {
        setIndexAfficheStylePage((prevState) => ({
          min: 0,
          max: 1,
        }))
      } else {
        setIndexAfficheStylePage((prevState) => ({
          min: prevState.min - 2,
          max: prevState.max - 2,
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

  const handleContextMenuStylePage = (event, index) => {
    event.preventDefault()
    setSavedPageStyles((prevState) => {
      const newState = [...prevState]
      newState[index] = { ...newState[index], showDelete: true }
      return newState
    })
  }

  const handleLeaveContextMenuStyleText = (index) => {
    setSavedTextStyles((prevState) => {
      const newState = [...prevState]
      newState[index] = { ...newState[index], showDelete: false }
      return newState
    })
  }

  const handleLeaveContextMenuStylePage = (index) => {
    setSavedPageStyles((prevState) => {
      const newState = [...prevState]
      newState[index] = { ...newState[index], showDelete: false }
      return newState
    })
  }

  const handleDeleteStyleText = (index) => {
    const styleID = savedTextStyles[index].id

    axios
      .delete(`http://localhost:4242/saved_style_text/${styleID}`)
      .then(() => {
        axios
          .get(`http://localhost:4242/saved_style_text/utilisateur/${user.id}`)
          .then(({ data }) => setSavedTextStyles(data))
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
    // setSavedTextStyles((prevState) => prevState.filter((_, i) => i !== index))
  }

  const handleDeleteStylePage = (index) => {
    const styleID = savedPageStyles[index].id

    axios
      .delete(`http://localhost:4242/saved_style_page/${styleID}`)
      .then(() => {
        axios
          .get(`http://localhost:4242/saved_style_page/utilisateur/${user.id}`)
          .then(({ data }) => setSavedPageStyles(data))
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
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

    // On récupère l'id de l'élément sélectionné et le type (texte ou image) puis on le supprime de la base de donnée
    // let typeSelected
    let idSelected
    const selectedText = textes.filter((texte) => texte.selected === true)[0]
    const selectedImage = images.filter((image) => image.selected === true)[0]

    if (selectedText) {
      // typeSelected = "texte"
      idSelected = selectedText.id
      setTextes((prevState) => prevState.filter((text) => !text.selected))

      axios
        .delete(`http://localhost:4242/styleText/texte/${idSelected}`)
        .then(() => {
          axios
            .delete(`http://localhost:4242/textes/${idSelected}`)
            .catch((err) => {
              console.error(err)
            })
        })
        .catch((err) => {
          console.error(
            err,
            `impossible de supprimer le style du texte d'ID ${idSelected}`
          )
        })
    } else if (selectedImage) {
      // typeSelected = "image"
      idSelected = selectedImage.id
      setImages((prevState) => prevState.filter((text) => !text.selected))

      setDeletedImages((prevState) => {
        const newState = [...prevState]
        newState.push(selectedImage)
        return newState
      })
      // AJOUTER AXIOS DELETE IMAGE -->
      // --> NON : on supprime de la BDD à la sauvegarde car il y a l'image qui doit rester enregistree dans le serveur
    }
  }
  // ----FIN SECTION--------------------------------------------------

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR OUVRIR ou AJOUTER / CREER UN NOUVEAU SCENARIO----
  // ---------------------------------------------------------------------------
  const handleClickNouveauScenario = () => {
    // const scenarioName = prompt("Entrez un nom pour votre scénario")
  }

  const handleClickOpen = () => {
    setShowMenuOpen(!showMenuOpen)
    // console.log("scenariosOfEditedCampagne", scenariosOfEditedCampagne);
  }

  const handleLeaveOpen = () => {
    setShowMenuOpen(false)
  }

  const handleClickOpenCampagne = (idCampagne) => {
    // on sauvegarde la page (textes et images) avant de la quitter
    handleSave()
    // on efface l'historique car on ne veut pas pouvoir récupérer dans la nouvelle page les textes et images de la page précédante
    setPageHistory([])
    setPageFuture([])

    setShowMenuOpen(false)
    const newEditedCampagne = campagnesUtilisateur.filter(
      (campagne) => campagne.id === idCampagne
    )[0]
    setEditedCampagne(newEditedCampagne)

    axios
      .get(`http://localhost:4242/campagnes/${idCampagne}/scenarios`) // on va chercher les scénarios liés à la campagne et on se place sur le 1er
      .then(({ data }) => {
        data[0].selected = true // on ajoute un champ selected à true pour que le 1er scenario soit sélectionné par défaut
        setScenariosOfEditedCampagne(data)
        return data // on va s'en servir pour récupérer les pages associées au scenario sélectionné
      })
      .then((scenarios) => {
        const idScenarioSelected = scenarios.filter(
          (item) => item.selected === true
        )[0].id

        axios
          .get(`http://localhost:4242/scenarios/${idScenarioSelected}/pages`) // on va chercher les pages du scénario sélectionné et on se place sur la première
          .then(({ data }) => {
            data[0].selected = true
            setPagesOfScenarioSelected(data)
            return data
          })
          .then((pages) => {
            const idPageSelected = pages.filter(
              (item) => item.selected === true
            )[0].id

            axios
              .get(`http://localhost:4242/pages/${idPageSelected}/textes`) // on va chercher les textes de la page sélectionnée
              .then(({ data }) => {
                setTextes(data)
              })
          })
      })
  }

  // ----FIN SECTION--------------------------------------------------

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR GERER L'ANNULATION ET LE RETABLISSEMENT DES ACTIONS DANS LA PAGE----
  // ---------------------------------------------------------------------------

  // Fonction pour gérer l'annulation
  const handleClickUndo = () => {
    // console.log("pageHistory", pageHistory)
    if (pageHistory.length > 0) {
      const prevStates = pageHistory.pop()
      setPageHistory(pageHistory)
      setPageFuture([{ textes, images }, ...pageFuture])
      setTextes(prevStates.textes)
      setImages(prevStates.images)
      setDeletedImages((previousState) => {
        // deletedImages ne doit contenir aucune des images présentes dans images
        const newState = previousState.filter(
          (image) =>
            !prevStates.images.some((prevImage) => prevImage.id === image.id)
        )
        return newState
      })
    }
  }

  // Fonction pour gérer le rétablissement
  const handleClickRedo = () => {
    // console.log("pageFuture", pageFuture)
    if (pageFuture.length > 0) {
      const nextStates = pageFuture.shift()
      setPageFuture(pageFuture)
      setPageHistory([...pageHistory, { textes, images }])
      setTextes(nextStates.textes)
      setImages(nextStates.images)
      const newPageHistory = [...pageHistory, { textes, images }]
      setDeletedImages((previousState) => {
        // deletedImages ne doit contenir aucune des images présentes dans images
        if (nextStates.images[0]) {
          const intermediaireState = [
            ...newPageHistory[newPageHistory.length - 1].images,
          ]
          const newState = [
            ...previousState,
            intermediaireState[intermediaireState.length - 1],
          ]
          return newState
        } else {
          return previousState
        }
      })
    }
  }

  // ----FIN SECTION--------------------------------------------------

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR SAUVEGARDER L'ETAT DES TEXTES ET DES STYLES DE LA PAGE----
  // ---------------------------------------------------------------------------
  const handleSave = () => {
    // sauvegarde des modifications des textes
    textes.map((texte) => {
      axios
        .put(`http://localhost:4242/textes/${texte.id}`, {
          pages_id: texte.pages_id,
          text: texte.text,
        })
        .catch(() => {
          // si l'id du texte n'existe pas dans la base de donnée c'est que le texte a d'abord été supprimé puis il est revenu par un undo
          // dans ce cas il faut le recréer dans la base de donnée
          const idPageSelected = pagesOfScenarioSelected.filter(
            (item) => item.selected === true
          )[0].id

          axios.post(
            `http://localhost:4242/pages/${idPageSelected}/ancientexte`,
            {
              page_textes_id: texte.page_textes_id,
              data: texte.text,
              width: texte.style.width,
              height: texte.style.height,
              top: texte.style.top,
              sst_left: texte.style.left,
              z_index: texte.style.zIndex,
              border_style: texte.style.borderStyle,
              border_color: texte.style.borderColor,
              border_width: texte.style.borderWidth,
              border_radius: texte.style.borderRadius,
              box_shadow: texte.style.boxShadow,
              background_color: texte.style.backgroundColor,
              font_size: texte.style.fontSize,
              font_style: texte.style.fontStyle,
              font_weight: texte.style.fontWeight,
              font_family: texte.style.fontFamily,
              color: texte.style.color,
              padding: texte.style.padding,
              back_drop_filter: texte.style.backdropFilter,
              text_decoration: texte.style.textDecoration,
              text_align: texte.style.textAlign,
            }
          )
        })

      // sauvegarde des styles de textes dans la bdd
      axios.put(`http://localhost:4242/styleText/texte/${texte.id}`, {
        page_textes_id: texte.page_textes_id,
        width: texte.style.width,
        height: texte.style.height,
        top: texte.style.top,
        sst_left: texte.style.left,
        z_index: texte.style.zIndex,
        border_style: texte.style.borderStyle,
        border_color: texte.style.borderColor,
        border_width: texte.style.borderWidth,
        border_radius: texte.style.borderRadius,
        box_shadow: texte.style.boxShadow,
        background_color: texte.style.backgroundColor,
        font_size: texte.style.fontSize,
        font_style: texte.style.fontStyle,
        font_weight: texte.style.fontWeight,
        font_family: texte.style.fontFamily,
        color: texte.style.color,
        padding: texte.style.padding,
        back_drop_filter: texte.style.backdropFilter,
        text_decoration: texte.style.textDecoration,
        text_align: texte.style.textAlign,
      })

      return null
    })

    // suppression dans la bdd des images qui ont été supprimées
    deletedImages.map((image) =>
      axios.delete(`http://localhost:4242/images/${image.id}`, {
        data: {
          img_src: image.img_src,
        },
      })
    )

    // sauvegarde des styles des images
    images.map((image) =>
      axios.put(`http://localhost:4242/styleImage/image/${image.id}`, {
        width: image.style.width,
        height: image.style.height,
        top: image.style.top,
        ssi_left: image.style.left,
        zIndex: image.style.zIndex,
        border_style: image.style.borderStyle,
        border_color: image.style.borderColor,
        border_width: image.style.borderWidth,
        border_radius: image.style.borderRadius,
        box_shadow: image.style.boxShadow,
        opacity: image.style.opacity,
        padding: image.style.padding,
      })
    )

    // on sauvegarde aussi le style de la page sélectionnée
    if (pagesOfScenarioSelected[0]) {
      const pageID = pagesOfScenarioSelected.filter(
        (page) => page.selected === true
      )[0].id
      const pageStyle = pagesOfScenarioSelected.filter(
        (page) => page.selected === true
      )[0].style

      axios.put(`http://localhost:4242/stylePage/page/${pageID}`, {
        pages_id: pageID,
        padding: pageStyle.padding,
        background_color: pageStyle.backgroundColor,
      })
    }
  }

  // ----FIN SECTION--------------------------------------------------

  // -------------------------------------------------------------------------------------
  // ------------FONCTIONS LIEES A L'IMPORTATION DES IMAGES-------------------------
  // ---------------------------------------------------------------------------

  const handleChangeFileImage = (event) => {
    const idPageSelected = pagesOfScenarioSelected.filter(
      (item) => item.selected === true
    )[0].id

    // console.log(idPageSelected)

    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("image", file)

    axios
      .post(`http://localhost:4242/pages/${idPageSelected}/newImage`, formData)
      .then(({ data }) => {
        const newImages = [...images, data]
        setImages(newImages)
      })
      .catch((error) => {
        console.error(error)
      })

    // fetch("/upload-image", {
    //   method: "POST",
    //   body: formData,
    // });
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

  // récupérarion des styles enregistrés de l'utilisateur à l'ouverture de la page
  useEffect(() => {
    if (user.id) {
      axios
        .get(`http://localhost:4242/saved_style_text/utilisateur/${user.id}`)
        .then(({ data }) => setSavedTextStyles(data))
        .catch((err) => console.error(err))

      axios
        .get(`http://localhost:4242/saved_style_page/utilisateur/${user.id}`)
        .then(({ data }) => setSavedPageStyles(data))
        .catch((err) => console.error(err))
    }
  }, [user])

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR la GESTION DES RACCOURCIS CLAVIER----
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // annulation avec la combinaison de touche ctrl + z

    const handleKeyDownEditor = (event) => {
      if (event.ctrlKey && event.key === "z") {
        // console.log("undo")
        handleClickUndo() // non appelé... pourquoi ?
      } else if (event.ctrlKey && event.key === "y") {
        // console.log("redo")
        handleClickRedo() // non appelé... pourquoi ?
      } else if (event.ctrlKey && event.key === "Delete") {
        // suppression avec la combinaison de touche ctrl + suppr
        // car la touche suppr seule doit pouvoir servir à supprimer du texte dans ma textarea
        handleClickDeleteElement()
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
      {/* <div className="fausse-navbar"></div> */}
      <Navbar />

      <section className="editor-bandeau-superieur">
        <div className="editor-bandeau-gauche">
          <img src={saveDisquette} alt="save" onClick={handleSave} />
          <button
            type="button"
            onClick={handleClickNouveauScenario}
            className="button-editor-bandeau-gauche"
          >
            Nouveau
          </button>
          <div className="div-menu-open">
            <button
              type="button"
              className="button-editor-bandeau-gauche"
              onClick={handleClickOpen}
            >
              Ouvrir
            </button>
            <div className="menu-open" onMouseLeave={handleLeaveOpen}>
              {showMenuOpen &&
                campagnesUtilisateur.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleClickOpenCampagne(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          </div>
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

            <input
              type="file"
              id="file-input"
              className="button-import-image"
              onChange={handleChangeFileImage}
            />
            <label htmlFor="file-input" className="button-import-image-label">
              {" "}
            </label>
            {/* <img
              src={addImg}
              alt="new image"
              onClick={() => {}}
              title="Importer une image"
            /> */}
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
              {/* ////////////////////////////// */}
              {savedPageStyles
                .filter(
                  (item, index) =>
                    index >= indexAfficheStylePage.min &&
                    index <= indexAfficheStylePage.max
                )
                .map((item, index) => (
                  <button
                    className="saved-style"
                    onClick={() => handleClickApplyPageStyle(item.styleCss)}
                    onContextMenu={(event) =>
                      handleContextMenuStylePage(event, index)
                    }
                    onMouseLeave={() => handleLeaveContextMenuStylePage(index)}
                    key={item.id}
                  >
                    {item.styleName}
                    {savedPageStyles[index].showDelete && (
                      <input
                        type="button"
                        className="button-suppression-style"
                        onClick={() => handleDeleteStylePage(index)}
                        onMouseLeave={() =>
                          handleLeaveContextMenuStylePage(index)
                        }
                        value="Supprimer"
                      />
                    )}
                  </button>
                ))}

              {/* //////////////////////////////////// */}
            </div>
          </section>

          <div className="arrowButton-container">
            <button
              className="arrowButton"
              onClick={handleClickPreviousStylesPage}
            >
              <div className="arrowButtonPrevious"></div>{" "}
            </button>
            <button className="arrowButton" onClick={handleClickNextStylesPage}>
              <div className="arrowButtonNext"></div>{" "}
            </button>
          </div>
        </div>
      </section>

      <main className="editor-main">
        <section className="sommaire-editeur">
          <div className="section-sommaire">
            <SommaireEditor
              editedCampagne={editedCampagne}
              setEditedCampagne={setEditedCampagne}
              scenariosOfEditedCampagne={scenariosOfEditedCampagne}
              setScenariosOfEditedCampagne={setScenariosOfEditedCampagne}
              pagesOfScenarioSelected={pagesOfScenarioSelected}
              setPagesOfScenarioSelected={setPagesOfScenarioSelected}
              textes={textes}
              setTextes={setTextes}
              images={images}
              setImages={setImages}
              setDeletedImages={setDeletedImages}
              handleSave={handleSave}
              setPageHistory={setPageHistory}
              setPageFuture={setPageFuture}
              user={user} // a SUPPRIMER probablement
              author={author} // a SUPPRIMER éventuellement, a voir
            />
          </div>

          <div className="configurator">
            {selectedElementType === "texte" ? (
              <EditorTextStyle
                textes={textes}
                setTextes={setTextes}
                savedTextStyles={savedTextStyles}
                setSavedTextStyles={setSavedTextStyles}
                user={user}
                pagesOfScenarioSelected={pagesOfScenarioSelected}
              />
            ) : selectedElementType === "page" ? (
              <EditorPageStyle
                pagesOfScenarioSelected={pagesOfScenarioSelected}
                setPagesOfScenarioSelected={setPagesOfScenarioSelected}
                setSavedPageStyles={setSavedPageStyles}
                user={user}
              />
            ) : null}
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
            handleClickElementTexte={handleClickElementTexte}
            handleClickElementImage={handleClickElementImage}
            handleMouseDown={handleMouseDown}
            setPageHistory={setPageHistory}
            images={images}
            setImages={setImages}
            editedCampagne={editedCampagne}
            selectedPage={
              pagesOfScenarioSelected.filter(
                (page) => page.selected === true
              )[0]
            }
          />
        </div>
      </main>
    </>
  )
}
