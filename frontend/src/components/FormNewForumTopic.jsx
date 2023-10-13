import myApi from "../services/myAPI"

import { useState } from "react"

export default function FormNewForumTopic({
  setShowFormNewTopic,
  setTopics,
  setOriginalTopics,
  categories,
}) {
  const [topic, setTopic] = useState("")
  const [comment, setComment] = useState("")
  const [valueCategory, setValueCategory] = useState(categories[3].categoryName)

  const handleChangeTopic = (e) => {
    setTopic(e.target.value)
  }

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }

  const handleChangeValueCategory = (e) => {
    setValueCategory(e.target.value)
  }

  const getDateOfDay = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const categoryID = categories.filter(
      (category) => category.categoryName === valueCategory
    )[0].id

    myApi
      .post("/sujet_forum", {
        sujet: topic,
        openDate: getDateOfDay(),
        sujetForumCategoriesId: categoryID,
        firstComment: comment,
      })
      .then(() => {
        myApi
          .get("/sujet_forum")
          .then(({ data }) => {
            setTopics(data)
            setOriginalTopics(data)
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))

    setShowFormNewTopic(false)
  }

  const handleCancel = () => {
    setShowFormNewTopic(false)
  }

  return (
    <main className="main-formNewTopic">
      <h1>NEW TOPIC</h1>
      <form>
        <section>
          <div className="div-input">
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
          <div className="div-select">
            <label htmlFor="select-topicCategory">
              Please choose a category
            </label>
            <select
              id="select-topicCategory"
              value={valueCategory}
              onChange={handleChangeValueCategory}
              required
            >
              {categories.map((category) => (
                <option key={category.id}>{category.categoryName}</option>
              ))}
            </select>
          </div>
        </section>
        <div className="div-textarea">
          <label htmlFor="firstComment">Please leave a first comment</label>
          <textarea
            value={comment}
            id="firstComment"
            onChange={handleChangeComment}
            placeholder="Your first comment..."
            required
          />
        </div>

        <div className="form-buttonDiv">
          <input type="submit" onClick={handleCancel} value={"Cancel"} />
          <input type="submit" onClick={handleSubmit} value={"Send"} />
        </div>
      </form>
    </main>
  )
}
