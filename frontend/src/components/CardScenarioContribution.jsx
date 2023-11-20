import { useNavigate } from "react-router-dom"
import "./CardScenarioCreation.scss"
import pen from "../assets/images/Pen.svg"

function CardScenarioContribution({ scenario, user }) {
  const navigate = useNavigate()

  const handleOpenCreator = () => {
    if (scenario.collaborationType === "chat") {
      navigate("/readscenario", {
        state: { scenario, followerID: user.id },
      })
    } else if (scenario.collaborationType === "co-writing") {
      console.info("co-writing collaboration pas encore mis en place")
      navigate("/editorCollaboration", { state: { scenario } })
    }
  }

  return (
    <main className="Scenario">
      <div className="containerimg">
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
          <p>{`Author : ${scenario.autor}`}</p>
          <p>{`Collaboration : ${scenario.collaborationType}`}</p>
        </div>
      </div>
      <img
        src={pen}
        alt="crayon pour modifier"
        title="Click to edit your scenario"
        className="pen-modify cursorHover"
        onClick={handleOpenCreator}
      />
    </main>
  )
}
export default CardScenarioContribution
