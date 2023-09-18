import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./CardScenarioCreation.scss"

function CardScenarioCreation({ scenario, user }) {
  const [favorite, setfavorite] = useState(false)

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

  // console.log(scenario)
  return (
    <div className="Scenario">
      <div onClick={handleGoToScenarioSelected} className="containerimg">
        <img src={scenario.img} alt="illustration" />
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
          <p>Crée le : {scenario.start_writing_date}</p>
        </div>
      </div>
    </div>
  )
}
export default CardScenarioCreation
