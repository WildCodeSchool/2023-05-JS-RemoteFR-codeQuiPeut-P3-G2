import React, { useState, useEffect, useContext } from "react"
import MyContext from "../components/MyContext"
import Button from "../components/Button"
import Navbar from "../components/Navbar"
import Switch from "../components/Switch"
import "./Scripts.scss"
import myApi from "../services/myAPI"

import CardScenario from "../components/CardScenario"
import FilterSelect from "../components/FilterSelect"
import Footer from "../components/Footer"
// import TitleScripts from "../assets/SCRIPTS.png"
import { difficulty, numberPlayers } from "../assets/variables/variables"
import Reset from "../assets/reset.png"
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
  const [originalCampagnes, setOrginalCampagnes] = useState([])
  const [scenariosCampaignType, setScenariosCampaignType] = useState("one shot")
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

  const handleNewest = async () => {
    await handleReset()
    let newScenarios = JSON.parse(JSON.stringify(originalScenarios))
    let newCampaigns = JSON.parse(JSON.stringify(originalCampagnes))

    newScenarios = newScenarios
      .sort((a, b) => b.id - a.id)
      .filter((item, index) => index < 5)

    setScenarios(newScenarios)
    newCampaigns = newCampaigns
      .sort((a, b) => b.id - a.id)
      .filter((item, index) => index < 3)

    setCampagnes(newCampaigns)
    // setThemes((prevstate) =>
    //   prevstate.map((item) => ({ ...item, selected: false }))
    // )
  }

  const handleMostPopular = async () => {
    await handleReset()
    let newScenarios = JSON.parse(JSON.stringify(originalScenarios))
    let newCampaigns = JSON.parse(JSON.stringify(originalCampagnes))

    newScenarios = newScenarios
      .sort((a, b) => b.nbVues - a.nbVues)
      .filter((item, index) => index < 4)

    setScenarios(newScenarios)

    newCampaigns = newCampaigns
      .sort((a, b) => b.nbVues - a.nbVues)
      .filter((item, index) => index < 2)

    setCampagnes(newCampaigns)
    // setThemes((prevstate) =>
    //   prevstate.map((item) => ({ ...item, selected: false }))
    // )
  }

  const handleClickAll = () => {
    handleReset()
    setScenarios(originalScenarios)
    setCampagnes(originalCampagnes)
  }
  const handleScenariosFilter = () => {
    //  const newScenarios = originalScenarios
    let newScenarios = JSON.parse(JSON.stringify(originalScenarios))
    let newCampaigns = JSON.parse(JSON.stringify(originalCampagnes))
    // duplication d'un tableau sans pointer vers la meme reference

    if (valueAuteur !== "---") {
      const auteurID = auteurs.filter(
        (auteur) => auteur.name === valueAuteur
      )[0].id
      newScenarios = newScenarios.filter(
        (scenario) => scenario.auteurId === auteurID
      )
      newCampaigns = newCampaigns.filter(
        (campagne) => campagne.auteurs_id === auteurID
      )
    }

    if (valueDifficulty !== "---") {
      newScenarios = newScenarios.filter(
        (scenario) => scenario.level === valueDifficulty
      )
      newCampaigns = newCampaigns.filter(
        (campagne) => campagne.level === valueDifficulty
      )
    }

    if (valueNumberPlayer !== "---") {
      if (valueNumberPlayer === "+10") {
        newScenarios = newScenarios.filter(
          (scenario) => parseInt(scenario.nb_players_min) === 10
        )
        newCampaigns = newCampaigns.filter(
          (campagne) => parseInt(campagne.nb_players_min) === 10
        )
      } else {
        newScenarios = newScenarios.filter(
          (scenario) =>
            parseInt(scenario.nb_player_min, 10) <=
              parseInt(valueNumberPlayer, 10) &&
            parseInt(scenario.nb_player_max, 10) >=
              parseInt(valueNumberPlayer, 10)
        )

        newCampaigns = newCampaigns.filter(
          (campagne) =>
            parseInt(campagne.nb_player_min, 10) <=
              parseInt(valueNumberPlayer, 10) &&
            parseInt(campagne.nb_player_max, 10) >=
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
      newCampaigns = newCampaigns.filter(
        (campagne) =>
          parseInt(campagne.jeux_de_roleId, 10) === parseInt(roleGameID, 10)
      )
    }

    // if (valueTheme !== null) {
    //   newScenarios = newScenarios.filter(
    //     (scenario) => scenario.theme === valueTheme
    //   )
    //   newCampaigns = newCampaigns.filter(
    //     (campagne) => campagne.theme === valueTheme
    //   )
    // }

    let themeFilter = themes.filter((theme) => theme.selected)

    if (themeFilter.length > 0) {
      themeFilter = themeFilter.map((theme) => theme.name)
      newScenarios = newScenarios.filter((scenario) =>
        themeFilter.includes(scenario.theme)
      )
      newCampaigns = newCampaigns.filter((campaign) =>
        themeFilter.includes(campaign.theme)
      )
    }

    setScenarios(newScenarios)
    setCampagnes(newCampaigns)
  }

  const handleReset = () => {
    setValueAuteur("---")
    setValueNumberPlayer("---")
    setValueDifficulty("---")
    setValueRoleGame("---")
    setThemes((prevstate) =>
      prevstate.map((item) => ({ ...item, selected: false }))
    )
  }
  // -----------------------------------------------------------------------------------
  useEffect(() => {
    myApi.get("/scenariosOneshot").then((res) => {
      setScenarios(res.data)
      setOriginalScenarios(res.data)
    })

    myApi
      .get("/rolegames")
      .then(({ data }) => setRoleGames(data))
      .catch((err) => console.error(err))

    myApi
      .get("/themes")
      .then(({ data }) => {
        const newThemes = data.map((item) => ({ ...item, selected: false }))
        setThemes(newThemes)
      })
      .catch((err) => console.error(err))

    myApi
      .get("/detailedCampagnes")
      .then(({ data }) => {
        setCampagnes(data)
        setOrginalCampagnes(data)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    handleScenariosFilter()
  }, [
    valueAuteur,
    valueDifficulty,
    valueNumberPlayer,
    valueRoleGame,
    themes,
    valueType,
  ])
  // ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------
  return (
    <div className="containerScripts">
      <Navbar />
      <header>
        {/* <img src={TitleScripts}></img>
        <img src={TitleScripts}></img> */}
        <p>SCRIPTS-SCRIPTS-SCRIPTS-SCRIPTS-SCRIPTS-</p>
        <p>SCRIPTS-SCRIPTS-SCRIPTS-SCRIPTS-SCRIPTS-</p>
      </header>
      <div className="all">
        <div className="Filter">
          <div className="containerType">
            <div className="Type">
              <p>One Shot</p>
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
                scenariosCampaignType={scenariosCampaignType}
                setScenariosCampaignType={setScenariosCampaignType}
              />
              <p>Campaign</p>
            </div>
          </div>
          <div className="conseiller">
            <button onClick={handleNewest} className="cursorHover">
              The news
            </button>
            <button onClick={handleMostPopular} className="cursorHover">
              The most popular
            </button>
            <button onClick={handleClickAll} className="cursorHover">
              {scenariosCampaignType === "one shot"
                ? "All scenarios"
                : "All campaigns"}
            </button>
          </div>

          <div className="containerSelect">
            <div className="univers">
              <p>Universe</p>
              <select
                value={valueRoleGame}
                onChange={handleChangeRoleGame}
                className="cursorHover"
              >
                <option>---</option>
                {roleGames[0] &&
                  roleGames.map((roleGame) => (
                    <option key={roleGame.id}>{roleGame.name}</option>
                  ))}
              </select>
            </div>
            <div className="auteur">
              <p>Author</p>
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
              <select
                value={valueDifficulty}
                onChange={handleChangeDifficulty}
                className="cursorHover"
              >
                <option>---</option>
                {difficulty.map((item) => (
                  <option key={item.id}>{item.nameDiff}</option>
                ))}
              </select>
            </div>
            <div className="nombre">
              <p>Number of player</p>
              <select
                value={valueNumberPlayer}
                onChange={handleChangeNumberPlayer}
                className="cursorHover"
              >
                <option>---</option>
                {numberPlayers.map((item) => (
                  <option key={item.id}>{item.rank}</option>
                ))}
              </select>
            </div>
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
          <button
            className="buttonReset cursorHover"
            type="button"
            onClick={handleReset}
          >
            <img src={Reset}></img>
          </button>
        </div>
        <div className="try">
          <div className="filtered-scenarios">
            {scenariosCampaignType === "one shot"
              ? scenarios.map((scenario) => (
                  <div key={scenario.id}>
                    <CardScenario user={user} scenario={scenario} />
                  </div>
                ))
              : campagnes.map((campagne) => (
                  <div key={campagne.id}>
                    <CardCampaign user={user} campaign={campagne} />
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Scripts
