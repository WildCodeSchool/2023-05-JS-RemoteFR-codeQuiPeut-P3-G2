import { useEffect, useState, useContext } from "react"
import myApi from "../services/myAPI"

import MyContext from "./MyContext"
import CardScenarioContribution from "./CardScenarioContribution"

export default function AccountCreationContributions() {
  const { user } = useContext(MyContext)
  const [scenarios, setScenarios] = useState([])

  useEffect(() => {
    myApi
      .get(`/contributionScenarios/utilisateur/${user.id}`)
      .then(({ data }) => setScenarios(data))
  })

  return (
    <main className="containerCreationsInProgress">
      <div className="boardCards">
        {scenarios[0] &&
          scenarios.map((scenario) => (
            <div className="containerCard" key={scenario.id}>
              <div className="containerImg"></div>
              <CardScenarioContribution user={user} scenario={scenario} />
            </div>
          ))}
      </div>
    </main>
  )
}
