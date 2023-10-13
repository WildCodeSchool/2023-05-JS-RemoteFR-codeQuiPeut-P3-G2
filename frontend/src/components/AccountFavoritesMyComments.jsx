import "./AccountFavoritesMyComments.scss"
import { useEffect, useState } from "react"
import myApi from "../services/myAPI"

import pen from "../assets/images/Pen.svg"
import iconSupprimerYellow from "../assets/images/iconSupprimer_yellow.svg"

export default function AccountFavoritesMyComments({ user }) {
  const [userComments, setUserComments] = useState([])
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

  const handleDeleteComment = (id) => {
    myApi
      .delete(`/scenarcomm/${id}`)
      .then(() => {
        myApi
          .get(`/utilisateurs/${user.id}/comments`)
          .then(({ data }) => {
            setUserComments(data)
          })
          .catch(() => setUserComments([]))
      })
      .catch((err) => console.error(err))
  }

  const handleModifyComment = (e, id) => {
    const newComment = e.target.value
    setEditComment(newComment)

    setUserComments((prevState) =>
      prevState.map((avi) =>
        avi.id === id ? { ...avi, commentaire: newComment } : avi
      )
    )
  }

  const handleEditComment = (commentID, scenarioID) => {
    myApi
      .put(`/scenarcomm/${commentID}`, {
        utilisateurID: user.id,
        scenarioID,
        textcomment: editComment,
      })
      .then(() =>
        myApi
          .get(`/utilisateurs/${user.id}/comments`)
          .then(({ data }) => {
            const newAvis = data.map((avi) => ({ ...avi, edit: false }))
            setUserComments(newAvis)
          })
          .catch((err) => console.error(err))
      )
      .catch((err) => console.error(err))
  }

  const handleNoEditComment = () => {
    setUserComments((prevState) =>
      prevState.map((avi) => ({ ...avi, edit: false }))
    )
  }

  const handleClickInput = (id) => {
    setUserComments((prevState) =>
      prevState.map((avi) =>
        avi.id === id ? { ...avi, edit: true } : { ...avi, edit: false }
      )
    )
  }

  useEffect(() => {
    myApi
      .get(`/utilisateurs/${user.id}/comments`)
      .then(({ data }) => setUserComments(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="containerMyComments">
      <div className="scenarInteractions">
        {/* <h1 style={{ color: "red", textAlign: "center", fontSize: "2rem" }}>
          Page under construction
        </h1> */}

        {userComments.map((avi) =>
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
                    className="cursorHover"
                    type="button"
                    value={avi.id}
                    onClick={() => handleEditComment(avi.id, avi.scenarios_id)}
                  >
                    Save
                  </button>
                  <button
                    className="cursorHover"
                    type="button"
                    value={avi.id}
                    onClick={() => handleNoEditComment()}
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
                  {`Scenario : ${
                    avi.scenarioName
                  } - (Commented the ${handleFormatDate(avi.date)})`}
                </p>
                <p>{avi.commentaire}</p>
                <div className="resumePageScenarButtonsConsultation">
                  <div>
                    <img
                      className="cursorHover"
                      src={iconSupprimerYellow}
                      value={avi.id}
                      onClick={() => handleDeleteComment(avi.id)}
                    />
                    <img
                      className="pen cursorHover"
                      src={pen}
                      alt="crayon pour modifier"
                      value={avi.id}
                      onClick={() => handleClickInput(avi.id)}
                    />
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
    </div>
  )
}
