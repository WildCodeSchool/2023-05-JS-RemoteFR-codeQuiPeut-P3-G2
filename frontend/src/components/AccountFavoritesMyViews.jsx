import CardScenario from "./CardScenario"
import "./AccountFavoritesMyViews.scss"

export default function AccountFavoritesMyViews({ scenariosFavorite, user }) {
  return (
    <div className="containerMyViews">
      <div className="boardCards">
        {/* {scenariosFavorite.map((scenario) => (
          <div className="containerCard" key={scenario.id}>
            <CardScenario user={user} scenario={scenario} />
          </div>
        ))} */}
        <h1 style={{ color: "red", textAlign: "center", fontSize: "2rem" }}>
          Page under construction
        </h1>
      </div>
    </div>
  )
}
