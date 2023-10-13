import axios from "axios"
import myApi from "../services/myAPI"

export default function InvitationPannel({
  invitations,
  setInvitations,
  setShowNotifications,
}) {
  const handleChangeAnswer = (e, id) => {
    setInvitations((prevstate) =>
      prevstate.map((invitation) =>
        invitation.id === id
          ? { ...invitation, reponse: e.target.value }
          : invitation
      )
    )
  }

  const handleClickReject = (id) => {
    setInvitations((prevstate) =>
      prevstate.map((invitation) =>
        invitation.id === id ? { ...invitation, etat: "rejected" } : invitation
      )
    )

    const modifiedInvitation = invitations.find(
      (invitation) => invitation.id === id
    )

    axios.put(`http://localhost:4242/invitation/${id}`, {
      type: modifiedInvitation.type,
      etat: "rejected",
      reponse: modifiedInvitation.reponse,
      afficher: modifiedInvitation.afficher,
    })
  }

  const handleClickAccept = (id) => {
    setInvitations((prevstate) =>
      prevstate.map((invitation) =>
        invitation.id === id ? { ...invitation, etat: "accepted" } : invitation
      )
    )

    const modifiedInvitation = invitations.find(
      (invitation) => invitation.id === id
    )

    axios.put(`http://localhost:4242/invitation/${id}`, {
      type: modifiedInvitation.type,
      etat: "accepted",
      reponse: modifiedInvitation.reponse,
      afficher: modifiedInvitation.afficher,
    })
  }

  return (
    <main className="main-invitationPannel">
      <section className="section-invitationPannel">
        <h1>Invitations for writing collaboration</h1>

        {invitations.map((invitation) => (
          <div className="div-invitation" key={invitation.id}>
            <p>
              <span>{invitation.auteur_name.toUpperCase()} </span> invite you
              for a <span>{invitation.type.toUpperCase()}</span> collaboration
              on a new scenario called{" "}
              <span>{invitation.scenario_name.toUpperCase()}</span>.{" "}
            </p>

            <div className="div-message">
              <p className="p1">Message :</p>
              <p className="p2">{invitation.messageProposition} </p>
            </div>

            <div className="div-answer">
              <p className="p1"> Your answer :</p>
              <textarea
                className="p3"
                value={invitation.reponse === null ? "" : invitation.reponse}
                onChange={(e) => handleChangeAnswer(e, invitation.id)}
                placeholder="You can write an answer here"
              />
            </div>

            <div className="div-button">
              <button
                type="button"
                className="cursorHover"
                style={
                  invitation.etat === "rejected"
                    ? { backgroundColor: "rgb(173, 3, 3)", color: "white" }
                    : null
                }
                onClick={() => handleClickReject(invitation.id)}
              >
                Reject
              </button>
              <button
                type="button"
                className="cursorHover"
                style={
                  invitation.etat === "accepted"
                    ? { backgroundColor: "rgb(3, 173, 3)", color: "white" }
                    : null
                }
                onClick={() => handleClickAccept(invitation.id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}

        <button
          type="buttton"
          className="cursorHover buttonClose"
          onClick={() => setShowNotifications(false)}
        >
          Close
        </button>
      </section>
    </main>
  )
}
