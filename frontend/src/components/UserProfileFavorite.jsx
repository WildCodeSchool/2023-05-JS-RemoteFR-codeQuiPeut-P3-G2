import CardScenario from "./CardScenario"
import "./UserProfileFavorite.scss"

export default function UserProfileFavorite({ scenariosUserFavorite, user }) {
  return (
    <div className="containerUserFavorite">
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
