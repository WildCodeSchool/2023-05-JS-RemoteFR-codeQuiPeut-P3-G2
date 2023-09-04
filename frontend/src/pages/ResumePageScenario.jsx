// import React, { useEffect, useState } from "react"
import React, { useState } from "react"

import "./ResumePageScenario.scss"

import Navbar from "../components/Navbar"
// import axios from "axios"

import imgDefaultScenario from "../assets/images/defoscenario.png"
import fullStar from "../assets/images/etoile-pleine.png"
import emptyStar from "../assets/images/etoile-vide.png"

const ResumePageScenario = ({ scenario }) => {
  const [isFavorite, setIsFAvorite] = useState(false)
  const [addComment, setAddComment] = useState(false)

  const handleClickFavorite = () => {
    setIsFAvorite(!isFavorite)
  }

  const handleClickComment = () => {
    setAddComment(!addComment)
  }

  // useEffect(() => {
  //   axios.get
  // }, [])

  return (
    <>
      <main className="globalPage">
        <div className="headerNavbare">
          <Navbar />
        </div>
        <div className="titleResumeScenar">
          <h1>Titre de la campagne : {scenario} </h1>{" "}
          {/*  Penser à supprimer "Titre de la campagne : " */}
          <h2>Titre du scenario : {scenario} </h2>
          {/*  Penser à supprimer "Titre du scenario : " */}
        </div>
        <div className="mainInfos">
          <img src={imgDefaultScenario} alt="picture of scenario" />{" "}
          {/* Pour vivualisation => à supprimer après ! Et activer celle d'en dessous ! */}
          {/* <img src={imgScenar} alt="picture of scenario" /> */}
          <ul>
            <li>Theme : {scenario} </li>
            <li>
              Number of players : from {scenario} to {scenario}
              players
            </li>
            <li>Description : {scenario}</li>
            <li>Aim : {scenario}</li>
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
