import React, { useState, useEffect } from "react"

import Button from "../components/Button"
import Navbar from "../components/Navbar"
// import Switch from "../components/Switch"

import "./Scripts.scss"
import axios from "axios"
import CardScenario from "../components/CardScenario"

function Scripts({ filteredScenarios }) {
  const [scenarios, setScenarios] = useState([])
  const [exportedResult, setExportedResult] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:4242/scenarios")
      .then((res) => setScenarios(res.data) || console.info(res.data))
  }, [])
  function handleExportedResult(result) {
    setExportedResult(result)
  }
  // const [selectedId, setSelectedId] = useState(1)
  // const [selectedGenre, setSelectedGenre] = useState("")
  // const [sortedExamples, setSortedExamples] = useState([...examples])
  // const [selectedDate, setSelectedDate] = useState(null)
  // const [sortedVue, setSortedVue] = useState([...examples])

  // const handleSwitch = () => {
  //   setSelectedId((prevSelectedId) => (prevSelectedId === 1 ? 2 : 1))
  // }

  // const handleGenreSelect = (theme) => {
  //   setSelectedGenre(theme)
  // }
  // const handleNewest = () => {
  //   const sortedItems = [...sortedExamples].sort(
  //     (a, b) => new Date(b.date) - new Date(a.date)
  //   )
  //   setSortedExamples(sortedItems)
  //   setSelectedDate(sortedItems[0])
  // }

  // const handleView = () => {
  //   const sortedItem = [...sortedExamples].sort(
  //     (a, b) => parseInt(b.vue) - parseInt(a.vue)
  //   )
  //   setSortedVue(sortedItem)
  // }

  // const mostViewed = sortedVue.length > 0 ? sortedVue[0] : null

  // const selectedData = examples.find((data) => data.id === selectedId)

  return (
    <div className="container">
      <Navbar />
      <header className="Title">
        <h1 className="Scripts">Scripts-Scripts-Scripts-Scripts</h1>
      </header>
      <div className="all">
        <div className="Filter">
          <div className="Type">
            <p>One Shot</p>
            <label className="switch">
              <input type="checkbox"></input>
              <span className="slider"></span>
            </label>
            <p>Campagne</p>
          </div>
          <div className="Button">
            <div>
              <Button
                scenarios={scenarios}
                filteredScenarios={filteredScenarios}
                onExportResult={handleExportedResult}
              />
            </div>
          </div>
          <div className="conseiller">
            <button>The newest</button>
            <button>Most populare</button>
            <button>All scénarios</button>
          </div>
          <div className="univers">
            <p>UNIVERSE</p>
          </div>
          <div className="auteur">
            <p>Autor</p>
            <select></select>
          </div>
          <div className="Difficultes">
            <p>Difficulty</p>
            <select></select>
          </div>
          <div className="nombre">
            <p>Number of player</p>
            <select></select>
          </div>
        </div>
        <div className="try">
          {/* <div className="Card">
            {scenarios.map((scenario) => (
              <div key={scenario.id}>
                <CardScenario scenario={scenario} />
              </div>
            ))}
          </div> */}
          {exportedResult && (
            <div className="filtered-scenarios">
              {filteredScenarios.map((scenario) => (
                <div key={scenario.id}>
                  <CardScenario scenario={scenario} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Scripts
