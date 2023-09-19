import React, { useState, useEffect, useContext } from "react"
import MyContext from "../components/MyContext"
import Button from "../components/Button"
import Navbar from "../components/Navbar"
import Switch from "../components/Switch"

import "./Scripts.scss"
import axios from "axios"
import CardScenario from "../components/CardScenario"
import FilterSelect from "../components/FilterSelect"

import TitleScripts from "../assets/SCRIPTS.png"

import { difficulty, numberPlayers } from "../assets/variables/variables"
import CardCampaign from "../components/CardCampaign"

function Scripts() {
  const [originalScenarios, setOriginalScenarios] = useState([])
  const [scenarios, setScenarios] = useState([])
  const [filteredScenarios, setFilteredScenarios] = useState([])
  const [filteredAuteur, setFilteredAuteur] = useState([])
  const [auteurs, setAuteurs] = useState([])
  const [valueAuteur, setValueAuteur] = useState("---")
  const [valueDifficulty, setValueDifficulty] = useState("---")
  const [valueNumberPlayer, setValueNumberPlayer] = useState("---")
  const [roleGames, setRoleGames] = useState([])
  const [themes, setThemes] = useState([])
  const [valueRoleGame, setValueRoleGame] = useState("---")
  const [valueTheme, setValueTheme] = useState(null)
  const [valueType, setValueType] = useState(false)
  const [type, setType] = useState([])
  const [typeScenarios, setTypeScenarios] = useState([])
  const [campagnes, setCampagnes] = useState([])
  const { user } = useContext(MyContext)
  const [isChecked, setIsChecked] = useState(valueType === "one shot")
  const [detailedCampagnes, setDetailedCampagnes] = useState([])
  // -----------------------------------------------------------------------------------
  // ----fonction filters

  const handleChangeDifficulty = (e) => {
    setValueDifficulty(e.target.value)
  }

  const handleChangeNumberPlayer = (e) => {
    setValueNumberPlayer(e.target.value)
  }

  const handleChangeRoleGame = (e) => {
    setValueRoleGame(e.target.value)
  }

  const handleNewest = () => {}

  const handleScenariosFilter = () => {
    //  const newScenarios = originalScenarios
    let newScenarios = JSON.parse(JSON.stringify(originalScenarios))
    // duplication d'un tableau sans pointer vers la meme reference

    if (valueAuteur !== "---") {
      const auteurID = auteurs.filter(
        (auteur) => auteur.name === valueAuteur
      )[0].id
      newScenarios = newScenarios.filter(
        (scenario) => scenario.auteurId === auteurID
      )
    }

    if (valueDifficulty !== "---") {
      newScenarios = newScenarios.filter(
        (scenario) => scenario.level === valueDifficulty
      )
    }

    if (valueNumberPlayer !== "---") {
      if (valueNumberPlayer === "+10") {
        newScenarios = newScenarios.filter(
          (scenario) => parseInt(scenario.nb_players_min) === 10
        )
      } else {
        newScenarios = newScenarios.filter(
          (scenario) =>
            parseInt(scenario.nb_players_min, 10) ===
            parseInt(valueNumberPlayer, 10)
        )
      }
    }

    if (valueRoleGame !== "---") {
      const roleGameID = roleGames.filter(
        (game) => game.name === valueRoleGame
      )[0].id

      newScenarios = newScenarios.filter(
        (scenario) =>
          parseInt(scenario.jeux_de_roleId, 10) === parseInt(roleGameID, 10)
      )
    }

    if (valueTheme !== null) {
      newScenarios = newScenarios.filter(
        (scenario) => scenario.theme === valueTheme
      )
    }

    if (valueType) {
      newScenarios = newScenarios.filter(
        (scenario) => scenario.type === valueType
      )
    }

    setScenarios(newScenarios)
  }

  // -----------------------------------------------------------------------------------
  useEffect(() => {
    axios.get("http://localhost:4242/scenarios").then((res) => {
      setScenarios(res.data)
      setOriginalScenarios(res.data)
    })

    axios
      .get("http://localhost:4242/rolegames")
      .then(({ data }) => setRoleGames(data))
      .catch((err) => console.error(err))

    axios
      .get("http://localhost:4242/themes")
      .then(({ data }) => setThemes(data))
      .catch((err) => console.error(err))

    axios
      .get("http://localhost:4242/campagnesMulti")
      .then(({ data }) => setCampagnes(data))
      .catch((err) => console.error(err))

    axios
      .get("http://localhost:4242/detailedCampagnes")
      .then(({ data }) => setDetailedCampagnes(data))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    handleScenariosFilter()
  }, [
    valueAuteur,
    valueDifficulty,
    valueNumberPlayer,
    valueRoleGame,
    valueTheme,
    valueType,
  ])
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    setIsChecked(valueType === "one shot")

    handleScenariosFilter()
  }, [])
  // ------------------------------------------------------------------------------------------------
  return (
    <div className="containerScripts">
      <Navbar />
      <header>
        <img src={TitleScripts}></img>
      </header>
      <div className="all">
        <div className="Filter">
          <div className="Type">
            <p>One Shot</p>
            {/* <label className="switch">
              <input type="checkbox"></input>
              <span className="slider"></span>
            </label> */}
            <Switch
              scenarios={scenarios}
              setValueType={setValueType}
              valueType={valueType}
              type={type}
              setType={setType}
              typeScenarios={typeScenarios}
              setTypeScenarios={setTypeScenarios}
              setCampagnes={setCampagnes}
              campagnes={campagnes}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
            <p>Campaign</p>
          </div>
          <div className="Button">
            <p className="titleTheme">Themes</p>
            <Button
              scenarios={scenarios}
              filteredScenarios={filteredScenarios}
              setFilteredScenarios={setFilteredScenarios}
              themes={themes}
              setThemes={setThemes}
              valueTheme={valueTheme}
              setValueTheme={setValueTheme}
            />
          </div>
          <div className="containerSelect">
            <div className="univers">
              <p>Universe</p>
              <select value={valueRoleGame} onChange={handleChangeRoleGame}>
                <option>---</option>
                {roleGames[0] &&
                  roleGames.map((roleGame) => (
                    <option key={roleGame.id}>{roleGame.name}</option>
                  ))}
              </select>
            </div>
            <div className="auteur">
              <p>Autor</p>
              <FilterSelect
                scenarios={scenarios}
                filteredAuteur={filteredAuteur}
                setFilteredAuteur={setFilteredAuteur}
                auteurs={auteurs}
                setAuteurs={setAuteurs}
                valueAuteur={valueAuteur}
                setValueAuteur={setValueAuteur}
              />
            </div>
            <div className="Difficultes">
              <p>Difficulty</p>
              <select value={valueDifficulty} onChange={handleChangeDifficulty}>
                <option>---</option>
                {difficulty.map((item) => (
                  <option key={item.id}>{item.nameDiff}</option>
                ))}
              </select>
            </div>
            <div className="nombre">
              <p>Number of player min.</p>
              <select
                value={valueNumberPlayer}
                onChange={handleChangeNumberPlayer}
              >
                <option>---</option>
                {numberPlayers.map((item) => (
                  <option key={item.id}>{item.rank}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="conseiller">
            <button onClick={handleNewest}>The news</button>
            <button>The most popular</button>
            <button>All scenarios</button>
          </div>
        </div>
        <div className="try">
          <div className="filtered-scenarios">
            {scenarios.map((scenario) => (
              <div key={scenario.id}>
                <CardScenario user={user} scenario={scenario} />
              </div>
            ))}
            {/* {isChecked
              ? scenarios.map((scenario) => (
                  <div key={scenario.id}>
                    <CardScenario user={user} scenario={scenario} />
                  </div>
                ))
              : campagnes.map((campagne) => (
                  <div key={campagne.id}>
                    <CardCampaign user={user} campaign={campagne} />
                  </div>
                ))} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scripts
