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
  } = props

  //  console.log("scenariosOfEditedCampagne",scenariosOfEditedCampagne);
  //  console.log("editedCampagne",editedCampagne);

  const [showButtons, setShowButtons] = useState(false)

  // ----------------------------------------------------------------------
  // ----FONCTIONS NOUVELLES PAGES-------------------
  // ------------------------------------------------------------------
  const handleClickNouvellePage = () => {
    setShowButtons(!showButtons)
  }

  const handleClickButtonScript = () => {
    setShowButtons(false)
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
