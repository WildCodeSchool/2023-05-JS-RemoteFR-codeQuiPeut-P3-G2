import Welcome from "./pages/Welcome"
import MyContext from "./components/MyContext"
import Editor from "./pages/Editor"
import Forum from "./pages/Forum"
import Scripts from "./pages/Scripts"
import FormNewScenario from "./pages/FormNewScenario"
import { Routes, Route } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import "../index.scss"

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
          <Route path="/scripts" element={<Scripts />} />
          <Route path="/formnewscenario" element={<FormNewScenario />} />
        </Routes>
      </MyContext.Provider>
    </div>
  )
}

export default App
