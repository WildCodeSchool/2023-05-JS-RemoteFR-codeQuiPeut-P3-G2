import CardScenario from "./CardScenario"
import "./AccountFavoritesMyViews.scss"

export default function AccountFavoritesMyViews({scenariosFavorite, user}) {

  return (
    <div className="containerMyViews">
      <div className="boardCards">
        {scenariosFavorite.map((scenario) => (
          <div className="containerCard" key={scenario.id}>
            <CardScenario user={user} scenario={scenario} />
          </div>
        ))}
      </div>
    </div>
  )
}
