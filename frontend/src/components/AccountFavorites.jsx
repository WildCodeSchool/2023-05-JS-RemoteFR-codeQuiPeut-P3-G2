import CardScenario from "./CardScenario"
import { useEffect, useContext, useState } from "react"
import MyContext from "./MyContext"
import axios from "axios"
import "./AccountFavorites.scss"
import AccountFavoritesMyFavorites from "./AccountFavoritesMyFavorites"

export default function AccountFavorites() {
  const { user } = useContext(MyContext)
  const [scenarios, setScenarios] = useState([])
  const [campagnes, setCampagnes] = useState([])
  const [ongletActif, setOngletActif] = useState(1)
  const [originalScenarios, setOriginalScenarios] = useState([])

  const showTap = (numOnglet) => {
    setOngletActif(numOnglet)
  }

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
      <ul>
        <li onClick={() => showTap(1)}>My favorites one</li>
        <li onClick={() => showTap(2)}>My view</li>
        <li onClick={() => showTap(3)}>My comments</li>
      </ul>

      <div className="containTab">
        {ongletActif === 1 && <AccountFavoritesMyFavorites />}
        {ongletActif === 2 && <AccountFavoritesMyFavorites />}
        {ongletActif === 3 && <AccountFavoritesMyFavorites />}
      </div>
    </div>
  )
}
