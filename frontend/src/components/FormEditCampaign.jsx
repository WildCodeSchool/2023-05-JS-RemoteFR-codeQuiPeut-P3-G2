import myApi from "../services/myAPI"

import { useState, useEffect } from "react"

import imgDefaultScenario from "../assets/images/defoscenario.png"

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

export default function FormEditCampaign({
  campaignID,
  setShowEditCampaign,
  setEditedCampagneEditor,
}) {
  const [editedCampaign, setEditedCampaign] = useState({})
  // const [author, setAuthor] = useState("Undefined")
  const [roleGame, setRoleGame] = useState([])
  const [valueRoleGame, setValueRoleGame] = useState()
  const [themes, setThemes] = useState([])
  const [valueTheme, setValueTheme] = useState()
  // const [campagneId, setCampagneId] = useState("Undefined")
  const [campaignName, setCampaignName] = useState()
  const [playerNumberMin, setPlayerNumberMin] = useState()
  const [playerNumberMax, setPlayerNumberMax] = useState()
  // const [typeScenario, setTypeScenario] = useState("Undefined")
  const [levelScenario, setLevelScenario] = useState()

  const [pictureScenario, setPictureScenario] = useState()
  const [synopsis, setSynopsis] = useState()

  const handleChangeRoleGame = (e) => {
    setValueRoleGame(e.target.value)
  }

  const handleChangeTheme = (e) => {
    setValueTheme(e.target.value)
  }

  const handleChangeTitle = (e) => {
    setCampaignName(e.target.value)
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
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    if (pictureScenario === "none") {
      myApi
        .post("/tmpImage", formData)
        .then(({ data }) => console.info(data) || setPictureScenario(data))
    } else {
      myApi.delete("/deleteTmpImage", {
        data: {
          img_src: pictureScenario,
        },
      })
      myApi
        .post("/tmpImage", formData)
        .then(({ data }) => console.info(data) || setPictureScenario(data))
    }
  }

  const handleChangeDescription = (e) => {
    setSynopsis(e.target.value)
  }

  const HandleClickClose = () => {
    setShowEditCampaign(false)
  }

  const handleSubmit = (e) => {
    const roleGameID = roleGame.filter((game) => game.name === valueRoleGame)[0]
      .id
    const themeID = themes.filter((theme) => theme.name === valueTheme)[0].id
    const startWritingdate = editedCampaign.start_writing_date.slice(0, 10)
    const publicationDate = editedCampaign.publication_date.slice(0, 10)

    myApi.put(`/campagnes/${editedCampaign.id}`, {
      auteurs_id: editedCampaign.auteurs_id, // author
      jeux_de_role_id: roleGameID,
      name: campaignName,
      nb_player_min: playerNumberMin,
      nb_player_max: playerNumberMax,
      level: levelScenario,
      start_writing_date: startWritingdate,
      publication_date: publicationDate,
      img: pictureScenario,
      synopsis,
    })

    myApi.put(`/themesCampagnes/${editedCampaign.id}`, {
      campagnes_id: editedCampaign.id,
      themes_id: themeID,
    })

    setEditedCampagneEditor((prevState) => ({
      ...prevState,
      name: campaignName,
    }))
    setShowEditCampaign(false)
  }

  useEffect(() => {
    myApi
      .get(`/campagnes/${campaignID}`)
      .then(({ data }) => {
        setEditedCampaign(data)
        return data
      })
      .then((campaign) => {
        setSynopsis(campaign.synopsis)
        setCampaignName(campaign.name)
        setPlayerNumberMin(campaign.nb_player_min)
        setPlayerNumberMax(campaign.nb_player_max)
        setPictureScenario(campaign.img)
        setLevelScenario(campaign.level)
        setValueTheme(campaign.theme_name)

        return campaign
      })
      .then((campaign) => {
        myApi
          .get("/rolegames")
          .then(({ data }) => {
            setRoleGame(data)
            setValueRoleGame(
              data.filter((game) => game.id === campaign.jeux_de_role_id)[0]
                .name
            )
          })
          .catch((err) => console.error(err))

        myApi
          .get("/themes")
          .then(({ data }) => {
            setThemes(data)
          })
          .catch((err) => console.error(err))
      })
  }, [])

  return (
    <>
      <main className="mainFormNewScenario">
        <div className="formGlobal">
          <div className="titleh2">
            <h2>Campaign Edition</h2>
          </div>
          <div className="params">
            <div className="form-flexRow">
              <div className="form-flexColumn">
                <p>Role Game / universe</p>
                <select
                  className="inputSelect"
                  onChange={handleChangeRoleGame}
                  value={valueRoleGame}
                >
                  <option>---</option>
                  {roleGame.map((univer) => (
                    <option value={univer.name} key={univer.id}>
                      {univer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-flexColumn">
                <p>Theme</p>
                <select
                  className="inputSelect"
                  onChange={handleChangeTheme}
                  value={valueTheme}
                >
                  <option>---</option>
                  {themes.map((theme) => (
                    <option value={theme.name} key={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-flexRow">
              <div className="form-flexColumn">
                <p>Title</p>
                <input
                  className="inputText"
                  type="text"
                  placeholder="Titre de la campagne"
                  value={campaignName}
                  onChange={handleChangeTitle}
                />
              </div>

              <div className="form-flexColumn">
                <p>Difficulty</p>
                <select
                  className="inputSelect"
                  onChange={handleChangeLevel}
                  value={levelScenario}
                >
                  <option>---</option>
                  {difficulty.map((grade) => (
                    <option value={grade.nameDiff} key={grade.id}>
                      {grade.nameDiff}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-flexRow">
              <p className="p-numberPlayer">Number of players</p>
              <div className="form-flexColumn">
                <p>Minimum</p>
                <select
                  className="NumberPlayer"
                  onChange={handleChangeNbPlayerMin}
                  value={playerNumberMin}
                >
                  <option>---</option>
                  {numberPlayers.map((number) => (
                    <option value={number.rank} key={number.id}>
                      {number.rank}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-flexColumn">
                <p>Maximum</p>
                <select
                  className="NumberPlayer"
                  onChange={handleChangeNbPlayerMax}
                  value={playerNumberMax}
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

            <div className="param-pictureScenar">
              <p>Campaign's picture</p>

              <div className="form-chooseApicture">
                <label
                  htmlFor="inputFileFormNewScenario"
                  className="cursorHover"
                >
                  Choose a file
                </label>
                <input
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleChangePicture}
                  id="inputFileFormNewScenario"
                />

                {pictureScenario === "none" ? (
                  <img src={imgDefaultScenario} alt="Picture of Scenario" />
                ) : (
                  <img src={pictureScenario} alt="Picture of Scenario" /> // A modifier la src !!!
                )}
              </div>
            </div>

            <div className="form-container-synopsis">
              <p>Scenario synopsys</p>
              <textarea
                placeholder="Resume here"
                maxLength="2000"
                onChange={handleChangeDescription}
                value={synopsis}
              />
            </div>
          </div>
          <div className="submitScenar">
            <button
              type="button"
              onClick={handleSubmit}
              className="cursorHover"
            >
              Send
            </button>
            <button
              type="button"
              onClick={HandleClickClose}
              className="cursorHover"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
