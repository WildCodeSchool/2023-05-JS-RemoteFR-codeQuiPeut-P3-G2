import { useEffect, useState, useContext } from "react"
import MyContext from "./MyContext"
import myApi from "../services/myAPI"

export default function FormInvitationCollaboration({
  followerID,
  setShowFormProposeCoWriting,
}) {
  const { user } = useContext(MyContext)

  const [collaborationType, setCollaborationType] = useState(
    "Discussion via chat only"
  )
  const [messageCollaboration, setMessageCollaboration] = useState()
  const [myScenarios, setMyScenarios] = useState([])
  const [sharedScenario, setSharedScenario] = useState("---")

  const handleChangeCollaborationType = (e) => {
    setCollaborationType(e.target.value)
  }

  const handleChangeMessageCollaboration = (e) => {
    setMessageCollaboration(e.target.value)
  }

  const handleChangeSharedScenario = (e) => {
    setSharedScenario(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (sharedScenario === "---") {
      alert(
        "Please select a scenario before sending a proposition of collaboration."
      )
    } else {
      const scenarioID = myScenarios.find(
        (scenario) => scenario.title === sharedScenario
      ).id

      const type =
        collaborationType === "Discussion via chat only" ? "chat" : "co-writing"
      const etat = "emitted" // can be "emitted" "accepted" or "rejected"

      const myInvitation = {
        auteurs_id: user.auteurs_id,
        utilisateurs_id: followerID,
        scenarios_id: scenarioID,
        type,
        etat,
        messageProposition: messageCollaboration,
        afficher: 1,
      }

      myApi.post(`/invitation`, myInvitation)
      setShowFormProposeCoWriting(false)
    }
  }

  const handleCancel = () => {
    setShowFormProposeCoWriting(false)
  }

  useEffect(() => {
    myApi.get(`/scenariosInProgress/utilisateur/${user.id}`).then((res) => {
      const inProgress = res.data.filter(
        (item) => parseInt(item.publication_date.slice(0, 4), 10) > 2990
      )
      setMyScenarios(inProgress)
    })
  }, [])

  return (
    <main className="main-FormInvitationCollaboration">
      <form>
        <h1>Proposition of collaboration</h1>
        <label htmlFor="select-sharedScenario">
          {" "}
          For which scenario do you want to propose a collaboration ?{" "}
        </label>
        <select
          id="select-sharedScenario"
          className="cursorHover"
          value={sharedScenario}
          onChange={handleChangeSharedScenario}
        >
          <option>---</option>
          {myScenarios[0] &&
            myScenarios.map((scenario) => (
              <option key={scenario.id}>{scenario.title}</option>
            ))}
        </select>

        <label htmlFor="select_collaborationType">
          What kind of collaboration would you like to offer ?
        </label>
        <select
          id="select_collaborationType"
          className="cursorHover"
          value={collaborationType}
          onChange={handleChangeCollaborationType}
        >
          <option>Discussion via chat only</option>
          <option>Co-writing</option>
        </select>
        <label htmlFor="">{`Do you want to add a message ? (optional)`}</label>
        <textarea
          id="textarea_message_collaboration"
          placeholder="Write your message (optional)"
          value={messageCollaboration}
          onChange={handleChangeMessageCollaboration}
        />

        <div className="div-buttons">
          <input
            type="submit"
            className="cursorHover"
            onClick={handleCancel}
            value="Cancel"
          />

          <input
            type="submit"
            className="cursorHover"
            onClick={handleSubmit}
            value="Send the proposition"
          />
        </div>
      </form>
    </main>
  )
}
