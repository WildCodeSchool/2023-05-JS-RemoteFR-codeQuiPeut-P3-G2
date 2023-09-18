import CardScenario from "./CardScenario"
import { useEffect, useContext, useState } from "react"
import MyContext from "./MyContext"
import axios from "axios"
import "./AccountFavorites.scss"

export default function AccountFavoritesMyFavorites() {
  const { user } = useContext(MyContext)
  const [scenarios, setScenarios] = useState([])
  const [campagnes, setCampagnes] = useState([])
  const [originalScenarios, setOriginalScenarios] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4242/scenarios").then((res) => {
      setScenarios(res.data)
      setOriginalScenarios(res.data)
    })

    axios
      .get("http://localhost:4242/campagnesMulti")
      .then(({ data }) => setCampagnes(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="containerFavorites">
      <h1>My favorites ones</h1>
      <div className="boardCards">
        {scenarios.map((scenario) => (
          <div className="containerCard" key={scenario.id}>
            <CardScenario user={user} scenario={scenario} />
          </div>
        ))}
      </div>
    </div>
  )
}
