import { useState, useContext, useEffect } from "react"
import MyContext from "../components/MyContext"
import Navbar from "../components/Navbar"
import axios from "axios"

// import imgDefaultScenario from "../assets/images/defoscenario.png"
import fullStar from "../assets/images/etoile-pleine.png"
import emptyStar from "../assets/images/etoile-vide.png"

// const ResumePageScenario = ({ scenario }) => {
const ResumePageScenario = () => {
  const scenario = {
    id: 1,
    auteur_id: 1,
    jeux_de_role: "The Witcher",
    jeux_de_role_id: 1,
    campagnes_id: 1,
    campagnes_name: "The Witcher dans JP",
    name: "Jurassic Park",
    nb_player_min: 2,
    nb_player_max: 4,
    type: "one shot",
    level: "hard",
    img: "http://localhost:4242/public/assets/images/cameleon1.jpg1693405905262.jpg",
    description:
      "c'est l'histoire d'un mec qui se fait bouffer par un dinosaure dans THe Witcher ...",
    model: 1,
  }
  const { user } = useContext(MyContext)
  const [isFavorite, setIsFAvorite] = useState(false)
  const [addComment, setAddComment] = useState(false)

  const handleClickFavorite = () => {
    if (user !== null) {
      setIsFAvorite(!isFavorite)
      if (isFavorite) {
        axios.delete(`http://localhost:4242/favorite`, {
          data: {
            utilisateurID: user.id,
            scenarioID: scenario.id,
          },
        })
      } else {
        axios.post(`http://localhost:4242/favorite`, {
          utilisateurID: user.id,
          scenarioID: scenario.id,
        })
      }
    } else {
      alert("Please log in to add favorites")
    }
  }

  const handleClickComment = () => {
    setAddComment(!addComment)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/favorite/${scenario.id}`)
      .then(() => {
        setIsFAvorite(true)
      })
      .catch(() => setIsFAvorite(false))
  }, [])

  return (
    <>
      <main className="globalPage">
        <div className="headerNavbare">
          <Navbar />
        </div>
        <div className="titleResumeScenar">
          <h1>Titre de la campagne : {scenario.campagnes_name} </h1>
          {/*  Penser à supprimer "Titre de la campagne : " */}
          <h2>Titre du scenario : {scenario.name} </h2>
          {/*  Penser à supprimer "Titre du scenario : " */}
        </div>
        <div className="mainInfos">
          <img src={scenario.img} alt="picture of scenario" />
          {/* Pour vivualisation => à supprimer après ! Et activer celle d'en dessous ! */}
          {/* <img src={imgScenar} alt="picture of scenario" /> */}
          <ul>
            <li>Theme : {scenario.jeux_de_role} </li>
            <li>
              Number of players : from {scenario.nb_player_min} to{" "}
              {scenario.nb_player_max}
              players
            </li>
            <li>Description : {scenario.description}</li>
            {/* <li>Aim : {scenario}</li> */}
          </ul>
          <img
            id="isFavorite"
            src={isFavorite ? fullStar : emptyStar}
            alt="isFavorite"
            title={
              isFavorite
                ? "Click to remove from favorites"
                : "Click to add to favorites"
            }
            onClick={handleClickFavorite}
          />
        </div>
        <div className="scenarInteractions">
          <div className="scenarInteractionsHight">
            <input type="button" value="Read the Scenario" />
            <input
              type="button"
              value="Leave a Comment"
              id="buttonAddComment"
              onClick={handleClickComment}
            />
          </div>
          {addComment && (
            <div className="scenarInteractionsLow">
              <textarea
                name="Commment"
                id="scenarCom"
                cols="30"
                rows="10"
                maxLength="300"
                placeholder="Add here your comment ... "
              ></textarea>
              <input type="button" value="Submit" />
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default ResumePageScenario
