import { useState } from "react"

export default function FormNewForumTopic({ setShowFormNewTopic, setTopics }) {
  const [topic, setTopic] = useState("")
  const [comment, setComment] = useState("")

  const handleChangeTopic = (e) => {
    setTopic(e.target.value)
  }

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main className="main-formNewTopic">
      <h1>NEW TOPIC</h1>
      <form>
        <div>
          <label htmlFor="forumTopic">Please provide a topic name</label>
          <input
            type="text"
            id="forumTopic"
            value={topic}
            onChange={handleChangeTopic}
            placeholder="Topic name..."
            required
          />
        </div>
        <div>
          <label htmlFor="firstComment">Please leave a first comment</label>
          <textarea
            value={comment}
            id="firstComment"
            onChange={handleChangeComment}
            placeholder="Your first comment..."
            required
          />
        </div>

        <input type="submit" onClick={handleSubmit} value={"Send"} />
      </form>
    </main>
  )
}
