import { useContext, useEffect, useState } from "react"
import croix from "../assets/images/Close.svg"
import myApi from "../services/myAPI"

import MyContext from "./MyContext"

export default function ChatBox({ setShowChat, scenario }) {
  const { user } = useContext(MyContext)

  const [newMessage, setNewMessage] = useState("")
  const [comments, setComments] = useState([])

  const handleFormatDate = (myDate) => {
    return (
      myDate.getFullYear() +
      "-" +
      String(myDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(myDate.getDate()).padStart(2, "0") +
      " " +
      String(myDate.getHours()).padStart(2, "0") +
      ":" +
      String(myDate.getMinutes()).padStart(2, "0") +
      ":" +
      String(myDate.getSeconds()).padStart(2, "0")
    )
  }

  const handleFormatMessageDateTime = (myDate) => {
    return myDate.slice(0, 10) + " at " + myDate.slice(11, 19)
  }

  const handleChangeMessage = (e) => setNewMessage(e.target.value)

  const handlePostMessage = () => {
    const now = new Date()
    // const newDate = now.toISOString()
    const newDate = handleFormatDate(now)

    myApi
      .post(`/chat/`, {
        scenarios_id: scenario.id,
        utilisateurs_id: user.id,
        commentaire: newMessage,
        date_time: newDate,
      })
      .then(() => {
        myApi
          .get(`/chat/scenario/${scenario.id}`)
          .then(({ data }) => setComments(data))
          .catch(() => setComments([]))
      })
      .catch((err) => console.error(err))

    setNewMessage("")
  }

  useEffect(() => {
    myApi
      .get(`/chat/scenario/${scenario.id}`)
      .then(({ data }) => setComments(data))
      .catch(() => setComments([]))
  }, [scenario])

  return (
    <main className="main-chatBox">
      <section className="bandeau-superieur">
        <h1>{scenario.name ? scenario.name : scenario.title}</h1>
        <img
          src={croix}
          alt="close"
          className="cursorHover"
          onClick={() => setShowChat(false)}
        />
      </section>

      <section className="section-messages">
        {comments.length > 0 &&
          comments
            .sort((a, b) => b.id - a.id)
            .map((comment) => (
              <div className="div-comment" key={comment.id}>
                <p className="p1">
                  {`${comment.userName} (${handleFormatMessageDateTime(
                    comment.date_time
                  )})`}{" "}
                </p>
                <p className="p2">{comment.commentaire} </p>
              </div>
            ))}
      </section>

      <section className="section-newPost">
        <textarea
          value={newMessage}
          onChange={handleChangeMessage}
          placeholder="Write a message..."
        />
        <button
          type="button"
          onClick={handlePostMessage}
          className="cursorHover"
        >
          Send
        </button>
      </section>
    </main>
  )
}
