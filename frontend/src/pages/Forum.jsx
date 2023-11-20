import Navbar from "../components/Navbar"
import plusDansRond from "../assets/images/plusDansRond.png"
import cadenas from "../assets/images/cadenas.png"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import myApi from "../services/myAPI"
import FormNewForumTopic from "../components/FormNewForumTopic"
import Footer from "../components/Footer"

export default function Forum() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [researchValue, setResearchValue] = useState("")
  const [topics, setTopics] = useState([])
  const [originalTopics, setOriginalTopics] = useState([])
  // const [comments, setComments] = useState([])
  const [showFormNewTopic, setShowFormNewTopic] = useState(false)

  const handleClickAddNewTopic = () => {
    setShowFormNewTopic(!showFormNewTopic)
  }

  const handleClickRecentTopics = () => {
    const newTopics = originalTopics.sort((a, b) => b.id - a.id).slice(0, 10)
    setTopics(newTopics)
  }

  const handleChangeResearchValue = (e) => {
    setResearchValue(e.target.value)
  }

  // fonction qui supprime les accents
  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const handleStartResearch = (e) => {
    // lancer la recherche après avoir appuyé sur entrer
    if (e.key === "Enter") {
      const researchValues = researchValue
        .split(" ")
        .filter((value) => value.length > 3)

      const newTopics = originalTopics.filter((topic) =>
        researchValues.some(
          (value) =>
            removeAccents(topic.sujet.toUpperCase()).includes(
              removeAccents(value.toUpperCase())
            ) ||
            removeAccents(topic.firstComment.toUpperCase()).includes(
              removeAccents(value.toUpperCase())
            )
        )
      )

      setTopics(newTopics)
      setResearchValue("")
    }
  }

  const handleFilterByCategory = (id) => {
    const newTopics = originalTopics.filter(
      (topic) => topic.sujet_forum_categories_id === id
    )

    setTopics(newTopics)
  }

  const handleClickEveryCategory = () => {
    setTopics(originalTopics)
  }

  // ---------------------------------------
  // -------Fonction de conversion des données-----------
  // ------------------------------------------
  const handleFindCategoryName = (id) => {
    return categories.filter((category) => category.id === id)[0].categoryName
  }

  const handleFormatDate = (myDate) => {
    const year = myDate.slice(0, 4)
    const month = myDate.slice(5, 7)
    const day = myDate.slice(8, 10)
    return `Since : ${day}/${month}/${year}`
  }

  // ----------fin section---------------------------

  const handleNavigateToComments = (topic) => {
    navigate("/ForumPageComments", { state: topic })
  }

  useEffect(() => {
    myApi
      .get("/forumCategories")
      .then(({ data }) => setCategories(data))
      .catch((err) => console.error(err))

    myApi
      .get("/sujet_forum")
      .then(({ data }) => {
        setTopics(data)
        setOriginalTopics(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <Navbar />
      <main className="main-forum">
        <section className="forum-bandeauGauche">
          <div className="div-newTopic">
            <h1>NEW TOPIC</h1>
            <img
              src={plusDansRond}
              alt="Button add new Topic"
              onClick={handleClickAddNewTopic}
              className="cursorHover"
            />
          </div>

          <div className="div-categories">
            <h1>CATEGORIES</h1>

            {categories[0] &&
              categories.map((category) => (
                <div
                  className="category-element"
                  key={category.id}
                  onClick={() => handleFilterByCategory(category.id)}
                >
                  <div
                    className="category-color"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h2 className="cursorHover">{category.categoryName}</h2>
                </div>
              ))}

            <div
              className="category-element"
              onClick={handleClickEveryCategory}
            >
              <div
                className="category-color"
                style={{ backgroundColor: "rgb(240,240,240)" }}
              ></div>
              <h2 className="cursorHover">Every category</h2>
            </div>
          </div>

          <div className="div-tag">
            <h1>TAG</h1>
          </div>
        </section>

        <section className="forum-bandeauDroite">
          <div className="form-addNewTopic"></div>

          <p className="div-rules">
            Welcome to the Scripter forum! <br />
            <br />
            <br />
            Rules to know before adding a new question:
            <br />
            <br />
            - Search the topic section of the forum, the question may have
            already been asked.
            <br />
            <br />
            - If the question concerns your account, please contact the team in
            the contact tab.
            <br />
            <br />- Be kind and creative, for yourself and for others!
          </p>

          <div className="masque"></div>

          <div className="div-research">
            <button
              type="button"
              onClick={handleClickRecentTopics}
              className="cursorHover"
            >
              See the most recent topics
            </button>
            <input
              type="text"
              placeholder="Research"
              value={researchValue}
              onChange={handleChangeResearchValue}
              onKeyDown={handleStartResearch}
            />
          </div>

          <div className="div-showTopics">
            {topics[0] &&
              categories[0] &&
              topics.map((topic) => (
                <div
                  className="topic cursorHover"
                  key={topic.id}
                  onClick={() => handleNavigateToComments(topic)}
                >
                  <div className="topic-title">
                    <img src={cadenas} alt="logo topic open" />
                    <p>{topic.sujet}</p>
                  </div>
                  <div className="topic-firstCpmment">
                    <p>
                      {topic.firstComment.slice(0, 180) + "... Read more..."}
                    </p>
                  </div>
                  <div className="topic-info">
                    <p>
                      {"Category : " +
                        handleFindCategoryName(topic.sujet_forum_categories_id)}
                    </p>
                    <p>{handleFormatDate(topic.open_date)}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {showFormNewTopic && (
          <section className="forum-section-formNewTopic">
            <FormNewForumTopic
              setTopics={setTopics}
              setOriginalTopics={setOriginalTopics}
              setShowFormNewTopic={setShowFormNewTopic}
              categories={categories}
            />
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
