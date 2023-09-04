import React, { useState } from "react"

import Button from "../components/Button"
import Navbar from "../components/Navbar"
// import Switch from "../components/Switch"

import "./Scripts.scss"
// import axios from "axios"

function Scripts() {
  const examples = [
    {
      id: 1,
      name: "scenario1",
      genre: "horreur",
      date: "01-01-2020",
      vue: "96",
    },
    {
      id: 2,
      name: "campagne1",
      genre: "fantaisy",
      date: "01-01-2023",
      vue: "80",
    },
  ]

  // useEffect(() => {
  //   axios.get("http://localhost:4242/scenario").then(({ data }) => {
  //     return console.info({ data })
  //   })
  // }, [])

  const [selectedId, setSelectedId] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState("")
  const [sortedExamples, setSortedExamples] = useState([...examples])
  const [selectedDate, setSelectedDate] = useState(null)
  const [sortedVue, setSortedVue] = useState([...examples])

  const handleSwitch = () => {
    setSelectedId((prevSelectedId) => (prevSelectedId === 1 ? 2 : 1))
  }

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre)
  }
  const handleNewest = () => {
    const sortedItems = [...sortedExamples].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
    setSortedExamples(sortedItems)
    setSelectedDate(sortedItems[0])
  }

  const handleView = () => {
    const sortedItem = [...sortedExamples].sort(
      (a, b) => parseInt(b.vue) - parseInt(a.vue)
    )
    setSortedVue(sortedItem)
  }

  const mostViewed = sortedVue.length > 0 ? sortedVue[0] : null

  const selectedData = examples.find((data) => data.id === selectedId)

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
              <input type="checkbox" onChange={handleSwitch}></input>
              <span className="slider"></span>
            </label>
            <p>Campagne</p>
          </div>
          <div className="Button">
            <div>
              <Button
                selectedGenre={selectedGenre}
                onGenreSelect={handleGenreSelect}
              />
            </div>
          </div>
          <div className="conseiller">
            <button onClick={handleNewest}>The newest</button>
            <button onClick={handleView}>Most populare</button>
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
          <p>{selectedData && selectedData.name}</p>
          <p>{selectedGenre && `${selectedGenre}`}</p>
          <p>{selectedDate && selectedDate.date}</p>
          <p>{sortedVue && mostViewed.vue}</p>
        </div>
      </div>
    </div>
  )
}

export default Scripts
