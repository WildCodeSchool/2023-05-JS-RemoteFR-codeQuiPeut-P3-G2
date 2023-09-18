import CardScenario from "./CardScenario"
import { useEffect, useContext, useState } from "react"
import MyContext from "./MyContext"
import axios from "axios"
import "./AccountCreations.scss"
import pen from "../assets/images/Pen.svg"
import CardScenarioCreation from "./CardScenarioCreation"

export default function AccountCreations() {
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
    <div className="containerCreations">
      <h1>My creations in progress</h1>
      <div className="boardCards">
        {scenarios.map((scenario) => (
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
