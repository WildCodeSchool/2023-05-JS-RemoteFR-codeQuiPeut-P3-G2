import CardScenario from "./CardScenario"
import { useEffect, useContext, useState } from "react"
import MyContext from "./MyContext"
import axios from "axios"
import "./AccountFavorites.scss"
import AccountFavoritesMyFavorites from "./AccountFavoritesMyFavorites"
import AccountFavoritesMyViews from "./AccountFavoritesMyViews"
import AccountFavoritesMyComments from "./AccountFavoritesMyComments"

export default function AccountFavorites() {
  const { user } = useContext(MyContext)
  const [scenariosFavorite, setScenariosFavorite] = useState([])
  const [scenariosAvis, setScenariosAvis] = useState([])
  const [campagnes, setCampagnes] = useState([])
  const [ongletActif, setOngletActif] = useState(1)
  const [originalScenarios, setOriginalScenarios] = useState([])

  const showTap = (numOnglet) => {
    setOngletActif(numOnglet)
  }

  useEffect(() => {
    axios.get(`http://localhost:4242/scenariosFavorites/utilisateur/${user.id}`)
        .then((res) => {
      setScenariosFavorite(res.data)
    })

    axios.get(`http://localhost:4242/scenariosAvis/utilisateur/${user.id}`)
    .then((res) => {
  setScenariosAvis(res.data)
})

    axios
      .get("http://localhost:4242/campagnesMulti")
      .then(({ data }) => setCampagnes(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="containerFavorites">
      <ul>
        <li onClick={() => showTap(1)}>My favorites ones</li>
        <li onClick={() => showTap(2)}>My view</li>
        <li onClick={() => showTap(3)}>My comments</li>
      </ul>

      <div className="containTab">
        {ongletActif === 1 && <AccountFavoritesMyFavorites scenariosFavorite={scenariosFavorite} user={user}/>}
        {ongletActif === 2 && <AccountFavoritesMyViews scenariosFavorite={scenariosFavorite} user={user}/>}
        {ongletActif === 3 && <AccountFavoritesMyComments scenariosAvis={scenariosAvis} user={user}/>}
      </div>
    </div>
  )
}
