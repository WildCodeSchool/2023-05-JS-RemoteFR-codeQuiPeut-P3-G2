import { useNavigate } from "react-router-dom"
import "./CardScenarioCreation.scss"
import pen from "../assets/images/Pen.svg"

export default function CardCampaignCreation({ campagne, user }) {
  const navigate = useNavigate()

  const handleFormatDate = (myDate) => {
    const year = myDate.slice(0, 4)
    const month = myDate.slice(5, 7)
    const day = myDate.slice(8, 10)
    return `Started on : ${day}/${month}/${year}`
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

  return (
    <main className="Scenario">
      <div className="containerimg">
        <img
          src={campagne.img}
          alt="illustration"
          onClick={handleGoToCampaignSelected}
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
          className="pen-modify"
          onClick={handleOpenCreator}
        />
      )}
    </main>
  )
}
