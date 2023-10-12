import axios from "axios"
import { useEffect, useState, useContext } from "react"
import MyContext from "./MyContext"

export default function AccountCreationsMyShares() {
  const { user } = useContext(MyContext)
  const [myShares, setMyShares] = useState([])

  const handleChangeInvitationType = (e, id) => {
    setMyShares((prevState) =>
      prevState.map((invitation) =>
        invitation.id === id
          ? { ...invitation, type: e.target.value }
          : invitation
      )
    )

    const modifiedInvitation = myShares.find(
      (invitation) => invitation.id === id
    )

    axios.put(`http://localhost:4242/invitation/${id}`, {
      type: e.target.value,
      etat: modifiedInvitation.etat,
      reponse: modifiedInvitation.reponse,
      afficher: modifiedInvitation.afficher,
    })
  }

  const handleDeleteCollaboration = (id) => {
    setMyShares((prevState) =>
      prevState.map((invitation) =>
        invitation.id === id
          ? { ...invitation, type: "Cancel collaboration", afficher: 0 }
          : invitation
      )
    )

    const modifiedInvitation = myShares.find(
      (invitation) => invitation.id === id
    )

    axios.put(`http://localhost:4242/invitation/${id}`, {
      type: "Cancel collaboration",
      etat: modifiedInvitation.etat,
      reponse: modifiedInvitation.reponse,
      afficher: 0,
    })
  }

  const handleClickShowMessages = (id) => {
    setMyShares((prevState) =>
      prevState.map((invitation) =>
        invitation.id === id
          ? { ...invitation, showMessages: !invitation.showMessages }
          : invitation
      )
    )
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/invitations/auteur/${user.auteurs_id}`)
      .then(({ data }) => {
        const newData = data.map((item) => ({ ...item, showMessages: false }))
        setMyShares(newData)
      })
  }, [])

  return (
    <main className="main-myShares">
      {myShares[0] &&
        myShares.map(
          (invitation) =>
            invitation.afficher && (
              <section className="section-invitation" key={invitation.id}>
                {invitation.type === "Cancel collaboration" ? (
                  <p>
                    You <span>cancelled</span> the collaboration you had with{" "}
                    <span>{invitation.pseudo_follower.toUpperCase()}</span> on
                    scenario{" "}
                    <span>{invitation.scenario_name.toUpperCase()} </span>{" "}
                  </p>
                ) : (
                  <p>
                    Proposition to{" "}
                    <span>{invitation.pseudo_follower.toUpperCase()}</span> for{" "}
                    <span>{invitation.type.toUpperCase()}</span> collaboration
                    on scenario{" "}
                    <span>{invitation.scenario_name.toUpperCase()} </span>{" "}
                  </p>
                )}

                <div className="invitation_statusAndModification">
                  <div className="div-status">
                    <p>Status :</p>
                    <div
                      style={
                        invitation.etat === "emitted"
                          ? { backgroundColor: "#4c60ae", color: "white" }
                          : invitation.etat === "accepted"
                          ? {
                              backgroundColor: "rgb(3, 173, 3)",
                              color: "white",
                            }
                          : { backgroundColor: "red", color: "black" }
                      }
                    >
                      {invitation.etat.toUpperCase()}{" "}
                    </div>
                  </div>

                  <div className="div-modification">
                    <p>Modify the collaboration type :</p>
                    <select
                      value={invitation.type}
                      onChange={(e) =>
                        handleChangeInvitationType(e, invitation.id)
                      }
                      className="cursorHover"
                    >
                      <option>chat</option>
                      <option>co-writing</option>
                      <option>Cancel collaboration</option>
                    </select>
                  </div>
                </div>

                {(invitation.type === "Cancel collaboration" ||
                  invitation.etat === "rejected") && (
                  <button
                    type="button"
                    onClick={() => handleDeleteCollaboration(invitation.id)}
                    className="deleteCollaboration cursorHover"
                  >
                    Delete collaboration
                  </button>
                )}

                <div className="messageAndAnswer">
                  {invitation.showMessages === false ? (
                    <button
                      className="arrowButton cursorHover"
                      onClick={() => handleClickShowMessages(invitation.id)}
                    >
                      <div className="arrowButtonNext"></div>{" "}
                    </button>
                  ) : (
                    <>
                      <button
                        className="arrowButton cursorHover"
                        onClick={() => handleClickShowMessages(invitation.id)}
                      >
                        <div className="arrowButtonPrevious"></div>{" "}
                      </button>

                      <div className="div-message">
                        <p className="p1">Proposition message :</p>
                        <p className="p2">{invitation.messageProposition} </p>
                      </div>

                      <div className="div-message">
                        <p className="p1">Follower's answer :</p>
                        <p className="p2">{invitation.reponse} </p>
                      </div>
                    </>
                  )}
                </div>
              </section>
            )
        )}
    </main>
  )
}
