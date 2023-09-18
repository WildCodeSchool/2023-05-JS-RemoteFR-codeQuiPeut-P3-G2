import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./CardScenario.scss"
import etoileVide from "../assets/images/etoile-vide.png"
import etoilePleine from "../assets/images/etoile-pleine.png"

export default function CardCampaign({ campaign, user }) {
  const [favorite, setfavorite] = useState(false)
  const [followAutor, setFollowAutor] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (user !== null) {
      axios
        .get(
          `http://localhost:4242/utilisateurs/${user.id}/campagneFavorite/${campaign.id}`
        )
        .then(({ data }) => {
          setfavorite(true)
        })
        .catch(() => setfavorite(false))
    }
  }, [])

  // pour être rediriger vers le campaign au clic de l'image
  const handleGoToCampaignSelected = () => {
    navigate("/resumeCampagne", { state: campaign.id })
  }

  const handleClickPutFavorite = () => {
    if (user !== null) {
      setfavorite(!favorite)
      if (favorite) {
        axios.delete(`http://localhost:4242/favoriteCampaign`, {
          data: {
            utilisateurID: user.id,
            campaignID: campaign.id,
          },
        })
      } else {
        axios.post(`http://localhost:4242/favoriteCampaign`, {
          utilisateurID: user.id,
          campaignID: campaign.id,
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
            auteurID: campaign.auteur_id,
          },
        })
      } else {
        axios.post(`http://localhost:4242/autorFavorite`, {
          utilisateurID: user.id,
          auteurID: campaign.auteur_id,
        })
      }
    } else {
      alert("Please log in to add favorites")
    }
  }

  // console.log(campaign)
  return (
    <div className="Scenario">
      <div onClick={handleGoToCampaignSelected} className="containerimg">
        <img src={campaign.img} alt="illustration" />
      </div>
      <div className="Card">
        <div className="title">
          <h2>{campaign.name}</h2>
          <img
            onClick={handleClickPutFavorite}
            src={favorite ? etoilePleine : etoileVide}
            alt="favoris"
          />
        </div>
        <div className="borderTitle"></div>
        <div className="viewer">
          <p>xxx vues</p>
        </div>
        <p className="description">
          {" "}
          {campaign.synopsis.slice(0, 150) + "..."}{" "}
        </p>
        <div className="theme">
          <p className="univers">{campaign.jeux_de_role}</p>
          <p className="genre">{campaign.theme}</p>
        </div>
        <div className="borderSmall"></div>
        <div className="auteur">
          <p>{campaign.autor}</p>
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
