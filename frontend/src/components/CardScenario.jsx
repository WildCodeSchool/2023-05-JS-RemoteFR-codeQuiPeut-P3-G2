import { useState } from "react"
import "./CardScenario.scss"
import etoileVide from "../assets/images/etoile-vide.png"
import etoilePleine from "../assets/images/etoile-pleine.png"

function CardScenario({ scenario }) {
  const [favorite, setfavorite] = useState(false)
  const [followAutor, setFollowAutor] = useState(false)

  const handleClickPutFavorite = () => {
    setfavorite(!favorite)
  }

  const handleClickFollowAutor = () => {
    setFollowAutor(!followAutor)
  }

  // console.log(scenario)
  return (
    <div className="Scenario">
      <div className="containerimg">
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
        <p className="description"> {scenario.description} </p>
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
