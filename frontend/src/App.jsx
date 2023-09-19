import Welcome from "./pages/Welcome"
import MyContext from "./components/MyContext"
import Editor from "./pages/Editor"
import Forum from "./pages/Forum"
import Scripts from "./pages/Scripts"
import FormNewScenario from "./pages/FormNewScenario"
import ResumePageScenario from "./pages/ResumePageScenario"
import ResumePageCampaign from "./pages/ResumePageCampaign"
import { Routes, Route } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import "../index.scss"
import UserAccount from "./pages/UserAccount"
import AccountInformations from "./components/AccountInformations"
import AccountCreations from "./components/AccountCreations"
import AccountFollowers from "./components/AccountFollowers"
import AccountFavorites from "./components/AccountFavorites"
import ScenarioReading from "./pages/ScenarioReading"
import ForumPageComments from "./pages/ForumPageComments"

function App() {
  // users sera l'ensemble des utilisateurs de mon site
  const [users, setUsers] = useState([])
  // user sera l'utilisateur de mon site, quand on entre sur le site il est initialisé à null
  // il changera quand on l'utilisateur se connectera
  const [user, setUser] = useState(null)
  // le state infoCampagnes contiendra les infos de toutes les campagnes
  // le state scenarios contiendra les infos de tous les scenarios
  const [campagnes, setCampagnes] = useState([])
  const [scenarios, setScenarios] = useState([])

  // pour conserver l'utilisateur connecté même en cas de raffraichissement
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user")
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser))
  //   }
  // }, [])

  // stockage de l'état initial de user, setUser et users via un useMemo
  const valeursFourniesDansMyContextProvider = useMemo(
    () => ({
      user,
      setUser,
      users,
      setUsers,
      campagnes,
      setCampagnes,
      scenarios,
      setScenarios,
    }),
    [
      user,
      setUser,
      users,
      setUsers,
      campagnes,
      setCampagnes,
      scenarios,
      setScenarios,
    ]
  )

  return (
    <div className="App">
      <MyContext.Provider value={valeursFourniesDansMyContextProvider}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/ForumPageComments" element={<ForumPageComments />} />
          <Route path="/scripts" element={<Scripts />} />
          <Route path="/readscenario" element={<ScenarioReading />} />
          <Route path="/formnewscenario" element={<FormNewScenario />} />
          <Route path="/useraccount/" element={<UserAccount />}>
            <Route index element={<AccountInformations />} />
            <Route path="favorites" element={<AccountFavorites />} />
            <Route path="creations" element={<AccountCreations />} />
            <Route path="followers" element={<AccountFollowers />} />
          </Route>
          <Route path="/resumescenario" element={<ResumePageScenario />} />
          <Route path="/resumeCampagne" element={<ResumePageCampaign />} />
        </Routes>
      </MyContext.Provider>
    </div>
  )
}

export default App
