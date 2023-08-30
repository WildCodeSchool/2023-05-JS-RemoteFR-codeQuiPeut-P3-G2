import axios from "axios"
import { useState, useEffect } from "react"

import "./FormNewScenario.scss"

import imgDefaultScenario from "../assets/images/auberge-banner.jpg"

// const universRoleGame = [
//   {
//     id: 1,
//     name: "Alien",
//   },
//   {
//     id: 2,
//     name: "Battlestar Galactica",
//   },
//   {
//     id: 3,
//     name: "Buffy the Vampire Slayer",
//   },
//   {
//     id: 4,
//     name: "Cadillacs & Dinosaurs",
//   },
//   {
//     id: 5,
//     name: "Cyberpunk 2077",
//   },
//   {
//     id: 6,
//     name: "Dungeons and Dragons",
//   },
//   {
//     id: 7,
//     name: "EverQuest",
//   },
//   {
//     id: 8,
//     name: "James Bond 007",
//   },
//   {
//     id: 9,
//     name: "L'Appel de Cthulhu",
//   },
//   {
//     id: 10,
//     name: "Les Trois Mousquetaires",
//   },
//   {
//     id: 11,
//     name: "Lanfeust de Troy",
//   },
//   {
//     id: 12,
//     name: "Légendes de la Table ronde",
//   },
//   {
//     id: 13,
//     name: "Lord of the Ring",
//   },
//   {
//     id: 14,
//     name: "Mass Effect",
//   },
//   {
//     id: 15,
//     name: "Men in Black",
//   },
//   {
//     id: 16,
//     name: "Prédateurs",
//   },
//   {
//     id: 17,
//     name: "Star Wars",
//   },
//   {
//     id: 18,
//     name: "Warhammer",
//   },
//   {
//     id: 19,
//     name: "Yggdrasill",
//   },
// ]

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
  // const [author, setAuthor] = useState("Undefined")
  const [roleGame, setRoleGame] = useState([])
  // const [campagneId, setCampagneId] = useState("Undefined")
  const [titleScenario, setTitleScenario] = useState("Undefined")
  const [playerNumberMin, setPlayerNumberMin] = useState("Undefined")
  const [playerNumberMax, setPlayerNumberMax] = useState("Undefined")
  // const [typeScenario, setTypeScenario] = useState("Undefined")
  const [levelScenario, setLevelScenario] = useState("Undefined")
  const [writingDateStart, setWritingDateStart] = useState(Date())
  const [publicationDate, setPublicationDate] = useState("3000-01-01")
  const [pictureScenario, setPictureScenario] = useState(null)
  const [descriptionScenario, setDescriptionScenario] = useState("Undefined")
  // const [monted, setMonted] = useState(false)

  // const handleClickOtionRoleGame = (id) => {
  //   console.log("test")
  //   setRoleGame((prevState) =>
  //     prevState.map((game) =>
  //       game.id === id
  //         ? { ...game, selected: true }
  //         : { ...game, selected: false }
  //     )
  //   )
  // }

  const handleChangeRoleGame = (e) => {
    setRoleGame((prevState) =>
      prevState.map((game) =>
        game.name === e.target.value
          ? { ...game, selected: true }
          : { ...game, selected: false }
      )
    )
  }

  const handleChangeTitle = (e) => {
    setTitleScenario(e.target.value)
  }

  const handleChangeNbPlayerMin = (e) => {
    setPlayerNumberMin(e.target.value)
  }

  const handleChangeNbPlayerMax = (e) => {
    setPlayerNumberMax(e.target.value)
  }

  const handleChangeLevel = (e) => {
    setLevelScenario(e.target.value)
  }

  const handleChangePicture = (e) => {
    setPictureScenario(e.target.value)
  }

  const handleChangeDescription = (e) => {
    setDescriptionScenario(e.target.value)
  }

  // const handleChangeType = (e) => {
  //   setTypeScenario(e.target.value)
  // }

  const getDateOfDay = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleSubmit = (e) => {
    const roleGameID = roleGame.filter((game) => game.selected === true)[0].id
    console.info("roleGameID", roleGameID)
    console.info("title", titleScenario)
    console.info("playerNumberMin", playerNumberMin)
    console.info("playerNumberMax", playerNumberMax)
    console.info("level", levelScenario)
    console.info("picture", pictureScenario)
    console.info("description", descriptionScenario)
    console.info("writingDateStart", writingDateStart)
    console.info("publicationDate", publicationDate)

    axios.post("http://localhost:4242/scenarios", {
      // authorID: 1,
      // jeuxDeRoleID: roleGameID,
      // campagnID: 1,
      // name: title,

      auteurs_id: 1, // author
      jeux_de_role_id: roleGameID,
      campagnes_id: 1, // A faire plus tard => campagneId
      name: titleScenario,
      nb_player_min: playerNumberMin,
      nb_player_max: playerNumberMax,
      level: levelScenario,
      start_writing_date: writingDateStart,
      publication_date: publicationDate,
      img: pictureScenario,
      description: descriptionScenario,
    })
  }

  // Ne pas oublier l'envoi de :
  // Author => recup lors de la connexion,
  // campagne id => recup lors de la creation du formulaire campagne,
  // writingDateStart => recup lors de l'envoie du formulaire à la bdd,
  // publicationDate => recup lors de la publication du ScenariosManager,

  useEffect(() => {
    axios
      .get("http://localhost:4242/rolegames")
      .then(({ data }) => setRoleGame(data))
      .catch((err) => console.error(err))
  }, [])

  // useEffect(() => {
  //   setMonted(true)
  // }, [])

  useEffect(() => {
    setWritingDateStart(getDateOfDay())
    setPublicationDate("3000-01-01") // Inutile mais pour eviter une erreur => A supprimer !
  }, [])

  return (
    <>
      <main className="mainFormNewScenario">
        <div className="formGlobal">
          <div className="titleh2">
            <h2>Form for creating new scenario :</h2>
          </div>
          <div className="params">
            <div className="param">
              <p>Role Game or univers :</p>
              <select className="inputSelect" onChange={handleChangeRoleGame}>
                <option>---</option>
                {roleGame.map((univer) => (
                  <option value={univer.name} key={univer.id}>
                    {univer.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="param">
              <p>Title : {titleScenario}</p>
              <input
                className="inputText"
                type="text"
                placeholder="Titre de la campagne"
                onChange={handleChangeTitle}
              />
            </div>
            <div className="param_playerScenar">
              <p>Number of player(s) :</p>
              <div>
                <div>
                  <p>Minimum : {playerNumberMin}</p>
                  <select
                    className="NumberPlayer"
                    onChange={handleChangeNbPlayerMin}
                  >
                    <option>---</option>
                    {numberPlayers.map((number) => (
                      <option value={number.rank} key={number.id}>
                        {number.rank}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="param_playerScenar">
                  <p>Maximum : {playerNumberMax}</p>
                  <select
                    className="NumberPlayer"
                    onChange={handleChangeNbPlayerMax}
                  >
                    <option>---</option>
                    {numberPlayers.map((number) => (
                      <option value={number.rank} key={number.id}>
                        {number.rank}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="param">
              <p>Level : {levelScenario} </p>
              <select className="inputSelect" onChange={handleChangeLevel}>
                <option>---</option>
                {difficulty.map((grade) => (
                  <option value={grade.nameDiff} key={grade.id}>
                    {grade.nameDiff}
                  </option>
                ))}
              </select>
            </div>
            <div className="param">
              <p>Picture :</p>
              {pictureScenario === null ? (
                <img src={imgDefaultScenario} alt="Picture of Scenario" />
              ) : (
                <img src={imgDefaultScenario} alt="Picture of Scenario" /> // A modifier la src !!!
              )}
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleChangePicture}
              />
            </div>
            <div className="param">
              <p>Scenario synopsys : {descriptionScenario}</p>
              <textarea
                placeholder="Resume here"
                maxLength="1000"
                onChange={handleChangeDescription}
              />
            </div>
          </div>
          <div className="submitScenar">
            <input type="submit" onClick={handleSubmit} />
          </div>
        </div>
      </main>
    </>
  )
}
