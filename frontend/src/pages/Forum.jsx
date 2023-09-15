import Navbar from "../components/Navbar"
import plusDansRond from "../assets/images/plusDansRond.png"
import cadenas from "../assets/images/cadenas.png"
import { useEffect, useState } from "react"
import axios from "axios"
import FormNewForumTopic from "../components/FormNewForumTopic"

export default function Forum() {
  const [categories, setCategories] = useState([])
  const [researchValue, setResearchValue] = useState("")
  const [topics, setTopics] = useState([])
  // const [comments, setComments] = useState([])
  const [showFormNewTopic, setShowFormNewTopic] = useState(false)

  const handleClickAddNewTopic = () => {
    setShowFormNewTopic(!showFormNewTopic)
  }

  const handleClickRecentTopics = () => {}

  const handleChangeResearchValue = (e) => {
    setResearchValue(e.target.value)
  }

  const handleStartResearch = (e) => {
    // lancer la recherche après avoir appuyé sur entrer
    if (e.key === "Enter") {
      setResearchValue("")
    }
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

  useEffect(() => {
    axios
      .get("http://localhost:4242/forumCategories")
      .then(({ data }) => setCategories(data))
      .catch((err) => console.error(err))

    axios
      .get("http://localhost:4242/sujet_forum")
      .then(({ data }) => setTopics(data))
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
            />
          </div>

          <div className="div-categories">
            <h1>CATEGORIES</h1>

            {categories[0] &&
              categories.map((category) => (
                <div className="category-element" key={category.id}>
                  <div
                    className="category-color"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h2>{category.categoryName}</h2>
                </div>
              ))}

            <div className="category-element">
              <div
                className="category-color"
                style={{ backgroundColor: "rgb(240,240,240)" }}
              ></div>
              <h2>Toutes les catégories</h2>
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
            <button type="button" onClick={handleClickRecentTopics}>
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
                <div className="topic" key={topic.id}>
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
              setShowFormNewTopic={setShowFormNewTopic}
              categories={categories}
            />
          </section>
        )}
      </main>
    </>
  )
}
