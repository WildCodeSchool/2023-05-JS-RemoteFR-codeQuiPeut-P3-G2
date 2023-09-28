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
import Cursor from "./components/Cursor"
import Login from "./components/Login"

function App() {
  // users sera l'ensemble des utilisateurs de mon site
  const [users, setUsers] = useState([])
  // user sera l'utilisateur de mon site, quand on entre sur le site il est initialisé à null
  // il changera quand on l'utilisateur se connectera
  const [user, setUser] = useState(null)
  // le state followedAutors contiendra les infos de tous les auteurs suivis
  const [followedAutors, setFollowedAutors] = useState([])

  // pour conserver l'utilisateur connecté même en cas de raffraichissement
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // stockage de l'état initial de user, setUser et users via un useMemo
  const valeursFourniesDansMyContextProvider = useMemo(
    () => ({
      user,
      setUser,
      users,
      setUsers,
      followedAutors,
      setFollowedAutors,
    }),
    [user, setUser, users, setUsers, followedAutors, setFollowedAutors]
  )

  return (
    <div className="App">
      <Cursor />
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
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </MyContext.Provider>
    </div>
  )
}

export default App
