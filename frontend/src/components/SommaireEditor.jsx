import axios from "axios"
import { useState } from "react"
import nouvellePage from "../assets/images/nouvellePage.svg"
import dotsCircle from "../assets/images/dotsCircle.png"

export default function SommaireEditor(props) {
  const {
    editedCampagne,
    scenariosOfEditedCampagne,
    setScenariosOfEditedCampagne,
    pagesOfScenarioSelected,
    setPagesOfScenarioSelected,
    textes,
    setTextes,
    setDeletedImages,
    images,
    setImages,
    setSelectedElementType,
    handleSave,
    setPageHistory,
    setPageFuture,
    setShowEditScenario,
    setScenarioForInfoEdit,
    setShowEditCampaign,
    showEditCampaign,
  } = props

  //  console.log("scenariosOfEditedCampagne",scenariosOfEditedCampagne);
  //  console.log("editedCampagne",editedCampagne);

  const [showButtons, setShowButtons] = useState(false)

  // ----------------------------------------------------------------------
  // ----FONCTIONS NOUVELLES PAGES-------------------
  // ------------------------------------------------------------------

  // fonction permettant d'insérer facilement des textes avec des propriétés spécifiques

  const handleNewTextarea = async (
    pageID,
    width,
    height,
    left,
    top,
    placeholder,
    fontSize,
    fontWeight,
    textAlign,
    newTextes,
    pageName
  ) => {
    await axios.post(
      `http://localhost:4242/pages/${pageID}/newtexteAtPageCreation`,
      {
        top,
        left,
        width,
        height,
        fontSize,
        fontWeight,
        textAlign,
      }
    )

    const { data } = await axios.get(`http://localhost:4242/lasttexte`)
    data.placeHolder = placeholder
    if (pageName) {
      data.text = pageName
    }
    newTextes = [...newTextes, data]

    return newTextes
  }

  const handleClickNouvellePage = () => {
    setShowButtons(!showButtons)
  }

  const handleClickButtonScript = async () => {
    setShowButtons(false)
    handleSave()

    // on récupère l'id du scenario sélectionné
    const scenarioID = scenariosOfEditedCampagne.filter(
      (scenario) => scenario.selected === true
    )[0].id

    // on demande un nom pour la page
    const pageName = prompt(
      "Donnez un nom à votre page de type Script /n (Possibilité de le modifier à postériori)"
    )

    // on attribue un numéro de page (numéro de la dernière page + 1)
    const pageNumber =
      Math.max(...pagesOfScenarioSelected.map((page) => page.number)) + 1

    // on post une nouvelle page dans la base de donnée (page_type_id = 1 car page script)
    axios
      .post(`http://localhost:4242/pages`, {
        scenarios_id: scenarioID,
        page_types_id: 1,
        titre: pageName,
        number: pageNumber,
      })
      .then(() => {
        // on récupère la page de la base de donnée avec son id et on l'ajoute dans le state pagesOfScenarioSelected
        axios
          .get(`http://localhost:4242/scenarios/${scenarioID}/pages`)
          .then(async ({ data }) => {
            data[data.length - 1].selected = true // on se place sur la page créée en la sélectionnant
            setPagesOfScenarioSelected(data)

            // on crée maintenant des textes prédéfinis pour la nouvelle page
            const pageID = data[data.length - 1].id
            const newTextes = []

            const textareaTitre = await handleNewTextarea(
              pageID,
              "60%",
              "4%",
              "5%",
              "5%",
              "Entrez un titre",
              "2rem",
              700,
              "left",
              newTextes,
              pageName
            )
            const textareaParagraphe = await handleNewTextarea(
              pageID,
              "90%",
              "15%",
              "5%",
              "10%",
              "Tapez votre texte",
              "1.25rem",
              400,
              "justify",
              textareaTitre
            )

            setTextes(textareaParagraphe) // textes du template
            setPageHistory(textareaParagraphe) // idem
            setPageFuture(textareaParagraphe) // idem
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleClickButtonPersonnage = () => {
    setShowButtons(false)
    handleSave()

    // on récupère l'id du scenario sélectionné
    const scenarioID = scenariosOfEditedCampagne.filter(
      (scenario) => scenario.selected === true
    )[0].id

    // on demande un nom pour la page
    const pageName = prompt(
      "Donnez un nom à votre page de type Personnage /n (Possibilité de le modifier à postériori)"
    )

    // on attribue un numéro de page (numéro de la dernière page personnage + 1)
    const pagesPersonnages = pagesOfScenarioSelected.filter(
      (page) => page.page_types_id === 2
    )
    let pageNumber
    if (pagesPersonnages.length === 0) {
      pageNumber = 1
    } else {
      pageNumber = Math.max(...pagesPersonnages.map((page) => page.number)) + 1
    }

    // on crée un nouveau tableai contenant toutes les pages du scénario mais dans lequel on incrémente de 1 le numéro de page des pages qui ne sont pas personnage

    const newPagesOfScenarioSelected = pagesOfScenarioSelected.map((page) =>
      page.page_types_id === 2 ? page : { ...page, number: page.number + 1 }
    )

    // on modifie toutes les pages du scénario existant déjà dans la base de donnée pour leur attribuer leur nouveau numéro de page

    Promise.all(
      // on utilise Promise.all pour s'assurer que le axios.post et la suite se feront uniquement après l'exécution des axios.put
      newPagesOfScenarioSelected.map((page) =>
        axios
          .put(`http://localhost:4242/pages/${page.id}`, {
            scenarios_id: page.scenarios_id,
            page_types_id: page.page_types_id,
            titre: page.titre,
            number: page.number,
          })
          .catch((err) => console.error(err))
      )
    ).then(() => {
      // on post une nouvelle page dans la base de donnée (page_type_id = 2 car page personnage)
      axios
        .post(`http://localhost:4242/pages`, {
          scenarios_id: scenarioID,
          page_types_id: 2,
          titre: pageName,
          number: pageNumber,
        })
        .then(() => {
          // on récupère toutes les pages de la base de donnée pour le scenario sélectionné et on sélectionne la dernière page ajoutée à la BDD
          axios
            .get(`http://localhost:4242/scenarios/${scenarioID}/pages`)
            .then(async ({ data }) => {
              data[data.length - 1].selected = true // on se place sur la page créée en la sélectionnant
              setPagesOfScenarioSelected(data)

              // on crée maintenant des textes prédéfinis pour la nouvelle page
              const pageID = data[data.length - 1].id
              const newTextes = []

              const textareaTitre = await handleNewTextarea(
                pageID,
                "60%",
                "4%",
                "20%",
                "5%",
                "Entrez un titre",
                "2rem",
                700,
                "center",
                newTextes,
                pageName
              )
              const textareaParagraphe = await handleNewTextarea(
                pageID,
                "90%",
                "15%",
                "5%",
                "10%",
                "Tapez votre texte",
                "1.25rem",
                400,
                "justify",
                textareaTitre
              )

              setTextes(textareaParagraphe) // textes du template
              setPageHistory(textareaParagraphe) // idem
              setPageFuture(textareaParagraphe) // idem
            })
            .catch((err) => {
              console.error(err)
            })
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }

  const handleClickButtonObject = () => {
    setShowButtons(false)
    handleSave()

    // on récupère l'id du scenario sélectionné
    const scenarioID = scenariosOfEditedCampagne.filter(
      (scenario) => scenario.selected === true
    )[0].id

    // on demande un nom pour la page
    const pageName = prompt(
      "Donnez un nom à votre page de type Objet /n (Possibilité de le modifier à postériori)"
    )

    // on attribue un numéro de page (numéro de la dernière page objet + 1 ou, s'il n'y a pas de pageObjet, le numéro de la dernière page personnage + 1)
    const pagesPersonnages = pagesOfScenarioSelected.filter(
      (page) => page.page_types_id === 2
    )
    let lastPageNumberPersonnage
    if (pagesPersonnages.length === 0) {
      lastPageNumberPersonnage = 0
    } else {
      lastPageNumberPersonnage = Math.max(
        ...pagesPersonnages.map((page) => page.number)
      )
    }

    const pagesObjets = pagesOfScenarioSelected.filter(
      (page) => page.page_types_id === 3
    )
    let pageNumber
    if (pagesObjets.length === 0) {
      if (lastPageNumberPersonnage === 0) {
        pageNumber = 1
      } else {
        pageNumber = lastPageNumberPersonnage + 1
      }
    } else {
      pageNumber = Math.max(...pagesObjets.map((page) => page.number)) + 1
    }

    // on crée un nouveau tableau contenant toutes les pages du scénario mais dans lequel on incrémente de 1 le numéro de page des pages qui ne sont pas personnage ou des objets

    const newPagesOfScenarioSelected = pagesOfScenarioSelected.map((page) =>
      page.page_types_id === 2 || page.page_types_id === 3
        ? page
        : { ...page, number: page.number + 1 }
    )

    // on modifie toutes les pages du scénario existant déjà dans la base de donnée pour leur attribuer leur nouveau numéro de page

    Promise.all(
      // on utilise Promise.all pour s'assurer que le axios.post et la suite se feront uniquement après l'exécution des axios.put
      newPagesOfScenarioSelected.map((page) =>
        axios
          .put(`http://localhost:4242/pages/${page.id}`, {
            scenarios_id: page.scenarios_id,
            page_types_id: page.page_types_id,
            titre: page.titre,
            number: page.number,
          })
          .catch((err) => console.error(err))
      )
    ).then(() => {
      // on post une nouvelle page dans la base de donnée (page_type_id = 3 car page objet)
      axios
        .post(`http://localhost:4242/pages`, {
          scenarios_id: scenarioID,
          page_types_id: 3,
          titre: pageName,
          number: pageNumber,
        })
        .then(() => {
          // on récupère toutes les pages de la base de donnée pour le scenario sélectionné et on sélectionne la dernière page ajoutée à la BDD
          axios
            .get(`http://localhost:4242/scenarios/${scenarioID}/pages`)
            .then(async ({ data }) => {
              data[data.length - 1].selected = true // on se place sur la page créée en la sélectionnant
              setPagesOfScenarioSelected(data)

              // on crée maintenant des textes prédéfinis pour la nouvelle page
              const pageID = data[data.length - 1].id
              const newTextes = []

              const textareaTitre = await handleNewTextarea(
                pageID,
                "60%",
                "4%",
                "20%",
                "5%",
                "Entrez un titre",
                "2rem",
                700,
                "center",
                newTextes,
                pageName
              )
              const textareaParagraphe = await handleNewTextarea(
                pageID,
                "90%",
                "15%",
                "5%",
                "10%",
                "Tapez votre texte",
                "1.25rem",
                400,
                "justify",
                textareaTitre
              )

              setTextes(textareaParagraphe) // textes du template
              setPageHistory(textareaParagraphe) // idem
              setPageFuture(textareaParagraphe) // idem
            })
            .catch((err) => {
              console.error(err)
            })
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }

  const handleClickButtonLieu = () => {
    setShowButtons(false)
    handleSave()

    // on récupère l'id du scenario sélectionné
    const scenarioID = scenariosOfEditedCampagne.filter(
      (scenario) => scenario.selected === true
    )[0].id

    // on demande un nom pour la page
    const pageName = prompt(
      "Donnez un nom à votre page de type Lieu /n (Possibilité de le modifier à postériori)"
    )

    // on attribue un numéro de page (numéro de la dernière page lieu + 1 ou, s'il n'y a pas de page lieu, le numéro de la dernière page objet + 1 ou personnage + 1)
    const pagesPersonnages = pagesOfScenarioSelected.filter(
      (page) => page.page_types_id === 2
    )
    let lastPageNumberPersonnage
    if (pagesPersonnages.length === 0) {
      lastPageNumberPersonnage = 0
    } else {
      lastPageNumberPersonnage = Math.max(
        ...pagesPersonnages.map((page) => page.number)
      )
    }

    const pagesObjets = pagesOfScenarioSelected.filter(
      (page) => page.page_types_id === 3
    )
    let lastPageNumberObjet
    if (pagesObjets.length === 0) {
      if (lastPageNumberPersonnage === 0) {
        lastPageNumberObjet = 0
      } else {
        lastPageNumberObjet = lastPageNumberPersonnage
      }
    } else {
      lastPageNumberObjet = Math.max(...pagesObjets.map((page) => page.number))
    }

    const pagesLieux = pagesOfScenarioSelected.filter(
      (page) => page.page_types_id === 4
    )
    let pageNumber
    if (pagesLieux.length === 0) {
      if (lastPageNumberObjet === 0) {
        pageNumber = 1
      } else {
        pageNumber = lastPageNumberObjet + 1
      }
    } else {
      pageNumber = Math.max(...pagesLieux.map((page) => page.number)) + 1
    }

    // on crée un nouveau tableau contenant toutes les pages du scénario mais dans lequel on incrémente de 1 le numéro de page des pages qui ne sont pas personnage ou des objets ou des lieux (donc seulement des pages script)

    const newPagesOfScenarioSelected = pagesOfScenarioSelected.map((page) =>
      page.page_types_id !== 1 ? page : { ...page, number: page.number + 1 }
    )

    // on modifie toutes les pages du scénario existant déjà dans la base de donnée pour leur attribuer leur nouveau numéro de page

    Promise.all(
      // on utilise Promise.all pour s'assurer que le axios.post et la suite se feront uniquement après l'exécution des axios.put
      newPagesOfScenarioSelected.map((page) =>
        axios
          .put(`http://localhost:4242/pages/${page.id}`, {
            scenarios_id: page.scenarios_id,
            page_types_id: page.page_types_id,
            titre: page.titre,
            number: page.number,
          })
          .catch((err) => console.error(err))
      )
    ).then(() => {
      // on post une nouvelle page dans la base de donnée (page_type_id = 4 car page lieux)
      axios
        .post(`http://localhost:4242/pages`, {
          scenarios_id: scenarioID,
          page_types_id: 4,
          titre: pageName,
          number: pageNumber,
        })
        .then(() => {
          // on récupère toutes les pages de la base de donnée pour le scenario sélectionné et on sélectionne la dernière page ajoutée à la BDD
          axios
            .get(`http://localhost:4242/scenarios/${scenarioID}/pages`)
            .then(async ({ data }) => {
              data[data.length - 1].selected = true // on se place sur la page créée en la sélectionnant
              setPagesOfScenarioSelected(data)

              // on crée maintenant des textes prédéfinis pour la nouvelle page
              const pageID = data[data.length - 1].id
              const newTextes = []

              const textareaTitre = await handleNewTextarea(
                pageID,
                "60%",
                "4%",
                "20%",
                "5%",
                "Entrez un titre",
                "2rem",
                700,
                "center",
                newTextes,
                pageName
              )
              const textareaParagraphe = await handleNewTextarea(
                pageID,
                "90%",
                "15%",
                "5%",
                "10%",
                "Tapez votre texte",
                "1.25rem",
                400,
                "justify",
                textareaTitre
              )

              setTextes(textareaParagraphe) // textes du template
              setPageHistory(textareaParagraphe) // idem
              setPageFuture(textareaParagraphe) // idem
            })
            .catch((err) => {
              console.error(err)
            })
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }

  const handleLeaveSectionButtons = () => {
    setShowButtons(false)
  }
  // ----FIN SECTION-----------------------------------------------------

  const handleClickOpenFormEditCampaign = () => {
    setShowEditCampaign(!showEditCampaign)
  }

  // ----------------------------------------------------------------------
  // ----FONCTIONS SECTION SCENARIOS-------------------
  // ------------------------------------------------------------------

  const handleClickButtonEditInfoScenario = (scenarioID) => {
    axios
      .get(`http://localhost:4242/scenarios/${scenarioID}`)
      .then(({ data }) => setScenarioForInfoEdit(data))
      .then(() => setShowEditScenario((prevstate) => !prevstate))
  }

  const handleClickSelectScenario = (scenarioID) => {
    // on sauvegarde la page (textes et images) avant de la quitter
    handleSave()
    // on efface l'historique car on ne veut pas pouvoir récupérer dans la nouvelle page les textes et images de la page précédante
    setPageHistory([])
    setPageFuture([])
    // on remet à 0 deletedImages
    setDeletedImages([])
    // on n'affiche rien dans la partie d'édition de style
    setSelectedElementType("none")

    setScenariosOfEditedCampagne((prevstate) =>
      prevstate.map((scenario) =>
        scenario.id === scenarioID
          ? { ...scenario, selected: true }
          : { ...scenario, selected: false }
      )
    )

    axios
      .get(`http://localhost:4242/scenarios/${scenarioID}/pages`)
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
  }

  const handleClickSelectpage = (pageID) => {
    // on sauvegarde la page (textes et images) avant de la quitter
    handleSave()

    // on efface l'historique car on ne veut pas pouvoir récupérer dans la nouvelle page les textes et images de la page précédante
    setPageHistory([])
    setPageFuture([])
    // on remet à 0 deletedImages
    setDeletedImages([])
    // on n'affiche rien dans la partie d'édition de style
    setSelectedElementType("none")

    const newPagesOfScenarioSelected = pagesOfScenarioSelected.map((page) =>
      page.id === pageID
        ? { ...page, selected: true }
        : { ...page, selected: false }
    )

    setPagesOfScenarioSelected(newPagesOfScenarioSelected)

    const idPageSelected = newPagesOfScenarioSelected.filter(
      (item) => item.selected === true
    )[0].id

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
  }

  // ----FIN SECTION-----------------------------------------------------

  // ----------------------------------------------------------------------
  // ----FONCTIONS CLICK DROIT SUR PAGE-------------------
  // ------------------------------------------------------------------
  const handleContextMenuPage = (e, pageID) => {
    e.preventDefault()
    handleClickSelectpage(pageID)
    setPagesOfScenarioSelected((prevstate) =>
      prevstate.map((page) =>
        page.id !== pageID
          ? { ...page, showMenu: false }
          : { ...page, showMenu: true }
      )
    )
  }

  const handleLeaveContextMenuPage = () => {
    setPagesOfScenarioSelected((prevstate) =>
      prevstate.map((page) => ({ ...page, showMenu: false }))
    )
  }

  const handleClickPageRename = (pageID) => {
    setPagesOfScenarioSelected((prevstate) =>
      prevstate.map((page) =>
        page.id !== pageID
          ? { ...page, showRename: false }
          : { ...page, showRename: true, showMenu: false }
      )
    )
  }

  const handleChangePageTitle = (e, pageID) => {
    setPagesOfScenarioSelected((prevstate) =>
      prevstate.map((page) =>
        page.id === pageID ? { ...page, titre: e.target.value } : page
      )
    )
  }

  const handlePressEnterPageRename = (e, pageID) => {
    if (e.key === "Enter") {
      setPagesOfScenarioSelected((prevstate) =>
        prevstate.map((page) => ({ ...page, showRename: false }))
      )
    }

    const updatedPage = pagesOfScenarioSelected.filter(
      (page) => page.id === pageID
    )[0]

    axios.put(`http://localhost:4242/pages/${pageID}`, {
      scenarios_id: updatedPage.scenarios_id,
      page_types_id: updatedPage.page_types_id,
      titre: updatedPage.titre,
      number: updatedPage.number,
    })
  }

  const handleClickPageDelete = (pageID, pageNumber) => {
    if (pagesOfScenarioSelected.length === 1) {
      alert(
        "Vous ne pouvez pas supprimer de page lorque le scénario n'en contient qu'une seule."
      )
      return
    }

    if (
      confirm(
        "Voulez vous vraiment supprimer cette page ? \n Vous ne pourrez pas revenir en arrière."
      )
    ) {
      // on commence par supprimer tous les styles des textes de la page sélectionnée
      // puis on supprime les textes eux mêmes
      // on supprime ensuite le style de la page sélectionnée
      // et enfin on supprime la page sélectionnée
      // nécessite d'utiliser des fonctions asynchrones pour que celà se fasse dans le bon ordre
      Promise.all(
        images.map((image) =>
          axios.delete(`http://localhost:4242/images/${image.id}`, {
            data: {
              img_src: image.img_src,
            },
          })
        )
      )
        .then(() => {
          return Promise.all(
            textes.map((texte) =>
              axios
                .delete(`http://localhost:4242/styleText/texte/${texte.id}`)
                .then(() => {
                  return axios.delete(
                    `http://localhost:4242/textes/${texte.id}`
                  )
                })
            )
          )
        })
        .then(() => {
          // suppression du style correspondant à pageID
          axios
            .delete(`http://localhost:4242/stylePage/page/${pageID}`)
            .then(() => {
              // suppression de la page
              axios
                .delete(`http://localhost:4242/pages/${pageID}`)
                .catch((err) => {
                  console.error(err)
                })
            })
            .then(() => {
              // on récupère l'ensemble des pages du scénario et on les transfère dans le state pagesOfScenarioSelected
              const scenarioID = scenariosOfEditedCampagne.filter(
                (scenario) => scenario.selected === true
              )[0].id

              axios
                .get(`http://localhost:4242/scenarios/${scenarioID}/pages`)
                .then(({ data }) => {
                  data[data.length - 1].selected = true // on se place sur la page créée en la sélectionnant
                  setPagesOfScenarioSelected(data)
                  return data
                })
                .then((pages) => {
                  // on met à jour les textes de la page (A FAIRE : METTRE A JOUR EGALEMENT LES IMAGES)
                  const idPageSelected = pages.filter(
                    (item) => item.selected === true
                  )[0].id

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

                  // on met à jour les numéros de page sur la page web et dans la base de données
                  const newPagesOfScenarioSelected = pages.map((page) =>
                    page.number > pageNumber
                      ? { ...page, number: page.number - 1 }
                      : page
                  )

                  newPagesOfScenarioSelected
                    .filter((page) => page.id !== pageID)
                    .map((page) =>
                      axios
                        .put(`http://localhost:4242/pages/${page.id}`, {
                          scenarios_id: page.scenarios_id,
                          page_types_id: page.page_types_id,
                          titre: page.titre,
                          number: page.number,
                        })
                        .catch((err) => console.error(err))
                    )

                  const newPagesOfScenario = newPagesOfScenarioSelected.filter(
                    (page) => page.id !== pageID
                  )

                  setPagesOfScenarioSelected(newPagesOfScenario)
                })
                .catch((err) => console.error(err))
            })
            .catch((err) => {
              console.error(err)
            })
        })
    }
  }

  // ----FIN SECTION-----------------------------------------------------

  return (
    <main className="main-sommaire-editor">
      {editedCampagne.name && (
        <section
          className="section-boutons-nouvelle-page"
          onMouseLeave={handleLeaveSectionButtons}
        >
          <img
            src={nouvellePage}
            alt="Ajouter une nouvelle page"
            title="Ajouter une nouvelle page"
            onClick={handleClickNouvellePage}
          />
          {showButtons && (
            <div className="div-boutons-nouvelle-page">
              <button type="button" onClick={handleClickButtonScript}>
                Script
              </button>
              <button type="button" onClick={handleClickButtonPersonnage}>
                Personnage
              </button>
              <button type="button" onClick={handleClickButtonObject}>
                Objet
              </button>
              <button type="button" onClick={handleClickButtonLieu}>
                Lieu
              </button>
            </div>
          )}
        </section>
      )}

      <section className="container-campagne-scenario-page">
        {scenariosOfEditedCampagne[1] && (
          <section className="section-campagne">
            <h1>Campaign</h1>
            <div>
              <p>{editedCampagne.name}</p>
              <img
                src={dotsCircle}
                onClick={handleClickOpenFormEditCampaign}
                alt="Informations détaillées de la campagne"
                title="Informations détaillées de la campagne"
              />
            </div>
          </section>
        )}

        {scenariosOfEditedCampagne[0] && (
          <>
            <section className="section-scenarios">
              <h1>Scenarios</h1>
              {scenariosOfEditedCampagne.map((scenario) => (
                <div key={scenario.id}>
                  <p
                    onClick={() => handleClickSelectScenario(scenario.id)}
                    style={
                      scenario.selected
                        ? {
                            fontWeight: 900,
                            boxShadow: "0px 4px 6px 0px #ffbd59",
                          }
                        : { fontWeight: 400 }
                    }
                  >
                    {scenario.name}
                  </p>
                  <img
                    src={dotsCircle}
                    alt="Informations détaillées du scénario"
                    title="Informations détaillées du scénario"
                    onClick={() =>
                      handleClickButtonEditInfoScenario(scenario.id)
                    }
                  />
                </div>
              ))}
            </section>

            <section className="section-pages">
              <h1>Pages</h1>
              {/* {pagesOfScenarioSelected.map((page) => (
                <div key={page.id}>
                  <p
                    onClick={() => handleClickSelectpage(page.id)}
                    style={
                      page.selected
                        ? { fontWeight: 900, textDecoration: "underline" }
                        : { fontWeight: 400 }
                    }
                  >
                    {page.titre}
                  </p>
                </div>
              ))} */}
              {pagesOfScenarioSelected.filter(
                (page) => page.page_types_id === 2
              ).length > 0 && (
                <>
                  <h2>Characters</h2>
                  {pagesOfScenarioSelected
                    .filter((page) => page.page_types_id === 2)
                    .sort((a, b) => a.number - b.number)
                    .map((page) => (
                      <div
                        key={page.id}
                        onMouseLeave={handleLeaveContextMenuPage}
                      >
                        {page.showRename ? (
                          <input
                            type="text"
                            value={page.titre}
                            onChange={(event) =>
                              handleChangePageTitle(event, page.id)
                            }
                            onKeyDown={(event) =>
                              handlePressEnterPageRename(event, page.id)
                            }
                          />
                        ) : (
                          <p
                            onClick={() => handleClickSelectpage(page.id)}
                            onContextMenu={(event) =>
                              handleContextMenuPage(event, page.id)
                            }
                            onDoubleClick={() => handleClickPageRename(page.id)}
                            style={
                              page.selected
                                ? {
                                    fontWeight: 900,
                                    boxShadow: "0px 4px 6px 0px #ffbd59",
                                  }
                                : { fontWeight: 400 }
                            }
                          >
                            {page.titre}
                          </p>
                        )}

                        {page.showMenu && (
                          <div className="container-menu-EditorPage">
                            <button
                              type="button"
                              onClick={() => handleClickPageRename(page.id)}
                            >
                              Rename
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleClickPageDelete(page.id, page.number)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}

              {pagesOfScenarioSelected.filter(
                (page) => page.page_types_id === 3
              ).length > 0 && (
                <>
                  <h2>Objects</h2>
                  {pagesOfScenarioSelected
                    .filter((page) => page.page_types_id === 3)
                    .sort((a, b) => a.number - b.number)
                    .map((page) => (
                      <div
                        key={page.id}
                        onMouseLeave={handleLeaveContextMenuPage}
                      >
                        {page.showRename ? (
                          <input
                            type="text"
                            value={page.titre}
                            onChange={(event) =>
                              handleChangePageTitle(event, page.id)
                            }
                            onKeyDown={(event) =>
                              handlePressEnterPageRename(event, page.id)
                            }
                          />
                        ) : (
                          <p
                            onClick={() => handleClickSelectpage(page.id)}
                            onContextMenu={(event) =>
                              handleContextMenuPage(event, page.id)
                            }
                            onDoubleClick={() => handleClickPageRename(page.id)}
                            style={
                              page.selected
                                ? {
                                    fontWeight: 900,
                                    boxShadow: "0px 4px 6px 0px #ffbd59",
                                  }
                                : { fontWeight: 400 }
                            }
                          >
                            {page.titre}
                          </p>
                        )}

                        {page.showMenu && (
                          <div className="container-menu-EditorPage">
                            <button
                              type="button"
                              onClick={() => handleClickPageRename(page.id)}
                            >
                              Rename
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleClickPageDelete(page.id, page.number)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}

              {pagesOfScenarioSelected.filter(
                (page) => page.page_types_id === 4
              ).length > 0 && (
                <>
                  <h2>Locations</h2>
                  {pagesOfScenarioSelected
                    .filter((page) => page.page_types_id === 4)
                    .sort((a, b) => a.number - b.number)
                    .map((page) => (
                      <div
                        key={page.id}
                        onMouseLeave={handleLeaveContextMenuPage}
                      >
                        {page.showRename ? (
                          <input
                            type="text"
                            value={page.titre}
                            onChange={(event) =>
                              handleChangePageTitle(event, page.id)
                            }
                            onKeyDown={(event) =>
                              handlePressEnterPageRename(event, page.id)
                            }
                          />
                        ) : (
                          <p
                            onClick={() => handleClickSelectpage(page.id)}
                            onContextMenu={(event) =>
                              handleContextMenuPage(event, page.id)
                            }
                            onDoubleClick={() => handleClickPageRename(page.id)}
                            style={
                              page.selected
                                ? {
                                    fontWeight: 900,
                                    boxShadow: "0px 4px 6px 0px #ffbd59",
                                  }
                                : { fontWeight: 400 }
                            }
                          >
                            {page.titre}
                          </p>
                        )}

                        {page.showMenu && (
                          <div className="container-menu-EditorPage">
                            <button
                              type="button"
                              onClick={() => handleClickPageRename(page.id)}
                            >
                              Rename
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleClickPageDelete(page.id, page.number)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}

              {pagesOfScenarioSelected.filter(
                (page) => page.page_types_id === 1
              ).length > 0 && (
                <>
                  <h2>Script</h2>
                  {pagesOfScenarioSelected
                    .filter((page) => page.page_types_id === 1)
                    .sort((a, b) => a.number - b.number)
                    .map((page) => (
                      <div
                        key={page.id}
                        onMouseLeave={handleLeaveContextMenuPage}
                      >
                        {page.showRename ? (
                          <input
                            type="text"
                            value={page.titre}
                            onChange={(event) =>
                              handleChangePageTitle(event, page.id)
                            }
                            onKeyDown={(event) =>
                              handlePressEnterPageRename(event, page.id)
                            }
                          />
                        ) : (
                          <p
                            onClick={() => handleClickSelectpage(page.id)}
                            onContextMenu={(event) =>
                              handleContextMenuPage(event, page.id)
                            }
                            onDoubleClick={() => handleClickPageRename(page.id)}
                            style={
                              page.selected
                                ? {
                                    fontWeight: 900,
                                    boxShadow: "0px 4px 6px 0px #ffbd59",
                                  }
                                : { fontWeight: 400 }
                            }
                          >
                            {page.titre}
                          </p>
                        )}

                        {page.showMenu && (
                          <div className="container-menu-EditorPage">
                            <button
                              type="button"
                              onClick={() => handleClickPageRename(page.id)}
                            >
                              Rename
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleClickPageDelete(page.id, page.number)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  )
}
