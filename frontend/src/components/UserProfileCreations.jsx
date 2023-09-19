import CardScenario from "./CardScenario"
import "./UserProfileCreations.scss"

export default function UserProfileCreations({ scenariosUserFavorite, user }) {
  return (
    <div className="containerUserCreations">
      <div className="boardCards">
        {scenariosUserFavorite.map((scenario) => (
          <div className="containerCard" key={scenario.id}>
            <CardScenario user={user} scenario={scenario} />
          </div>
        ))}
      </div>
    </div>
  )
}
