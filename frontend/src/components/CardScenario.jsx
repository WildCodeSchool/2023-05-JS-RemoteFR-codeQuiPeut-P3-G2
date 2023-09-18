import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./CardScenario.scss"
import etoileVide from "../assets/images/etoile-vide.png"
import etoilePleine from "../assets/images/etoile-pleine.png"

function CardScenario({ scenario, user }) {
  const [favorite, setfavorite] = useState(false)
  const [followAutor, setFollowAutor] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:4242/favorite/${scenario.id}`)
      .then(() => {
        setfavorite(true)
      })
      .catch(() => setfavorite(false))
  }, [])

  // pour être rediriger vers le scenario au clic de l'image
  const handleGoToScenarioSelected = () => {
    navigate("/resumescenario", { state: scenario })
  }

  const handleClickPutFavorite = () => {
    if (user !== null) {
      setfavorite(!favorite)
      if (favorite) {
        axios.delete(`http://localhost:4242/favorite`, {
          data: {
            utilisateurID: user.id,
            scenarioID: scenario.id,
          },
        })
      } else {
        axios.post(`http://localhost:4242/favorite`, {
          utilisateurID: user.id,
          scenarioID: scenario.id,
        })
      }
    } else {
      alert("Please log in to add favorites")
    }
  }

  const handleClickFollowAutor = () => {
    if (user !== null) {
      setFollowAutor(!followAutor)
      if (followAutor) {
        axios.delete(`http://localhost:4242/autorFavorite`, {
          data: {
            utilisateurID: user.id,
            auteurID: scenario.auteur_id,
          },
        })
      } else {
        axios.post(`http://localhost:4242/autorFavorite`, {
          utilisateurID: user.id,
          auteurID: scenario.auteur_id,
        })
      }
    } else {
      alert("Please log in to add favorites")
    }
  }

  // console.log(scenario)
  return (
    <div className="Scenario">
      <div onClick={handleGoToScenarioSelected} className="containerimg">
        <img src={scenario.img} alt="illustration" />
      </div>
      <div className="Card">
        <div className="title">
          <h2>{scenario.title}</h2>
          <img
            onClick={handleClickPutFavorite}
            src={favorite ? etoilePleine : etoileVide}
            alt="favoris"
          />
        </div>
        <div className="borderTitle"></div>
        <div className="viewer">
          <p>{scenario.nb_avis} avis</p>
          <p>96 vues</p>
        </div>
        <p className="description">
          {" "}
          {scenario.description.slice(0, 150) + "..."}{" "}
        </p>
        <div className="theme">
          <p className="univers">{scenario.universe}</p>
          <p className="genre">{scenario.theme}</p>
        </div>
        <div className="borderSmall"></div>
        <div className="auteur">
          <p>{scenario.autor}</p>
          <button
            onClick={handleClickFollowAutor}
            className={followAutor ? "followAutor" : ""}
            type="button"
          >
            {followAutor ? "Auteur suivi" : "Suivre l'auteur"}
          </button>
        </div>
      </div>
    </div>
  )
}
export default CardScenario
