import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom"
import axios from "axios"

export default function ForumPageComments() {
  const location = useLocation()
  const topic = location.state

  const [indexToShow, setIndexToShow] = useState({ min: 0, max: 10 })
  const [comments, setComments] = useState([])

  const handleFormatDate = (myDate) => {
    const year = myDate.slice(0, 4)
    const month = myDate.slice(5, 7)
    const day = myDate.slice(8, 10)
    return `${day}/${month}/${year}`
  }

  // A SUPPRIMER////////
  if (comments === 3) {
    setIndexToShow({ min: 0, max: 10 })
  }
  /// ///////////

  useEffect(() => {
    axios
      .get(`http://localhost:4242/sujet_forum/${topic.id}/commentaires_forum`)
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <Navbar />
      <main className="main-forumPageComment">
        <section className="comments-container">
          <h1>
            <span>Topic : </span> {topic.sujet}{" "}
          </h1>
          {indexToShow.min === 0 && (
            <div className="div-comment">
              <h2>{`(Anonymous) - ${handleFormatDate(topic.open_date)} `}</h2>
              <p>{topic.firstComment}</p>
            </div>
          )}

          {comments.map((comment) => (
            <div className="div-comment" key={comment.id}>
              <h2>{`${comment.pseudo} - ${handleFormatDate(
                comment.date_time
              )} `}</h2>
              <p>{comment.commentaire}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
