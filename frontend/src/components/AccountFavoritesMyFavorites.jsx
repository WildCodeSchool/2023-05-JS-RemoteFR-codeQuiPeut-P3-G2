import CardScenario from "./CardScenario"
import "./AccountFavoritesMyFavorites.scss"

export default function AccountFavoritesMyFavorites({
  scenariosFavorite,
  user,
}) {
  return (
    <div className="containerMyFavorites">
      <div className="boardCards">
        {scenariosFavorite[0] &&
          scenariosFavorite.map((scenario) => (
            <div className="containerCard" key={scenario.id}>
              <CardScenario user={user} scenario={scenario} />
            </div>
          ))}
      </div>
    </div>
  )
}
