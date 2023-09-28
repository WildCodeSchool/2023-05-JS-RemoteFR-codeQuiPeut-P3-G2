import axios from "axios"
import scriptLogo from "../assets/images/ScripLogo.png"
import { useNavigate } from "react-router-dom"
// import { useState } from "react"

export default function SommaireReading(props) {
  const {
    scenario,
    pages,
    setPages,
    setTextes,
    setImages,
    setShowSummary,
    setPageNumber,
  } = props
  const navigate = useNavigate()

  const handleClickLogoScripter = () => {
    navigate("/scripts")
  }

  // ----------------------------------------------------------------------
  // ----FONCTIONS SECTION SCENARIOS-------------------
  // ------------------------------------------------------------------

  const handleClickSelectpage = (pageID) => {
    setShowSummary(false)

    const newpages = pages.map((page) =>
      page.id === pageID
        ? { ...page, selected: true }
        : { ...page, selected: false }
    )

    setPages(newpages)

    setPageNumber(newpages.filter((page) => page.selected === true)[0].number)

    const idPageSelected = newpages.filter((item) => item.selected === true)[0]
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
  }

  // ----FIN SECTION-----------------------------------------------------

  return (
    <main className="main-sommaire-reading">
      <img
        src={scriptLogo}
        alt="back to Scripts"
        title="back to Scripts"
        className="sommaire-logo-home"
        onClick={handleClickLogoScripter}
        draggable
      />
      <section className="container-campagne-scenario-page">
        <section className="section-scenarios">
          <h1>Scenario</h1>
          <p>{scenario.name}</p>
        </section>

        <section className="section-pages">
          <h1>Summary</h1>

          {pages.filter((page) => page.page_types_id === 2).length > 0 && (
            <>
              <h2>Characters</h2>
              {pages
                .filter((page) => page.page_types_id === 2)
                .sort((a, b) => a.number - b.number)
                .map((page) => (
                  <div key={page.id}>
                    <p
                      onClick={() => handleClickSelectpage(page.id)}
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
                  </div>
                ))}
            </>
          )}

          {pages.filter((page) => page.page_types_id === 3).length > 0 && (
            <>
              <h2>Objects</h2>
              {pages
                .filter((page) => page.page_types_id === 3)
                .sort((a, b) => a.number - b.number)
                .map((page) => (
                  <div key={page.id}>
                    <p
                      onClick={() => handleClickSelectpage(page.id)}
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
                  </div>
                ))}
            </>
          )}

          {pages.filter((page) => page.page_types_id === 4).length > 0 && (
            <>
              <h2>Locations</h2>
              {pages
                .filter((page) => page.page_types_id === 4)
                .sort((a, b) => a.number - b.number)
                .map((page) => (
                  <div key={page.id}>
                    <p
                      onClick={() => handleClickSelectpage(page.id)}
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
                  </div>
                ))}
            </>
          )}

          {pages.filter((page) => page.page_types_id === 1).length > 0 && (
            <>
              <h2>Script</h2>
              {pages
                .filter((page) => page.page_types_id === 1)
                .sort((a, b) => a.number - b.number)
                .map((page) => (
                  <div key={page.id}>
                    <p
                      onClick={() => handleClickSelectpage(page.id)}
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
                  </div>
                ))}
            </>
          )}
        </section>
      </section>
    </main>
  )
}
