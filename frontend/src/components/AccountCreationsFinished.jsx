import "./AccountCreationsFinished.scss"
import pen from "../assets/images/Pen.svg"
import CardScenarioCreation from "./CardScenarioCreation"

export default function AccountCreationsFinished({ user, scenariosFinished }) {
  return (
    <div className="containerCreationsFinished">
      <h1>My creations finished</h1>
      <div className="boardCards">
        {scenariosFinished.map((scenario) => (
          <div className="containerCard" key={scenario.id}>
            <div className="containerImg">
              <img src={pen} alt="crayon pour modifier" />
            </div>
            <CardScenarioCreation user={user} scenario={scenario} />
          </div>
        ))}
      </div>
    </div>
  )
}
