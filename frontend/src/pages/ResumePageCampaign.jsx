import { useState, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import MyContext from "../components/MyContext"
import Navbar from "../components/Navbar"
import myApi from "../services/myAPI"

import fullStar from "../assets/images/etoile-pleine.png"
import emptyStar from "../assets/images/etoile-vide.png"
import CardScenario from "../components/CardScenario"

export default function ResumePageCampaign() {
  const location = useLocation()
  const campagneID = location.state

  const [campagne, setCampagne] = useState([])
  const [scenariosOfSelectedCampagne, setScenariosOfSelectedCampagne] =
    useState([])

  const { user } = useContext(MyContext)
  const [isFavorite, setIsFAvorite] = useState(false)

  const handleFormatDate = (myDate) => {
    const year = myDate.slice(0, 4)
    const month = myDate.slice(5, 7)
    const day = myDate.slice(8, 10)
    return `${day}/${month}/${year}`
  }

  const handleClickFavorite = () => {
    if (user !== null) {
      setIsFAvorite(!isFavorite)
      if (isFavorite) {
        myApi.delete(`/favoriteCampaign`, {
          data: {
            utilisateurID: user.id,
            campaignID: campagneID,
          },
        })
      } else {
        myApi.post(`/favoriteCampaign`, {
          utilisateurID: user.id,
          campaignID: campagneID,
        })
      }
    } else {
      alert("Please log in to add favorites")
    }
  }

  useEffect(() => {
    if (user !== null) {
      myApi
        .get(`/utilisateurs/${user.id}/campagneFavorite/${campagneID}`)
        .then(({ data }) => {
          setIsFAvorite(true)
        })
        .catch(() => setIsFAvorite(false))
    }
  }, [])

  useEffect(() => {
    myApi
      .get(`/campagnes/${campagneID}`)
      .then(({ data }) => {
        setCampagne(data)
      })
      .catch((err) => console.error(err))

    myApi.get(`/campagnes/${campagneID}/detailedScenarios`).then(({ data }) => {
      data = data.map((item) => ({ ...item, title: item.name }))
      setScenariosOfSelectedCampagne(data)
    })
  }, [])

  return (
    <>
      <main className="main-resumePageScenario">
        <Navbar />

        {campagne.name && (
          <>
            <section className="mainInfos">
              <img
                className="imgResumPagScenar"
                src={campagne.img}
                alt="picture of scenario"
              />

              <div className="text-container">
                <h1>
                  <span>CAMPAIGN : </span>
                  {campagne.name}{" "}
                </h1>

                <ul>
                  <li>
                    <span>Role game / universe : </span>
                    {campagne.jeux_de_role}
                  </li>
                  <li>
                    {" "}
                    <span>Theme : </span>
                    {campagne.theme_name}{" "}
                  </li>

                  <li>
                    <span>Number of players : </span>
                    From {campagne.nb_player_min} to {campagne.nb_player_max}{" "}
                    players
                  </li>
                  <li>
                    <span>Difficulty : </span>
                    {campagne.level}{" "}
                  </li>
                  <li>
                    <span>Publication date : </span>
                    {handleFormatDate(campagne.publication_date)}{" "}
                  </li>
                </ul>
              </div>
              <img
                id="isFavorite"
                className="cursorHover"
                src={isFavorite ? fullStar : emptyStar}
                alt="isFavorite"
                title={
                  isFavorite
                    ? "Click to remove from favorites"
                    : "Click to add to favorites"
                }
                onClick={handleClickFavorite}
              />
            </section>

            <div className="div-synopsis">
              <p>
                <span>SYNOPSIS : </span>
              </p>
              <p>{campagne.synopsis}</p>
            </div>

            <div className="separation-line"></div>

            <h3>Campaign associated scenarios</h3>

            <section className="section-cards-scenarios">
              {scenariosOfSelectedCampagne.map((scenario) => (
                <CardScenario
                  scenario={scenario}
                  user={user}
                  key={scenario.id}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </>
  )
}
