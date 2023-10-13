import CardScenario from "./CardScenario"
import "./AccountFavoritesMyViews.scss"
import { useEffect, useState } from "react"
import axios from "axios"
import myApi from "../services/myAPI"

export default function AccountFavoritesMyViews({ scenariosFavorite, user }) {
  const [readScenarios, setReadScenarios] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/readScenarios/utilisateur/${user.id}`)
      .then(({ data }) => setReadScenarios(data))
  })

  return (
    <div className="containerMyViews">
      <div className="boardCards">
        {readScenarios.map((scenario) => (
          <div className="containerCard" key={scenario.id}>
            <CardScenario user={user} scenario={scenario} />
          </div>
        ))}
      </div>
    </div>
  )
}
