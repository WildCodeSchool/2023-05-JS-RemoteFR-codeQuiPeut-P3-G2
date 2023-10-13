import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import myApi from "../services/myAPI"

import "./CardScenario.scss"
import etoileVide from "../assets/images/etoile-vide.png"
import etoilePleine from "../assets/images/etoile-pleine.png"
import MyContext from "./MyContext"

export default function CardCampaign({ campaign, user }) {
  const { followedAutors, setFollowedAutors } = useContext(MyContext)
  const [favorite, setfavorite] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (user !== null) {
      myApi
        .get(`/utilisateurs/${user.id}/campagneFavorite/${campaign.id}`)
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
        myApi.delete(`/favoriteCampaign`, {
          data: {
            utilisateurID: user.id,
            campaignID: campaign.id,
          },
        })
      } else {
        myApi.post(`/favoriteCampaign`, {
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
      // setFollowAutor(!followAutor)
      if (
        followedAutors.find((item) => item.auteurs_id === campaign.auteurs_id)
      ) {
        myApi
          .delete(`/autorFavorite`, {
            data: {
              utilisateurID: user.id,
              auteurID: campaign.auteurs_id,
            },
          })
          .then(() => {
            myApi
              .get(`/autorFavorite/${user.id}`)
              .then(({ data }) => setFollowedAutors(data))
              .catch((err) => console.error(err))
          })
      } else {
        myApi
          .post(`/autorFavorite`, {
            utilisateurID: user.id,
            auteurID: campaign.auteurs_id,
          })
          .then(() => {
            myApi
              .get(`/autorFavorite/${user.id}`)
              .then(({ data }) => setFollowedAutors(data))
              .catch((err) => console.error(err))
          })
      }
    } else {
      alert("Please log in to add favorites")
    }
  }

  // console.log(campaign)
  return (
    <div className="Scenario">
      <div
        onClick={handleGoToCampaignSelected}
        className="containerimg cursorHover"
      >
        <img src={campaign.img} alt="illustration" />
      </div>
      <div className="Card">
        <div className="title">
          <h2>{campaign.name}</h2>
          <img
            onClick={handleClickPutFavorite}
            src={favorite ? etoilePleine : etoileVide}
            alt="favoris"
            className="cursorHover"
          />
        </div>
        <div className="borderTitle"></div>
        <div className="viewer">
          <p>{campaign.nbVues} vues</p>
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
            className={
              followedAutors.find(
                (item) => item.auteurs_id === campaign.auteurs_id
              )
                ? "followAutor cursorHover"
                : "cursorHover"
            }
            type="button"
          >
            {/* {followAutor ? "Auteur suivi" : "Suivre l'auteur"} */}
            {followedAutors.find(
              (item) => item.auteurs_id === campaign.auteurs_id
            )
              ? "Auteur suivi"
              : "Suivre l'auteur"}
          </button>
        </div>
      </div>
    </div>
  )
}
