import "./AccountCreationsInProgress.scss"
import pen from "../assets/images/Pen.svg"
import CardScenarioCreation from "./CardScenarioCreation"

export default function AccountCreationsInProgress({
  scenariosInProgress,
  user,
}) {
  return (
    <div className="containerCreationsInProgress">
      <h1>My creations in progress</h1>
      <div className="boardCards">
        {scenariosInProgress.map((scenario) => (
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
