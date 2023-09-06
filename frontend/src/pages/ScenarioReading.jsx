import { useState, useEffect } from "react"
// import { useLocation } from "react-router-dom"
import ReadingPage from "../components/ReadingPage"
import SommaireReading from "../components/SommaireReading"
import axios from "axios"

export default function ScenarioReading() {
  // const location = useLocation()
  // const scenario = location.state?.scenario
  const scenario = {
    // A REMPLACER PAR LE LOCATION CI DESSUS
    id: 1,
    name: "Levé tôt",
  }

  const [textes, setTextes] = useState([])
  const [images, setImages] = useState([])
  const [pages, setPages] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [heightPage, setHeightPage] = useState("1750px")
  const [widthPage, setWidthPage] = useState("1000px")

  const scenarioID = 1 // A REMPLACER PAR scenario.id

  const handleFindTextesAndImages = (pageNumber) => {
    const idPageSelected = pages.filter((item) => item.number === pageNumber)[0]
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

  const handleClickPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
      handleFindTextesAndImages(pageNumber - 1)
    }
  }

  const handleClickNextPage = () => {
    const pageNumbers = pages.map((page) => page.number)
    if (pageNumber < Math.max(...pageNumbers)) {
      setPageNumber(pageNumber + 1)
      handleFindTextesAndImages(pageNumber + 1)
    }
  }

  // fonction donnant les actions à faire lorsque la fenetre du navigateur est redimensionnée
  const resetWidthPageOnWindowResize = () => {
    // setWindowWidth(window.innerWidth)
    setWidthPage(() => {
      if (window.innerWidth > 1000) {
        return "1000px"
      } else {
        return window.innerWidth + "px"
      }
    })

    setHeightPage(() => {
      if (window.innerWidth > 1000) {
        return "1414px"
      } else {
        if (window.innerHeight > 1.414 * window.innerWidth) {
          return window.innerHeight
        } else {
          return window.innerWidth * 1.414 + "px"
        }
      }
    })
  }

  // on appelle la fonction lorsque la fenêtre est redimensionnée
  window.onresize = resetWidthPageOnWindowResize

  useEffect(() => {
    axios
      .get(`http://localhost:4242/scenarios/${scenarioID}/pages`)
      .then(({ data }) => {
        setPages(data)
        return data
      })
      .then((pages) => {
        const idPageSelected = pages.filter((item) => item.number === 1)[0].id

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

  // on met à jour directement la taille de la page
  useEffect(() => {
    resetWidthPageOnWindowResize()
  }, [])

  return (
    <main className="main-scenarioReading">
      <section className="section-sommaireReading">
        <SommaireReading
          scenario={scenario}
          pages={pages}
          setPages={setPages}
          setTextes={setTextes}
          setImages={setImages}
        />
      </section>

      <section
        className="section-scenarioReading"
        style={{ width: widthPage, height: heightPage }}
      >
        <div className="reading-page-container">
          <ReadingPage
            textes={textes}
            images={images}
            handleClickPreviousPage={handleClickPreviousPage}
            handleClickNextPage={handleClickNextPage}
            pageNumber={pageNumber}
            pages={pages}
            selectedPage={pages.filter((page) => page.number === pageNumber)[0]}
          />
        </div>
      </section>
    </main>
  )
}
