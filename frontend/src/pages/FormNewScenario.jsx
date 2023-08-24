import "./FormNewScenario.scss"
// import { useState, useEffect } from "react"
import { useState } from "react"

const universRoleGame = [
  {
    id: 1,
    name: "Alien",
  },
  {
    id: 2,
    name: "Battlestar Galactica",
  },
  {
    id: 3,
    name: "Buffy the Vampire Slayer",
  },
  {
    id: 4,
    name: "Cadillacs & Dinosaurs",
  },
  {
    id: 5,
    name: "Cyberpunk 2077",
  },
  {
    id: 6,
    name: "Dungeons and Dragons",
  },
  {
    id: 7,
    name: "EverQuest",
  },
  {
    id: 8,
    name: "James Bond 007",
  },
  {
    id: 9,
    name: "L'Appel de Cthulhu",
  },
  {
    id: 10,
    name: "Les Trois Mousquetaires",
  },
  {
    id: 11,
    name: "Lanfeust de Troy",
  },
  {
    id: 12,
    name: "Légendes de la Table ronde",
  },
  {
    id: 13,
    name: "Lord of the Ring",
  },
  {
    id: 14,
    name: "Mass Effect",
  },
  {
    id: 15,
    name: "Men in Black",
  },
  {
    id: 16,
    name: "Prédateurs",
  },
  {
    id: 17,
    name: "Star Wars",
  },
  {
    id: 18,
    name: "Warhammer",
  },
  {
    id: 19,
    name: "Yggdrasill",
  },
]

const numberPlayers = [
  {
    id: 1,
    rank: "1",
  },
  {
    id: 2,
    rank: "2",
  },
  {
    id: 3,
    rank: "3",
  },
  {
    id: 4,
    rank: "4",
  },
  {
    id: 5,
    rank: "5",
  },
  {
    id: 6,
    rank: "6",
  },
  {
    id: 7,
    rank: "7",
  },
  {
    id: 8,
    rank: "8",
  },
  {
    id: 9,
    rank: "9",
  },
  {
    id: 10,
    rank: "10",
  },
  {
    id: 11,
    rank: "+10",
  },
]

const difficulty = [
  {
    id: 1,
    nameDiff: "A little walk ?",
  },
  {
    id: 2,
    nameDiff: "Easy",
  },
  {
    id: 3,
    nameDiff: "Normal",
  },
  {
    id: 4,
    nameDiff: "Hard",
  },
  {
    id: 5,
    nameDiff: "You will suffer !",
  },
]

export default function FormNewScenario() {
  // const [author, setAuthor] = useState("default")
  const [roleGame, setRoleGame] = useState("default")
  // const [campagneId, setCampagneId] = useState("default")
  const [title, setTitle] = useState("default")
  const [playerNumberMin, setPlayerNumberMin] = useState(2)
  const [playerNumberMax, setPlayerNumberMax] = useState(2)
  const [type, setType] = useState("default")
  const [level, setLevel] = useState("Normal")
  // const [writingDateStart, setWritingDateStart] = useState(Date())
  // const [publicationDate, setPublicationDate] = useState("2099-31-12")
  const [picture, setPicture] = useState(null)
  const [description, setDescription] = useState("default")
  // const [model, setModel] = useState("default")
  const [pdfFile, setPdfFile] = useState(null)

  const handleChangeRoleGame = (e) => {
    setRoleGame(e.target.value)
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeNbPlayerMin = (e) => {
    setPlayerNumberMin(e.target.value)
  }

  const handleChangeNbPlayerMax = (e) => {
    setPlayerNumberMax(e.target.value)
  }

  const handleChangeLevel = (e) => {
    setLevel(e.target.value)
  }

  const handleChangePicture = (e) => {
    setPicture(e.target.value)
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleChangeType = (e) => {
    setType(e.target.value)
  }

  const handleChangepdfFile = (e) => {
    setPdfFile(e.target.value)
  }

  const handleSubmit = (e) => {
    // faire fonction pour envoyer au backend
  }

  // Ne pas oublier l'envoi de :
  // Author => recup lors de la connexion,
  // campagne id => recup lors de la creation du formulaire campagne,
  // writingDateStart => recup lors de l'envoie du formulaire à la bdd,
  // publicationDate => recup lors de la publication du ScenariosManager,

  return (
    <>
      <main>
        <div className="titleh2">
          <h2>Scenario Script</h2>
        </div>
        <div className="formGlobal">
          <div className="param">
            <p>Role Game or univers : {roleGame}</p>
            <select id="selectRoleGame" onChange={handleChangeRoleGame}>
              <option>---</option>
              {universRoleGame.map((univer) => (
                <option value={univer.name} key={univer.id}>
                  {univer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="param">
            <p>Title : {title}</p>
            <input
              type="text"
              placeholder="Titre de la campagne"
              onChange={handleChangeTitle}
            />
          </div>
          <div className="param">
            <p>Minimum number of player(s) : {playerNumberMin}</p>
            <select id="NumberPlayerMin" onChange={handleChangeNbPlayerMin}>
              <option>---</option>
              {numberPlayers.map((number) => (
                <option value={number.rank} key={number.id}>
                  {number.rank}
                </option>
              ))}
            </select>
          </div>
          <div className="param">
            <p>maximum number of players : {playerNumberMax}</p>
            <select id="NumberPlayerMax" onChange={handleChangeNbPlayerMax}>
              <option>---</option>
              {numberPlayers.map((number) => (
                <option value={number.rank} key={number.id}>
                  {number.rank}
                </option>
              ))}
            </select>
          </div>
          <div className="param">
            <p>Type of scenarios : {type}</p>
            <fieldset>
              <legend> Choose the type of scenario </legend>
              <div>
                <input
                  type="radio"
                  id="One Scenario only"
                  name="typeOfScenario"
                  value="Scenario one shot"
                  onChange={handleChangeType}
                />
                <label htmlFor="Scenario one shot">Scenario one shot</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="scenario in a campaign"
                  name="typeOfScenario"
                  value="Scenario in a campaign"
                  onChange={handleChangeType}
                />
                <label htmlFor="Scenario in a campaign">
                  Scenario in a campaign
                </label>
              </div>
            </fieldset>
          </div>
          <div className="param">
            <p>Level : {level} </p>
            <select id="ScenarLevel" onChange={handleChangeLevel}>
              <option>---</option>
              {difficulty.map((grade) => (
                <option value={grade.nameDiff} key={grade.id}>
                  {grade.nameDiff}
                </option>
              ))}
            </select>
          </div>
          <div className="param">
            <p>Picture : {picture}</p>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleChangePicture}
            />
          </div>
          <div className="param">
            <p>Scenario synopsys : {description}</p>
            <textarea onChange={handleChangeDescription} />
          </div>
          <div className="param">
            <p>model</p>
          </div>
          <div className="param">
            <p>Do you have a pdf file of your scenario ? {pdfFile}</p>
            <input type="file" accept=".pdf" onChange={handleChangepdfFile} />
          </div>
        </div>
        <div className="submit">
          <input type="submit" onChange={handleSubmit} />
        </div>
      </main>
    </>
  )
}
