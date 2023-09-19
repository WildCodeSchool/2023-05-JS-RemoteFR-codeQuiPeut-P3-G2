import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./CardScenario.scss"
import etoileVide from "../assets/images/etoile-vide.png"
import etoilePleine from "../assets/images/etoile-pleine.png"
import MyContext from "./MyContext"

function CardScenario({ scenario, user }) {
  const { followedAutors, setFollowedAutors } = useContext(MyContext)

  const [favorite, setfavorite] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (user !== null) {
      axios
        .get(
          `http://localhost:4242/utilisateurs/${user.id}/scenarioFavorite/${scenario.id}`
        )
        .then(({ data }) => {
          setfavorite(true)
        })
        .catch(() => setfavorite(false))
    }
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
      if (
        followedAutors.find((item) => item.auteurs_id === scenario.auteurs_id)
      ) {
        axios
          .delete(`http://localhost:4242/autorFavorite`, {
            data: {
              utilisateurID: user.id,
              auteurID: scenario.auteurs_id,
            },
          })
          .then(() => {
            axios
              .get(`http://localhost:4242/autorFavorite/${user.id}`)
              .then(({ data }) => setFollowedAutors(data))
              .catch((err) => console.error(err))
          })
      } else {
        axios
          .post(`http://localhost:4242/autorFavorite`, {
            utilisateurID: user.id,
            auteurID: scenario.auteurs_id,
          })
          .then(() => {
            axios
              .get(`http://localhost:4242/autorFavorite/${user.id}`)
              .then(({ data }) => setFollowedAutors(data))
              .catch((err) => console.error(err))
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
            className={
              followedAutors.find(
                (item) => item.auteurs_id === scenario.auteurs_id
              )
                ? "followAutor"
                : ""
            }
            type="button"
          >
            {followedAutors.find(
              (item) => item.auteurs_id === scenario.auteurs_id
            )
              ? "Auteur suivi"
              : "Suivre l'auteur"}
          </button>
        </div>
      </div>
    </div>
  )
}
export default CardScenario
