import "./Welcome.scss"
import TitreAccueil from "../assets/TitreAccueil.png"
import LivreAccueil from "../assets/LivreAccueil.png"
import mokeUp from "../assets/ordi.png"
import Navbar from "../components/Navbar"
// import CardScenario from "../components/CardScenario"
// import { useState, useEffect } from 'react'

const Welcome = () => {
  return (
    <>
      <main className="GlobalWelcContain" alt="Accueil">
        <Navbar />
        <header className="TitleContain">
          <div className="images_header">
            <img className="title" src={TitreAccueil} />
            <h1 className="SubTitCon">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
              aliquid perferendis eveniet. Consectetur, quis voluptatibus!
              Aspernatur repellat accusantium beatae! Repellendus atque nobis
              quod amet voluptatem ex cum asperiores! Enim, reprehenderit!
            </h1>
          </div>
          <img className="BookFall" src={LivreAccueil} />
        </header>

        <div className="find_create">
          <div className="FindScrip">
            <h2>FIND YOUR PERFECT SCRIPT</h2>
            <div className="conteneurSVG">
              <svg>
                <line x1="0" x2="200" y1="0" y2="0" />
              </svg>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laboriosam eius animi, sunt est harum delectus corporis repellat
              perspiciatis quas, minus voluptate minima rerum quos cupiditate
              maiores. Illo ducimus accusamus aliquid!
            </p>
            <button className="Explo" type="button">
              Explore
            </button>
          </div>
          <div className="CreateScrip">
            <h2>CREATE YOUR PERFECT SCRIPT</h2>
            <div className="conteneurSVG">
              <svg>
                <line x1="0" x2="200" y1="0" y2="0" />
              </svg>
            </div>
            <p className="TextContain">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur eum ullam repellat? Qui, repellendus nihil sit
              commodi enim facilis natus, consequatur possimus atque sed
              voluptates nam quam iure, cumque quo!
            </p>
            <button className="Create" type="button">
              Create
            </button>
          </div>
        </div>

        <div className="mokeUp">
          <h3>SIMPLE INTERFACE</h3>
          <div className="conteneurIMG">
            <img src={mokeUp} alt="" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur eum ullam repellat? Qui, repellendus nihil sit commodi
            enim facilis natus, consequatur possimus atque sed voluptates nam
            quam iure, cumque quo!
          </p>
        </div>
      </main>
    </>
  )
}
export default Welcome
