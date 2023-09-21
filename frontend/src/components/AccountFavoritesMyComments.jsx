import CardScenario from "./CardScenario"
import "./AccountFavoritesMyComments.scss"

export default function AccountFavoritesMyComments({ scenariosAvis, user }) {
  return (
    <div className="containerMyComments">
      <div className="boardCards">
        {/* {scenariosAvis.map((scenario) => (
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
