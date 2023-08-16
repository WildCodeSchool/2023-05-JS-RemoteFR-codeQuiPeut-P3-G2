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
    setTextes,
    handleSave,
    setPageHistory,
    setPageFuture,
  } = props

  //  console.log("scenariosOfEditedCampagne",scenariosOfEditedCampagne);
  //  console.log("editedCampagne",editedCampagne);

  const [showButtons, setShowButtons] = useState(false)

  // ----------------------------------------------------------------------
  // ----FONCTIONS NOUVELLES PAGES-------------------
  // ------------------------------------------------------------------

  // fonction permettant d'insérer facilement des textes avec des propriétés spécifiques
  // const handleNewTextarea = (pageID, width, height, left, top, placeholder, fontSize, fontWeight, newTextes, pageName) => {
  //   console.log("newTextesavantAxios",newTextes);

  //   axios
  //       .post(`http://localhost:4242/pages/${pageID}/newtexteAtPageCreation`, {
  //         top: top,
  //         left: left,
  //         width:width,
  //         height:height,
  //         fontSize:fontSize,
  //         fontWeight: fontWeight,
  //       })
  //       .then(() => {
  //         axios
  //           .get(`http://localhost:4242/lasttexte`) // on va chercher les textes de la page sélectionnée
  //           .then(({ data }) => {
  //             // on ajoute le placeholder au texte
  //             data.placeHolder = placeholder
  //             if(pageName) {data.text = pageName}
  //             newTextes = [...newTextes, data]
  //             console.log("newTextesaprèsAxios",newTextes);
  //             // const newTextes = [...textes, data]
  //             // setTextes(newTextes)
  //           })
  //       })

  //       return newTextes
  // }

  const handleNewTextarea = async (
    pageID,
    width,
    height,
    left,
    top,
    placeholder,
    fontSize,
    fontWeight,
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

    // on récupère l'id du scenario sélectionné
    const scenarioID = scenariosOfEditedCampagne.filter(
      (scenario) => scenario.selected === true
    )[0].id

    // on demande un nom pour la page
    const pageName = prompt(
      "Donnez un nom à votre page de type Script (Possibilité de le modifier à postériori)"
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
              "32px",
              700,
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
              "20px",
              400,
              textareaTitre
            )

            setTextes(textareaParagraphe) // il n'y a pas de texte dans la page créée
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
  }

  const handleClickButtonObject = () => {
    setShowButtons(false)
  }

  const handleClickButtonLieu = () => {
    setShowButtons(false)
  }

  const handleLeaveSectionButtons = () => {
    setShowButtons(false)
  }
  // ----FIN SECTION-----------------------------------------------------

  // ----------------------------------------------------------------------
  // ----FONCTIONS SECTION SCENARIOS-------------------
  // ------------------------------------------------------------------
  const handleClickSelectScenario = (scenarioID) => {
    // on sauvegarde la page (textes et images) avant de la quitter
    handleSave()
    // on efface l'historique car on ne veut pas pouvoir récupérer dans la nouvelle page les textes et images de la page précédante
    setPageHistory([])
    setPageFuture([])

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
            // .catch((error)
            // permet de jouer setTextes([]) s'il n'y a pas de données dans la BDD
            // console.log(error)
            setTextes([])
          })
      })
    // .catch((error) =>
    //   console.log("error axios recup pages du scénario sélectionné", error)
    // )
  }

  const handleClickSelectpage = (pageID) => {
    // on sauvegarde la page (textes et images) avant de la quitter
    handleSave()
    // on efface l'historique car on ne veut pas pouvoir récupérer dans la nouvelle page les textes et images de la page précédante
    setPageHistory([])
    setPageFuture([])

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
        // .catch((error)
        // permet de jouer setTextes([]) s'il n'y a pas de données dans la BDD
        // console.log(error)
        setTextes([])
      })
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

      {scenariosOfEditedCampagne[1] && (
        <section className="section-campagne">
          <h1>Campagne</h1>
          <div>
            <p>{editedCampagne.name}</p>
            <img
              src={dotsCircle}
              alt="Informations détaillées de la campagne"
              title="Informations détaillées de la campagne"
            />
          </div>
        </section>
      )}

      {scenariosOfEditedCampagne[0] && (
        <>
          <section className="section-scenarios">
            <h1>Scénarios</h1>
            {scenariosOfEditedCampagne.map((scenario) => (
              <div key={scenario.id}>
                <p
                  onClick={() => handleClickSelectScenario(scenario.id)}
                  style={
                    scenario.selected
                      ? { fontWeight: 900, textDecoration: "underline" }
                      : { fontWeight: 400 }
                  }
                >
                  {scenario.name}
                </p>
                <img
                  src={dotsCircle}
                  alt="Informations détaillées du scénario"
                  title="Informations détaillées du scénario"
                />
              </div>
            ))}
          </section>

          <section className="section-pages">
            <h1>Pages</h1>
            {pagesOfScenarioSelected.map((page) => (
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
            ))}
          </section>
        </>
      )}
    </main>
  )
}
