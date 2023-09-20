import { useState, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom" // A decommenté qd useLocation sera OK (1/2)
// import { useNavigate } from "react-router-dom"
import MyContext from "../components/MyContext"
import Navbar from "../components/Navbar"
import axios from "axios"
import fullStar from "../assets/images/etoile-pleine.png"
import emptyStar from "../assets/images/etoile-vide.png"

const ResumePageScenario = () => {
  // const scenario = location.state
  const location = useLocation()
  const recupSccenario = location.state
  const scenario = { ...recupSccenario, name: recupSccenario.title }

  const { user } = useContext(MyContext)
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

  const handleFormatDate = (myDate) => {
    const year = myDate.slice(0, 4)
    const month = myDate.slice(5, 7)
    const day = myDate.slice(8, 10)
    return `${day}/${month}/${year}`
  }

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

  const handleGoToScenario = () => {
    navigate("/readscenario", { state: scenario })

    if (scenario.nbVues === 0) {
      axios.post(`http://localhost:4242/vuesScenarios`, {
        nbVues: 1,
        scenarioId: scenario.id,
      })
    } else {
      axios.put(`http://localhost:4242/vuesScenarios`, {
        nbVues: scenario.nbVues + 1,
        scenarioId: scenario.id,
      })
    }

    if (scenario.nbVuesCampagne === 0) {
      axios.post(`http://localhost:4242/vuesCampagnes`, {
        nbVues: 1,
        campagneId: scenario.campagnes_id,
      })
    } else {
      axios.put(`http://localhost:4242/vuesCampagnes`, {
        nbVues: scenario.nbVuesCampagne + 1,
        campagneId: scenario.campagnes_id,
      })
    }
  }
  const handleClickAddComment = () => {
    setAddComment(!addComment)
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
      .delete(`http://localhost:4242/scenarcomm/${id}`)
      .then(() => {
        axios
          .get(`http://localhost:4242/scenario/${scenario.id}/scenarcomm`)
          .then(({ data }) => {
            setAvis(data)
          })
          .catch(() => setAvis([]))
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    if (user !== null) {
      axios
        .get(
          `http://localhost:4242/utilisateurs/${user.id}/scenarioFavorite/${scenario.id}`
        )
        .then(({ data }) => {
          setIsFAvorite(true)
        })
        .catch(() => setIsFAvorite(false))
    }
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
      .catch(() => setAvis([]))
  }, [])

  return (
    <>
      <main className="main-resumePageScenario">
        <Navbar />

        <section className="mainInfos">
          <img
            className="imgResumPagScenar"
            src={scenario.img}
            alt="picture of scenario"
          />

          <div className="text-container">
            {scenario.type !== "one shot" && (
              <h1>
                <span>CAMPAIGN : </span>
                {scenario.campagnes_name}{" "}
              </h1>
            )}
            <h2>
              <span>SCENARIO : </span>
              {scenario.name}{" "}
            </h2>

            <ul>
              <li>
                <span>Role game / universe : </span>
                {scenario.jeux_de_role}
              </li>
              <li>
                {" "}
                <span>Theme : </span>
                {scenario.theme}{" "}
              </li>
              <li>
                <span>Type : </span>{" "}
                {scenario.type === "one shot"
                  ? "One shot scenario"
                  : "Stage of a campaign"}{" "}
              </li>
              <li>
                <span>Number of players : </span>
                From {scenario.nb_player_min} to {scenario.nb_player_max}{" "}
                players
              </li>
              <li>
                <span>Difficulty : </span>
                {scenario.level}{" "}
              </li>
              <li>
                <span>Publication date : </span>
                {handleFormatDate(scenario.publication_date)}{" "}
              </li>
            </ul>
          </div>
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
        </section>

        <div className="div-synopsis">
          <p>
            <span>SYNOPSIS : </span>
          </p>
          <p>{scenario.description}</p>
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

          <div className="separation-line"></div>

          <h2>Gamers reviews :</h2>
          {avis.map((avi) =>
            user !== null && avi.utilisateurs_id === user.id ? (
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
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="scenarInteractionsLowConsultation scInLowAll"
                  key={avi.id}
                >
                  <p className="pseudo-date">
                    {avi.login} le {handleFormatDate(avi.date)}
                  </p>
                  <p>{avi.commentaire}</p>
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
                <p className="pseudo-date">
                  {/* {avi.login} le {() => changeFormattingReturnDate(avi.date)} : */}
                  {/* {avi.login} le {avi.date} : */}
                  {avi.nomPrenom} le {handleFormatDate(avi.date)} :
                </p>
                <p>{avi.commentaire}</p>
              </div>
            )
          )}
        </div>
      </main>
    </>
  )
}

export default ResumePageScenario
