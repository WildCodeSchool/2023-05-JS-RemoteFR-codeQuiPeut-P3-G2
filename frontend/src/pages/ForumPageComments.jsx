import { useEffect, useState, useContext } from "react"
import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom"
import MyContext from "../components/MyContext"
import axios from "axios"

export default function ForumPageComments() {
  const location = useLocation()
  const topic = location.state

  const { user } = useContext(MyContext)
  const [numberCommentPerPage, setNumberCommentPerPage] = useState(5)
  const [indexToShow, setIndexToShow] = useState({ min: 0, max: 4 })
  const [comments, setComments] = useState([])
  const [showInputNewComment, setShowInputNewComment] = useState(false)
  const [valueNewComment, setValueNewComment] = useState("")
  const [orderComments, setOrderComments] = useState("Older first")
  const [mounted, setMounted] = useState(false)

  const handleFormatDate = (myDate) => {
    const year = myDate.slice(0, 4)
    const month = myDate.slice(5, 7)
    const day = myDate.slice(8, 10)
    return `${day}/${month}/${year}`
  }

  const getDateOfDay = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // A SUPPRIMER////////
  if (comments === 3) {
    setIndexToShow({ min: 0, max: 10 })
  }
  /// ///////////

  const handleClickAddComment = () => {
    setShowInputNewComment(!showInputNewComment)
    setValueNewComment("")
  }

  const handleChangeNewComment = (e) => {
    setValueNewComment(e.target.value)
  }

  const handleClickSendComment = () => {
    if (valueNewComment !== "") {
      axios
        .post(`http://localhost:4242/commentaires_forum`, {
          utilisateurs_id: user.id,
          sujet_forum_id: topic.id,
          commentaire: valueNewComment,
          date_time: getDateOfDay(),
        })
        .then(() => {
          axios
            .get(
              `http://localhost:4242/sujet_forum/${topic.id}/commentaires_forum`
            )
            .then(({ data }) => setComments(data))
            .catch((err) => console.error(err))
        })
        .catch((err) => console.error(err))
    }

    setShowInputNewComment(false)
  }

  const handleChangeOrder = () => {
    if (orderComments === "Older first") {
      setOrderComments("Recent first")
    } else {
      setOrderComments("Older first")
    }
  }

  const handleChangeNumberCommentPerPage = (e) => {
    setNumberCommentPerPage(e.target.value)
  }

  const handleClickPrevious = () => {
    if (indexToShow.min - numberCommentPerPage < 0) {
      setIndexToShow({ min: 0, max: numberCommentPerPage - 1 })
    } else {
      setIndexToShow((prevState) => ({
        min: prevState.min - numberCommentPerPage,
        max: prevState.max - numberCommentPerPage,
      }))
    }
  }

  const handleClickNext = () => {
    if (indexToShow.max + numberCommentPerPage > comments.length - 1) {
      setIndexToShow({
        min: comments.length - numberCommentPerPage,
        max: comments.length - 1,
      })
    } else {
      setIndexToShow((prevState) => ({
        min: prevState.min + numberCommentPerPage,
        max: prevState.max + numberCommentPerPage,
      }))
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/sujet_forum/${topic.id}/commentaires_forum`)
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err))

    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (numberCommentPerPage >= comments.length) {
        setIndexToShow({ min: 0, max: comments.length - 1 })
      } else {
        setIndexToShow((prevState) => ({
          min: prevState.min,
          max: prevState.min + numberCommentPerPage - 1,
        }))
      }
    }
  }, [numberCommentPerPage])

  return (
    <>
      <Navbar />
      <main className="main-forumPageComment">
        <section className="comments-container">
          <h1>
            <span>Topic : </span> {topic.sujet}{" "}
          </h1>

          {orderComments === "Older first" ? (
            <>
              {indexToShow.min === 0 && (
                <div
                  className="div-comment"
                  style={{ backgroundColor: "rgb(40,40,100)" }}
                >
                  <h2>{`(Anonymous) - ${handleFormatDate(
                    topic.open_date
                  )} `}</h2>
                  <p>{topic.firstComment}</p>
                </div>
              )}

              {comments
                .sort((a, b) => a.id - b.id)
                .map(
                  (comment, index) =>
                    index >= indexToShow.min &&
                    index <= indexToShow.max && (
                      <div className="div-comment" key={comment.id}>
                        <h2>{`${comment.pseudo} - ${handleFormatDate(
                          comment.date_time
                        )} `}</h2>
                        <p>{comment.commentaire}</p>
                      </div>
                    )
                )}

              <div className="div-prevNext">
                <button
                  type="button"
                  className="buttonChangeOrder"
                  onClick={handleChangeOrder}
                  title="Change order"
                >
                  {orderComments}
                </button>
                <label htmlFor="selectNbCommentPerPage">Number / page</label>
                <select
                  id="selectNbCommentPerPage"
                  value={numberCommentPerPage}
                  onChange={handleChangeNumberCommentPerPage}
                >
                  <option>3</option>
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>

                {indexToShow.min > 0 && (
                  <button
                    type="button"
                    className="arrowPrev"
                    onClick={handleClickPrevious}
                  ></button>
                )}

                {indexToShow.max < comments.length - 1 && (
                  <button
                    type="button"
                    className="arrowNext"
                    onClick={handleClickNext}
                  ></button>
                )}
              </div>

              <div className="div-newComment">
                {showInputNewComment === false &&
                  user.id &&
                  indexToShow.max >= comments.length - 1 && (
                    <button type="button" onClick={handleClickAddComment}>
                      Add a comment
                    </button>
                  )}
                {showInputNewComment && (
                  <div className="div-inputNewComment">
                    <textarea
                      value={valueNewComment}
                      onChange={handleChangeNewComment}
                      placeholder="Type your comment"
                    />
                    <div className="buttons-newComment">
                      <button type="button" onClick={handleClickSendComment}>
                        Send
                      </button>
                      <button type="button" onClick={handleClickAddComment}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {comments
                .sort((a, b) => b.id - a.id)
                .map(
                  (comment, index) =>
                    index >= indexToShow.min &&
                    index <= indexToShow.max && (
                      <div className="div-comment" key={comment.id}>
                        <h2>{`${comment.pseudo} - ${handleFormatDate(
                          comment.date_time
                        )} `}</h2>
                        <p>{comment.commentaire}</p>
                      </div>
                    )
                )}

              {indexToShow.max === comments.length - 1 && (
                <div
                  className="div-comment"
                  style={{ backgroundColor: "rgb(40,40,100)" }}
                >
                  <h2>{`(Anonymous) - ${handleFormatDate(
                    topic.open_date
                  )} `}</h2>
                  <p>{topic.firstComment}</p>
                </div>
              )}

              <div className="div-prevNext">
                <button
                  type="button"
                  className="buttonChangeOrder"
                  onClick={handleChangeOrder}
                  title="Change order"
                >
                  {orderComments}
                </button>
                <label htmlFor="selectNbCommentPerPage">Number / page</label>
                <select
                  id="selectNbCommentPerPage"
                  value={numberCommentPerPage}
                  onChange={handleChangeNumberCommentPerPage}
                >
                  <option>3</option>
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>

                {indexToShow.min > 0 && (
                  <button
                    type="button"
                    className="arrowPrev"
                    onClick={handleClickPrevious}
                  ></button>
                )}

                {indexToShow.max < comments.length - 1 && (
                  <button
                    type="button"
                    className="arrowNext"
                    onClick={handleClickNext}
                  ></button>
                )}
              </div>

              <div className="div-newComment">
                {showInputNewComment === false &&
                  user.id &&
                  indexToShow.min === 0 && (
                    <button type="button" onClick={handleClickAddComment}>
                      Add a comment
                    </button>
                  )}
                {showInputNewComment && (
                  <div className="div-inputNewComment">
                    <textarea
                      value={valueNewComment}
                      onChange={handleChangeNewComment}
                      placeholder="Type your comment"
                    />
                    <div className="buttons-newComment">
                      <button type="button" onClick={handleClickSendComment}>
                        Send
                      </button>
                      <button type="button" onClick={handleClickAddComment}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  )
}
