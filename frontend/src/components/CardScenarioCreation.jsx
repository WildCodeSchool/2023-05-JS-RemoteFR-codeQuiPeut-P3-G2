import { useNavigate } from "react-router-dom"
import "./CardScenarioCreation.scss"
import pen from "../assets/images/Pen.svg"
import publish from "../assets/images/icon-publish.png"
import publishBleu from "../assets/images/icon-publishBleu.png"
import { useState } from "react"
import axios from "axios"

function CardScenarioCreation({ scenario, user }) {
  const navigate = useNavigate()

  const [colorPublish, setColorPublish] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  const yearPublication = parseInt(scenario.publication_date.slice(0, 4), 10)

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

  // pour être rediriger vers le scenario au clic de l'image
  const handleGoToScenarioSelected = () => {
    if (user.auteurId !== scenario.auteurId) {
      navigate("/resumescenario", { state: scenario })
    }
  }

  const handleOpenCreator = () => {
    navigate("/editor", { state: scenario.campagnes_id })
  }

  const handleClickPublish = () => {
    setIsClicked(true)
    setColorPublish(true)
    setTimeout(() => {
      setIsClicked(false)
      setIsPublished(true)
    }, 2000) // Réinitialise l'état après 2 secondes (2000 ms)

    axios.put(`http://localhost:4242/scenarios/${scenario.id}`, {
      auteurs_id: scenario.auteursId, // author
      jeux_de_role_id: scenario.jeux_de_roleId,
      campagnes_id: scenario.campagnes_id, // A faire plus tard => campagneId
      name: scenario.title,
      nb_player_min: scenario.nb_player_min,
      nb_player_max: scenario.nb_player_max,
      level: scenario.level,
      start_writing_date: handleFormatDateToSend(scenario.start_writing_date),
      publication_date: getDateOfDay(),
      img: scenario.img,
      type: scenario.type,
      description: scenario.description,
      model: 1, // a supprimer si table modifiée avec suppression de cette colonne
    })
  }

  return (
    <main className="Scenario">
      <div className="containerimg">
        <img
          src={scenario.img}
          alt="illustration"
          onClick={handleGoToScenarioSelected}
          className="cursorHover"
        />
      </div>
      <div className="Card">
        <div className="title">
          <h2>{scenario.title}</h2>
        </div>
        <div className="borderTitle"></div>
        <p className="description">
          {" "}
          {scenario.description.slice(0, 150) + "..."}{" "}
        </p>
        <div className="theme">
          <p className="univers">{scenario.universe}</p>
          <p className="genre">{scenario.theme}</p>
        </div>
        <div className="borderSmall"></div>
        <div className="publicationDate">
          <p>{handleFormatDate(scenario.start_writing_date)}</p>
        </div>
      </div>
      {user.auteurId === scenario.auteurId && (
        <img
          src={pen}
          alt="crayon pour modifier"
          title="Click to edit your scenario"
          className="pen-modify cursorHover"
          onClick={handleOpenCreator}
        />
      )}

      {!isPublished &&
        user.auteurId === scenario.auteurId &&
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
export default CardScenarioCreation
