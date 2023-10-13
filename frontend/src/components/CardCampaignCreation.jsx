import { useNavigate } from "react-router-dom"
import "./CardScenarioCreation.scss"
import pen from "../assets/images/Pen.svg"
import publish from "../assets/images/icon-publish.png"
import publishBleu from "../assets/images/icon-publishBleu.png"
import { useState } from "react"
import myApi from "../services/myAPI"

export default function CardCampaignCreation({ campagne, user }) {
  const navigate = useNavigate()

  const [colorPublish, setColorPublish] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  const yearPublication = parseInt(campagne.publication_date.slice(0, 4), 10)

  const handleFormatDate = (myDate) => {
    const year = myDate.slice(0, 4)
    const month = myDate.slice(5, 7)
    const day = myDate.slice(8, 10)
    return `Started on : ${day}/${month}/${year}`
  }

  const handleFormatDateToSend = (myDate) => {
    const year = myDate.slice(0, 4)
    const month = myDate.slice(5, 7)
    const day = myDate.slice(8, 10)
    return `${year}-${month}-${day}`
  }

  const getDateOfDay = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // pour être rediriger vers le campaign au clic de l'image
  const handleGoToCampaignSelected = () => {
    if (user.auteurId !== campagne.auteurs_id) {
      navigate("/resumeCampagne", { state: campagne.id })
    }
  }

  const handleOpenCreator = () => {
    navigate("/editor", { state: campagne.id })
  }

  const handleClickPublish = () => {
    setIsClicked(true)
    setColorPublish(true)
    setTimeout(() => {
      setIsClicked(false)
      setIsPublished(true)
    }, 2000) // Réinitialise l'état après 2 secondes (2000 ms)

    myApi.put(`/campagnes/${campagne.id}`, {
      auteurs_id: campagne.auteurs_id, // author
      jeux_de_role_id: campagne.jeux_de_role_id,
      name: campagne.name,
      nb_player_min: campagne.nb_player_min,
      nb_player_max: campagne.nb_player_max,
      level: campagne.level,
      start_writing_date: handleFormatDateToSend(campagne.start_writing_date),
      publication_date: getDateOfDay(),
      img: campagne.img,
      synopsis: campagne.synopsis,
    })
  }

  return (
    <main className="Scenario">
      <div className="containerimg">
        <img
          src={campagne.img}
          alt="illustration"
          onClick={handleGoToCampaignSelected}
          className="cursorHover"
        />
      </div>
      <div className="Card">
        <div className="title">
          <h2>{campagne.name}</h2>
        </div>
        <div className="borderTitle"></div>
        <p className="description">
          {" "}
          {campagne.synopsis.slice(0, 150) + "..."}{" "}
        </p>
        <div className="theme">
          <p className="univers">{campagne.jeux_de_role}</p>
          <p className="genre">{campagne.theme}</p>
        </div>
        <div className="borderSmall"></div>
        <div className="publicationDate">
          <p>{handleFormatDate(campagne.start_writing_date)}</p>
        </div>
      </div>
      {user.auteurId === campagne.auteurs_id && (
        <img
          src={pen}
          alt="crayon pour modifier"
          className="pen-modify cursorHover"
          onClick={handleOpenCreator}
        />
      )}

      {!isPublished &&
        user.auteurId === campagne.auteurs_id &&
        yearPublication > 2990 && (
          <img
            src={colorPublish ? publish : publishBleu}
            className={`icon-publish cursorHover ${isClicked ? "animate" : ""}`}
            alt="Icon publish"
            title="Click to publish your scenario"
            onMouseEnter={() => setColorPublish(false)}
            onMouseLeave={() => setColorPublish(true)}
            onClick={handleClickPublish}
          />
        )}
    </main>
  )
}
