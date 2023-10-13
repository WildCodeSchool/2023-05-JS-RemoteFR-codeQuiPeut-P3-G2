import axios from "axios"
import myApi from "../services/myAPI"
import { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router"
import MyContext from "../components/MyContext"
import EditorPage from "../components/EditorPage"
import saveDisquette from "../assets/images/saveDisquette.svg"
import addText from "../assets/images/addText.svg"
// import addImg from "../assets/images/addImg.svg"
import undo from "../assets/images/undo.png"
import redo from "../assets/images/redo.png"
import iconChat from "../assets/images/icon_chat.png"
import iconSupprimer from "../assets/images/iconSupprimer.svg"
import EditorTextStyle from "../components/EditorTextStyle"
import EditorPageStyle from "../components/EditorPageStyle"
import EditorImageStyle from "../components/EditorImageStyle"
// import SommaireEditor from "../components/SommaireEditor"
import SommaireCollaboration from "../components/SommaireCollaboration"
import Navbar from "../components/Navbar"
import ChatBox from "../components/ChatBox"

export default function EditorCollaboration() {
  const location = useLocation()
  const campagneImportedID = location.state
  let scenariosOfEditedCampagne = location.state.scenario
  scenariosOfEditedCampagne = { ...scenariosOfEditedCampagne, selected: true }
  const { user, paperPrint, setPaperPrint } = useContext(MyContext)

  const [author, setAuthor] = useState({
    id: scenariosOfEditedCampagne.auteurId,
  }) // (id, authorName)
  const [campagnesUtilisateur, setCampagnesUtilisateur] = useState([]) // (id, campagneName)
  const [editedCampagne, setEditedCampagne] = useState({
    name: scenariosOfEditedCampagne.campagnes_name,
  })
  //   const [scenariosOfEditedCampagne, setScenariosOfEditedCampagne] = useState([])
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [scenarioForInfoEdit, setScenarioForInfoEdit] = useState({})
  const [pagesOfScenarioSelected, setPagesOfScenarioSelected] = useState([])
  const [selectedElementType, setSelectedElementType] = useState("none")
  const [showMenuOpen, setShowMenuOpen] = useState(false)
  const [deletedImages, setDeletedImages] = useState([])
  const [mounted, setMounted] = useState(false)
  const [pageWidth, setPageWidth] = useState()
  const [pageHeight, setPageHeight] = useState()
  const [pageOffsetX, setPageOffsetX] = useState()
  const [pageOffsetY, setPageOffsetY] = useState()
  const [offsets, setOffsets] = useState({ offsetX: 0, offsetY: 0 })
  const [addNewText, setAddNewText] = useState(false)
  const [textes, setTextes] = useState([])
  const [images, setImages] = useState([])
  const [pageHistory, setPageHistory] = useState([]) // pour pouvoir faire un undo
  const [pageFuture, setPageFuture] = useState([]) // pour pouvoir faire un redo
  const [savedTextStyles, setSavedTextStyles] = useState([])
  const [savedImageStyles, setSavedImageStyles] = useState([])
  const [savedPageStyles, setSavedPageStyles] = useState([])
  const [showNewScenario, setShowNewScenario] = useState(false)
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [showEditScenario, setShowEditScenario] = useState(false)
  const [showEditCampaign, setShowEditCampaign] = useState(false)
  const [showMenuButtonNew, setShowMenuButtonNew] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [indexAfficheStyleText, setIndexAfficheStyleText] = useState({
    min: 0,
    max: 2,
  })
  const [indexAfficheStylePage, setIndexAfficheStylePage] = useState({
    min: 0,
    max: 1,
  })
  const [indexAfficheStyleImage, setIndexAfficheStyleImage] = useState({
    min: 0,
    max: 1,
  })

  const maPage = document.querySelector(".section-page")

  // récupération de l'utilisateur ... A SUPPRIMER PLUS TARD
  // puis de l'auteur (pas à supprimer)
  // puis de ses campagnes

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:4242/auteurs/user/${user.id}`)
  //       .then(({ data }) => {
  //         setAuthor(data)
  //         return data
  //       })
  //       .then((author) => {
  //         axios
  //           .get(`http://localhost:4242/auteurs/${author.id}/campagnes`) // A MODIFIER - NE FONCTIONNE PAS ?? (sur de ça ? a verifier)
  //           .then(({ data }) => setCampagnesUtilisateur(data))
  //           .catch((err) => console.error(err))
  //       })
  //       .catch((err) => console.error(err))
  //   }, [])

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
    handleClickElementTexte(id, event)

    // prise en compte de la position de ma souris pour la dépose de mon élément
    setOffsets({
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
    })

    // setTextes((prevState) =>
    //   prevState.map((item) =>
    //     item.id === id
    //       ? { ...item, selected: true }
    //       : { ...item, selected: false }
    //   )
    // )
  }

  const handleDragStartImage = (event, id) => {
    handleClickElementImage(id, event)

    // prise en compte de la position de ma souris pour la dépose de mon élément
    setOffsets({
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
    })

    // setImages((prevState) =>
    //   prevState.map((item) =>
    //     item.id === id
    //       ? { ...item, selected: true }
    //       : { ...item, selected: false }
    //   )
    // )
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    // console.log("pageOffsetX", pageOffsetX)

    const newTop =
      100 * ((event.pageY - pageOffsetY - offsets.offsetY) / pageHeight) + "%"

    // const newLeft = event.pageX;
    const newLeft =
      100 * ((event.pageX - pageOffsetX - offsets.offsetX) / pageWidth) + "%"
    // console.log("newTop", newTop, "newLeft", newLeft)

    const selectedText = textes.filter((texte) => texte.selected === true)[0]
    const selectedImage = images.filter((image) => image.selected === true)[0]

    if (selectedText) {
      setTextes((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, top: newTop, left: newLeft } }
            : item
        )
      )
    } else if (selectedImage) {
      setImages((prevState) =>
        prevState.map((item) =>
          item.selected === true
            ? { ...item, style: { ...item.style, top: newTop, left: newLeft } }
            : item
        )
      )
    }
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
    // console.log(textes[0]);
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

  // application d'un style sauvegardé à l'image sélectionnée
  const handleClickApplyImageStyle = (styleToApply) => {
    setImages((prevState) =>
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

  const handleClickNextStylesImage = () => {
    if (indexAfficheStyleImage.max < savedImageStyles.length - 1) {
      setIndexAfficheStyleImage((prevState) => ({
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

  const handleClickPreviousStylesImage = () => {
    if (indexAfficheStyleImage.min > 0) {
      if (indexAfficheStyleImage.min - 2 < 0) {
        setIndexAfficheStyleImage((prevState) => ({
          min: 0,
          max: 1,
        }))
      } else {
        setIndexAfficheStyleImage((prevState) => ({
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

  const handleContextMenuStyleImage = (event, index) => {
    event.preventDefault()
    setSavedImageStyles((prevState) => {
      const newState = [...prevState]
      newState[index] = { ...newState[index], showDelete: true }
      return newState
    })

    setImages((prevState) =>
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

  const handleLeaveContextMenuStyleImage = (index) => {
    setSavedImageStyles((prevState) => {
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

  const handleDeleteStyleImage = (index) => {
    const styleID = savedImageStyles[index].id

    axios
      .delete(`http://localhost:4242/saved_style_image/${styleID}`)
      .then(() => {
        axios
          .get(`http://localhost:4242/saved_style_image/utilisateur/${user.id}`)
          .then(({ data }) => setSavedImageStyles(data))
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
        .get(`http://localhost:4242/saved_style_image/utilisateur/${user.id}`)
        .then(({ data }) => setSavedImageStyles(data))
        .catch((err) => console.error(err))

      axios
        .get(`http://localhost:4242/saved_style_page/utilisateur/${user.id}`)
        .then(({ data }) => setSavedPageStyles(data))
        .catch((err) => console.error(err))
    }
  }, [user])

  // fonction pour ouverture d'une campagne si ouverture du mode création via une CardCreation du profil
  //   useEffect(() => {
  //     if (mounted && campagneImportedID !== null) {
  //       axios
  //         .get(`http://localhost:4242/auteurs/user/${user.id}`)
  //         .then(({ data }) => {
  //           setAuthor(data)
  //           return data
  //         })
  //         .then((author) => {
  //           axios
  //             .get(`http://localhost:4242/auteurs/${author.id}/campagnes`) // A MODIFIER - NE FONCTIONNE PAS ?? (sur de ça ? a verifier)
  //             .then(({ data }) => {
  //               setCampagnesUtilisateur(data)
  //               return data
  //             })
  //             .then((importedCampagnesUtilisateur) => {
  //               handleClickOpenCampagne(
  //                 campagneImportedID,
  //                 importedCampagnesUtilisateur
  //               )
  //             })
  //             .catch((err) => console.error(err))
  //         })
  //         .catch((err) => console.error(err))
  //     }
  //   }, [mounted])

  // ----------------------------------------------------------------------------
  // ------FONCTIONS POUR la GESTION DES RACCOURCIS CLAVIER----
  // ---------------------------------------------------------------------------

  const handleCopy = () => {
    const selectedText = textes.find((texte) => texte.selected === true)
    const selectedImage = images.find((image) => image.selected === true)
    const selectedElement = selectedText || selectedImage || {}
    setPaperPrint(selectedElement)
  }

  const handlePaste = () => {
    const pageSelected = pagesOfScenarioSelected.find(
      (page) => page.selected === true
    )
    const selectedText = textes.find((texte) => texte.selected === true)

    if (pageSelected && !selectedText) {
      if (paperPrint.placeHolder) {
        axios
          .post(
            `http://localhost:4242/pages/${pageSelected.id}/texteCopy`,
            paperPrint
          )
          .then(() => {
            axios
              .get(`http://localhost:4242/lasttexte`) // on va chercher les textes de la page sélectionnée
              .then(({ data }) => {
                const newTextes = [...textes, data]
                setTextes(newTextes)
              })
          })
          .catch(function (error) {
            console.error(error)
          })
      } else if (paperPrint.img_src) {
        // axios pour poster image avec style

        axios
          .post(
            `http://localhost:4242/pages/${pageSelected.id}/imageCopy`,
            paperPrint
          )
          .then(({ data }) => {
            const newImages = [...images, data]
            setImages(newImages)
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }

  useEffect(() => {
    // annulation avec la combinaison de touche ctrl + z

    const handleKeyDownEditor = (event) => {
      if (
        (event.ctrlKey && event.key === "z") ||
        (event.metaKey && event.key === "z")
      ) {
        // console.log("undo")
        handleClickUndo() // non appelé... pourquoi ?
      } else if (
        (event.ctrlKey && event.key === "c") ||
        (event.metaKey && event.key === "c")
      ) {
        handleCopy()
      } else if (
        (event.ctrlKey && event.key === "v") ||
        (event.metaKey && event.key === "v")
      ) {
        handlePaste()
      } else if (
        (event.ctrlKey && event.key === "y") ||
        (event.metaKey && event.key === "y")
      ) {
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
  }, [textes, images, pagesOfScenarioSelected, paperPrint])
  // ----FIN SECTION--------------------------------------------------

  useEffect(() => {
    if (scenariosOfEditedCampagne) {
      setSelectedScenario(scenariosOfEditedCampagne)
    } else {
      setSelectedScenario(null)
    }
  }, [])

  // récupération des pages, des textes et des images à l'ouverture
  useEffect(() => {
    axios
      .get(
        `http://localhost:4242/scenarios/${scenariosOfEditedCampagne.id}/pages`
      )
      .then(({ data }) => {
        data[0].selected = true
        setPagesOfScenarioSelected(data)
        return data
      })
      .then((pages) => {
        const idPageSelected = pages.filter((item) => item.selected === true)[0]
          .id

        axios
          .get(`http://localhost:4242/pages/${idPageSelected}/textes`) // on va chercher les textes de la page sélectionnée
          .then(({ data }) => {
            setTextes(data)
          })
          .catch(() => {
            // permet de jouer setTextes([]) s'il n'y a pas de données dans la BDD
            setTextes([])
          })

        axios
          .get(`http://localhost:4242/pages/${idPageSelected}/images`) // on va chercher les images de la page sélectionnée
          .then(({ data }) => {
            setImages(data)
          })
          .catch(() => {
            // permet de jouer setImages([]) s'il n'y a pas de données dans la BDD
            setImages([])
          })
      })
  }, [])

  return (
    <>
      <div className="fausse-navbar">
        <Navbar />
      </div>

      <section className="editor-bandeau-superieur">
        <div className="editor-bandeau-gauche">
          <img
            src={saveDisquette}
            alt="save"
            onClick={handleSave}
            className="cursorHover"
          />

          <div className="div-menu-open">
            <button
              type="button"
              onClick={() => alert("Not available in collaboration mode")}
              className="button-editor-bandeau-gauche cursorHover"
            >
              New
            </button>
          </div>

          <div className="div-menu-open">
            <button
              type="button"
              className="button-editor-bandeau-gauche cursorHover"
              onClick={() => alert("Not available in collaboration mode")}
            >
              Open
            </button>
          </div>
          <img
            src={undo}
            alt="annuler"
            onClick={handleClickUndo}
            className="cursorHover"
            title="Annuler suppression d'élément (ctrl + z)"
          />
          <img
            src={redo}
            alt="Rétablir"
            className="cursorHover"
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
              className="cursorHover"
              title="Ajouter une zone de texte"
            />

            <input
              type="file"
              id="file-input"
              className="button-import-image"
              onChange={handleChangeFileImage}
            />
            <label
              htmlFor="file-input"
              className="button-import-image-label cursorHover"
            >
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
              className="cursorHover"
              onClick={handleClickDeleteElement}
              title="Supprimer l'élement sélectionné (ctrl + suppr)"
            />
          </div>

          <section className="container-saved-styles-text">
            <div className="saved-styles-text">
              <p>Text styles</p>
              <div className="saved-styles-container">
                {savedTextStyles
                  .filter(
                    (item, index) =>
                      index >= indexAfficheStyleText.min &&
                      index <= indexAfficheStyleText.max
                  )
                  .map((item, index) => (
                    <button
                      className="saved-style cursorHover"
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
                          className="button-suppression-style cursorHover"
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
                className="arrowButton cursorHover"
                onClick={handleClickPreviousStylesText}
              >
                <div className="arrowButtonPrevious"></div>{" "}
              </button>
              <button
                className="arrowButton cursorHover"
                onClick={handleClickNextStylesText}
              >
                <div className="arrowButtonNext"></div>{" "}
              </button>
            </div>
          </section>

          <section className="container-saved-styles-image">
            <div className="saved-styles-images">
              <p>Image styles</p>
              <div className="saved-styles-container">
                {/*  */}

                {savedImageStyles
                  .filter(
                    (item, index) =>
                      index >= indexAfficheStyleImage.min &&
                      index <= indexAfficheStyleImage.max
                  )
                  .map((item, index) => (
                    <button
                      className="saved-style cursorHover"
                      onClick={() => handleClickApplyImageStyle(item.styleCss)}
                      onContextMenu={(event) =>
                        handleContextMenuStyleImage(event, index)
                      }
                      onMouseLeave={() =>
                        handleLeaveContextMenuStyleImage(index)
                      }
                      key={item.id}
                    >
                      {item.styleName}
                      {savedImageStyles[index].showDelete && (
                        <input
                          type="button"
                          className="button-suppression-style cursorHover"
                          onClick={() => handleDeleteStyleImage(index)}
                          onMouseLeave={() =>
                            handleLeaveContextMenuStyleImage(index)
                          }
                          value="Supprimer"
                        />
                      )}
                    </button>
                  ))}

                {/*  */}
              </div>
            </div>

            <div className="arrowButton-container">
              <button
                className="arrowButton cursorHover"
                onClick={handleClickPreviousStylesImage}
              >
                <div className="arrowButtonPrevious"></div>{" "}
              </button>
              <button
                className="arrowButton cursorHover"
                onClick={handleClickNextStylesImage}
              >
                <div className="arrowButtonNext"></div>{" "}
              </button>
            </div>
          </section>
        </div>

        <div className="editor-bandeau-droite">
          <section className="container-pages-saved-styles">
            <p>Page styles</p>
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
                    className="saved-style cursorHover"
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
                        className="button-suppression-style cursorHover"
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
              className="arrowButton cursorHover"
              onClick={handleClickPreviousStylesPage}
            >
              <div className="arrowButtonPrevious"></div>{" "}
            </button>
            <button
              className="arrowButton cursorHover"
              onClick={handleClickNextStylesPage}
            >
              <div className="arrowButtonNext"></div>{" "}
            </button>
          </div>
        </div>
      </section>

      <main className="editor-main">
        <section className="sommaire-editeur">
          <div className="section-sommaire">
            <SommaireCollaboration
              editedCampagne={editedCampagne}
              setEditedCampagne={setEditedCampagne}
              setShowEditCampaign={setShowEditCampaign}
              showEditCampaign={showEditCampaign}
              scenariosOfEditedCampagne={[scenariosOfEditedCampagne]}
              //   setScenariosOfEditedCampagne={setScenariosOfEditedCampagne}
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
              setSelectedElementType={setSelectedElementType}
              setShowEditScenario={setShowEditScenario}
              setScenarioForInfoEdit={setScenarioForInfoEdit}
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
            ) : selectedElementType === "image" ? (
              <EditorImageStyle
                images={images}
                setImages={setImages}
                savedImageStyles={savedImageStyles}
                setSavedImageStyles={setSavedImageStyles}
                user={user}
                pagesOfScenarioSelected={pagesOfScenarioSelected}
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
            handleDragStartImage={handleDragStartImage}
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

        {showChat ? (
          <ChatBox
            setShowChat={setShowChat}
            scenario={scenariosOfEditedCampagne}
          />
        ) : (
          selectedScenario !== null && (
            <img
              src={iconChat}
              alt="open the chat"
              className="cursorHover icon-chat"
              title="Click to chat"
              onClick={() => setShowChat(true)}
            />
          )
        )}
      </main>
    </>
  )
}
