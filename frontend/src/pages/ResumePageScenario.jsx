import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { useLocation } from "react-router-dom"
import MyContext from "../components/MyContext"
// import Navbar from "../components/Navbar"
import axios from "axios"
// import imgDefaultScenario from "../assets/images/defoscenario.png"
import fullStar from "../assets/images/etoile-pleine.png"
import emptyStar from "../assets/images/etoile-vide.png"

// const ResumePageScenario = ({ scenario }) => {
const ResumePageScenario = () => {
  // const location = useLocation()
  // const scenario = location.state
  const scenario = {
    id: 1,
    auteur_id: 1,
    jeux_de_role: "The Witcher",
    jeux_de_role_id: 1,
    campagnes_id: 1,
    campagnes_name: "The Witcher dans JP",
    name: "Jurassic Park",
    nb_player_min: 2,
    nb_player_max: 4,
    type: "one shot",
    level: "hard",
    img: "http://localhost:4242/public/assets/images/cameleon1.jpg1693405905262.jpg",
    description:
      "c'est l'histoire d'un mec qui se fait bouffer par un dinosaure, de type Tyrannosaure Rex, dans The Witcher ...",
    model: 1,
  }
  const { user } = useContext(MyContext)
  // const { user, setUser } = useContext(MyContext)
  const navigate = useNavigate()
  const [isFavorite, setIsFAvorite] = useState(false)
  const [addComment, setAddComment] = useState(false)
  const [avis, setAvis] = useState([])
  const [comment, setComment] = useState()
  const [writingDateComment, setWritingDateComment] = useState()
  const [editComment, setEditComment] = useState()

  const getDateOfDay = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // const changeFormattingReturnDate = (bidule) => {
  //   // 2023-09-11T22:00:00.000Z
  //   console.log("bidule", bidule)
  //   const newBidule = bidule.slice(0, 10)
  //   console.log("newBidule", newBidule)
  //   return newBidule
  // }

  const handleClickFavorite = () => {
    if (user !== null) {
      setIsFAvorite(!isFavorite)
      if (isFavorite) {
        axios.delete(`http://localhost:4242/favorite`, {
          data: {
            utilisateurID: user.id,
            scenarioID: scenario.id,
          },
        })
      } else {
        axios.post(`http://localhost:4242/favorite`, {
          utilisateurID: user.id,
          scenarioID: scenario.id,
        })
      }
    } else {
      alert("Please log in to add favorites")
    }
  }

  const handleWriteComment = (e) => {
    setComment(e.target.value)
  }

  const handleClickInput = (id) => {
    setAvis((prevState) =>
      prevState.map((avi) =>
        avi.id === id ? { ...avi, edit: true } : { ...avi, edit: false }
      )
    )
  }

  const handleClickAddComment = () => {
    setAddComment(!addComment)
  }

  const handleGoToScenario = () => {
    navigate("/readscenario", { state: scenario })
  }

  const handleClickSubmitComment = () => {
    axios
      .post(`http://localhost:4242/scenarcomm`, {
        utilisateurID: user.id,
        scenarioID: scenario.id,
        textcomment: comment,
        datecomment: writingDateComment,
      })
      .then(() =>
        axios
          .get(`http://localhost:4242/scenario/${scenario.id}/scenarcomm`)
          .then(({ data }) => {
            setAvis(data) || console.info("data", data)
          })
      )
      .catch((err) => console.error(err))

    setComment("")
    setAddComment(false)
  }

  const handleModifyComment = (e, id) => {
    const newComment = e.target.value
    setEditComment(newComment)

    setAvis((prevState) =>
      prevState.map((avi) =>
        avi.id === id ? { ...avi, commentaire: newComment } : avi
      )
    )
  }

  const handleEditComment = (e) => {
    const id = e.target.value

    axios
      .put(`http://localhost:4242/scenarcomm/${id}`, {
        utilisateurID: user.id,
        scenarioID: scenario.id,
        textcomment: `${editComment} (modifié !)`,
      })
      .then(() =>
        axios
          .get(`http://localhost:4242/scenario/${scenario.id}/scenarcomm`)
          .then(({ data }) => {
            const newAvis = data.map((avi) => ({ ...avi, edit: false }))
            setAvis(newAvis)
          })
      )
      .catch((err) => console.error(err))

    // setAvis((prevState) => prevState.map((avi) => ({ ...avi, edit: false })))
  }

  const handleNoEditComment = () => {
    axios
      .get(`http://localhost:4242/scenario/${scenario.id}/scenarcomm`)
      .then(({ data }) => {
        const closeAvis = data.map((avi) => ({ ...avi, edit: false }))
        setAvis(closeAvis)
      })
  }

  const handleDeleteComment = (e) => {
    const id = e.target.value
    axios
      .delete(`http://localhost:4242/scenarcomm/${id}`, {
        data: {
          utilisateurID: user.id,
          scenarioID: scenario.id,
        },
      })
      .then(() =>
        axios
          .get(`http://localhost:4242/scenario/${scenario.id}/scenarcomm`)
          .then(({ data }) => {
            setAvis(data)
          })
      )
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/favorite/${scenario.id}`)
      .then(() => {
        setIsFAvorite(true)
      })
      .catch(() => setIsFAvorite(false))
  }, [])

  useEffect(() => {
    setWritingDateComment(getDateOfDay())
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/scenario/${scenario.id}/scenarcomm`)
      .then(({ data }) => {
        setAvis(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <main className="globalPage">
        <div className="headerNavbare">
          {/* <Navbar /> */}
          <p>Ceci est l'emplacement de la navbar</p>
        </div>
        <div className="carteResumeScenario">
          <div className="titleResumeScenar">
            <h1>Titre de la campagne : {scenario.campagnes_name} </h1>
            {/*  Penser à supprimer "Titre de la campagne : " */}
            <h2>Titre du scenario : {scenario.name} </h2>
            {/*  Penser à supprimer "Titre du scenario : " */}
          </div>
          <div className="mainInfos">
            <img
              className="imgResumPagScenar"
              src={scenario.img}
              alt="picture of scenario"
            />
            {/* Pour vivualisation => à supprimer après ! Et activer celle d'en dessous ! */}
            {/* <img className="imgResumPagScenar" src={imgScenar} alt="picture of scenario" /> */}
            <ul>
              <li>Theme : {scenario.jeux_de_role} </li>
              <li>
                Number of players : From {scenario.nb_player_min} to{" "}
                {scenario.nb_player_max} players
              </li>
              <li>Description : {scenario.description}</li>
              {/* <li>Aim : {scenario}</li> */}
            </ul>
            <img
              id="isFavorite"
              src={isFavorite ? fullStar : emptyStar}
              alt="isFavorite"
              title={
                isFavorite
                  ? "Click to remove from favorites"
                  : "Click to add to favorites"
              }
              onClick={handleClickFavorite}
            />
          </div>
          <div className="scenarInteractions">
            <div className="scenarInteractionsHight">
              <input
                type="button"
                value="Read the Scenario"
                title="Click to go see the scenario"
                onClick={handleGoToScenario}
              />
              <input
                type="button"
                value="Leave a Comment"
                id="buttonAddComment"
                title={
                  addComment
                    ? "Click to hide the texte area !"
                    : "Click to post your comment !"
                }
                onClick={handleClickAddComment}
              />
            </div>
            {addComment && (
              <div className="scenarInteractionsMiddle">
                <textarea
                  value={comment}
                  name="Commment"
                  id="scenarCom"
                  // cols="30"
                  // rows="10"
                  maxLength="500"
                  placeholder="Add here your comment ... Beware 500 character max. "
                  onChange={handleWriteComment}
                ></textarea>
                <input
                  type="button"
                  value="Submit"
                  onClick={handleClickSubmitComment}
                />
              </div>
            )}
            {/* <div className="scenarInteractionsLow"> */}
            <h3>Commentary :</h3>
            {avis.map((avi) =>
              avi.utilisateurs_id === user.id ? (
                avi.edit === true ? (
                  <div
                    className="scenarInteractionsLowEditing scInLowAll"
                    key={avi.id}
                  >
                    <textarea
                      value={avi.commentaire}
                      onChange={(e) => handleModifyComment(e, avi.id)}
                    />
                    <div className="resumePageScenarButtonsEditing">
                      <button
                        type="button"
                        value={avi.id}
                        onClick={handleEditComment}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        value={avi.id}
                        onClick={handleNoEditComment}
                      >
                        Don't Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="scenarInteractionsLowConsultation scInLowAll"
                    key={avi.id}
                  >
                    <p>
                      {avi.nomPrenom} le {avi.date} :
                    </p>
                    <p>
                      {avi.commentaire} {avi.id} {avi.utilisateurs_id}
                    </p>
                    <div className="resumePageScenarButtonsConsultation">
                      <div>
                        <button
                          type="button"
                          value={avi.id}
                          onClick={handleDeleteComment}
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          value={avi.id}
                          onClick={() => handleClickInput(avi.id)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div
                  className="scenarInteractionsLowReader scInLowAll"
                  key={avi.id}
                >
                  <p>
                    {/* {avi.login} le {() => changeFormattingReturnDate(avi.date)} : */}
                    {/* {avi.login} le {avi.date} : */}
                    {avi.nomPrenom} le {avi.date} :
                  </p>
                  <p>
                    {avi.commentaire} {avi.id} {avi.utilisateurs_id}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default ResumePageScenario
