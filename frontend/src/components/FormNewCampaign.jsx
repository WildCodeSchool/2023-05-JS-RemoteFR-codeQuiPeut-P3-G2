import axios from "axios"
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

export default function FormNewCampaign(props) {
  const {
    setShowNewCampaign,
    authorID,
    setScenariosOfEditedCampagne,
    setPagesOfScenarioSelected,
    setImages,
    setPageFuture,
    setPageHistory,
    setTextes,
    setEditedCampagne,
    setCampagnesUtilisateur,
  } = props

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
  const [writingDateStart, setWritingDateStart] = useState(Date())
  const [publicationDate, setPublicationDate] = useState("3000-01-01")
  const [pictureScenario, setPictureScenario] = useState("none")
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
      axios
        .post("http://localhost:4242/tmpImage", formData)
        .then(({ data }) => console.info(data) || setPictureScenario(data))
    } else {
      axios.delete("http://localhost:4242/deleteTmpImage", {
        data: {
          img_src: pictureScenario,
        },
      })
      axios
        .post("http://localhost:4242/tmpImage", formData)
        .then(({ data }) => console.info(data) || setPictureScenario(data))
    }
  }

  const handleChangeDescription = (e) => {
    setSynopsis(e.target.value)
  }

  // ------------------------------------------------------------------
  // fonction pour ajouter une nouvelle page dans un scenario
  // ------------------------------------------------------------
  const handleClickButtonScript = async (newScenariosOfEditedCampagne) => {
    // on récupère l'id du scenario sélectionné
    const scenarioID = newScenariosOfEditedCampagne.filter(
      (scenario) => scenario.selected === true
    )[0].id

    // on demande un nom pour la page
    const pageName = "Rename me"

    // on attribue un numéro de page (numéro de la dernière page + 1)
    const pageNumber = 1

    // on post une nouvelle page dans la base de donnée (page_type_id = 1 car page script)
    axios
      .post(`http://localhost:4242/pages`, {
        scenarios_id: scenarioID,
        page_types_id: 1,
        titre: pageName,
        number: pageNumber,
      })
      .then(() => {
        // on récupère la page de la base de donnée avec son id et on l'ajoute dans le state pagesOfScenarioSelected
        axios
          .get(`http://localhost:4242/scenarios/${scenarioID}/pages`)
          .then(async ({ data }) => {
            data[data.length - 1].selected = true // on se place sur la page créée en la sélectionnant
            setPagesOfScenarioSelected(data)

            // on crée maintenant des textes prédéfinis pour la nouvelle page
            const pageID = data[data.length - 1].id
            const newTextes = []

            const textareaTitre = await handleNewTextarea(
              pageID,
              "60%",
              "4%",
              "5%",
              "5%",
              "Entrez un titre",
              "2rem",
              700,
              "left",
              newTextes,
              pageName
            )
            const textareaParagraphe = await handleNewTextarea(
              pageID,
              "90%",
              "15%",
              "5%",
              "10%",
              "Tapez votre texte",
              "1.25rem",
              400,
              "justify",
              textareaTitre
            )

            setTextes(textareaParagraphe) // textes du template
            setPageHistory(textareaParagraphe) // idem
            setPageFuture(textareaParagraphe) // idem
            setImages([])
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleNewTextarea = async (
    pageID,
    width,
    height,
    left,
    top,
    placeholder,
    fontSize,
    fontWeight,
    textAlign,
    newTextes,
    pageName
  ) => {
    await axios.post(
      `http://localhost:4242/pages/${pageID}/newtexteAtPageCreation`,
      {
        top,
        left,
        width,
        height,
        fontSize,
        fontWeight,
        textAlign,
      }
    )

    const { data } = await axios.get(`http://localhost:4242/lasttexte`)
    data.placeHolder = placeholder
    if (pageName) {
      data.text = pageName
    }
    newTextes = [...newTextes, data]

    return newTextes
  }

  // ----FIN SECTION-------------------------------------

  const getDateOfDay = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleSubmit = (e) => {
    const roleGameID = roleGame.filter((game) => game.name === valueRoleGame)[0]
      .id
    const themeID = themes.filter((theme) => theme.name === valueTheme)[0].id

    axios
      .post(`http://localhost:4242/campagnes`, {
        auteurs_id: authorID, // author
        jeux_de_role_id: roleGameID,
        name: campaignName,
        nb_player_min: playerNumberMin,
        nb_player_max: playerNumberMax,
        level: levelScenario,
        start_writing_date: writingDateStart,
        publication_date: publicationDate,
        img: pictureScenario,
        synopsis,
      })
      .then(async (res) => {
        const newCampaignID = res.data

        await axios.post(`http://localhost:4242/themesCampagnes`, {
          campagnes_id: newCampaignID,
          themes_id: themeID,
        })

        axios
          .get(`http://localhost:4242/auteurs/${authorID}/campagnes`)
          .then(({ data }) => {
            setCampagnesUtilisateur(data)
            const newEditedCampagne = data.filter(
              (campagne) => campagne.id === newCampaignID
            )[0]
            setEditedCampagne(newEditedCampagne)

            /// ///////////////////////////////////////////////////////////////////
            axios
              .post("http://localhost:4242/scenarios", {
                auteurs_id: authorID, // author
                jeux_de_role_id: roleGameID,
                campagnes_id: newCampaignID, // A faire plus tard => campagneId
                name: campaignName,
                nb_player_min: playerNumberMin,
                nb_player_max: playerNumberMax,
                level: levelScenario,
                start_writing_date: writingDateStart,
                publication_date: publicationDate,
                img: pictureScenario,
                type: "one shot",
                description: synopsis,
                model: 1, // a supprimer si table modifiée avec suppression de cette colonne
              })
              .then(async ({ data }) => {
                // post du theme du scenario
                await axios.post(`http://localhost:4242/themesScenarios/`, {
                  scenarios_id: data,
                  themes_id: themeID,
                })

                // récupération du scénario avec son ID
                axios
                  .get(`http://localhost:4242/scenarios/${data}`)
                  .then(({ data }) => {
                    // let newScenariosOfEditedCampagne =
                    //   scenariosOfEditedCampagne.map((scenario) => ({
                    //     ...scenario,
                    //     selected: false,
                    //   }))
                    // data.selected = true
                    // newScenariosOfEditedCampagne = [
                    //   ...newScenariosOfEditedCampagne,
                    //   data,
                    // ]
                    data.selected = true
                    const newScenariosOfEditedCampagne = [data]
                    setScenariosOfEditedCampagne(newScenariosOfEditedCampagne)

                    return newScenariosOfEditedCampagne
                  })
                  .then((newScenariosOfEditedCampagne) => {
                    handleClickButtonScript(newScenariosOfEditedCampagne)
                  })
              })
            /// ///////////////////////////////////////////////////////////////////
          })
          .catch((err) => console.error(err))
      })

    setShowNewCampaign(false)
  }

  useEffect(() => {
    axios
      .get("http://localhost:4242/rolegames")
      .then(({ data }) => {
        setRoleGame(data)
      })
      .catch((err) => console.error(err))

    axios
      .get("http://localhost:4242/themes")
      .then(({ data }) => {
        setThemes(data)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    setWritingDateStart(getDateOfDay())
    setPublicationDate("3000-01-01") // Inutile mais pour eviter une erreur => A supprimer !
  }, [])

  return (
    <>
      <main className="mainFormNewScenario">
        <div className="formGlobal">
          <div className="titleh2">
            <h2>Campaign Starting</h2>
          </div>
          <div className="params">
            <div className="form-flexRow">
              <div className="form-flexColumn">
                <p>Role Game / universe :</p>
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
                <p>Theme :</p>
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
                <p>Title :</p>
                <input
                  className="inputText"
                  type="text"
                  placeholder="Titre de la campagne"
                  value={campaignName}
                  onChange={handleChangeTitle}
                />
              </div>

              <div className="form-flexColumn">
                <p>Difficulty :</p>
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
              <p className="p-numberPlayer">Number of players :</p>
              <div>
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
            </div>

            <div className="param-pictureScenar">
              <p>Presentation picture of the scenario :</p>

              <div className="form-chooseApicture">
                <label htmlFor="inputFileFormNewScenario">Choose a file</label>
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
              <p>Scenario synopsys :</p>
              <textarea
                placeholder="Resume here"
                maxLength="2000"
                onChange={handleChangeDescription}
                value={synopsis}
              />
            </div>
          </div>
          <div className="submitScenar">
            <button type="button" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
