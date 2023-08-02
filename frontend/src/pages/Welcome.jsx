import "./Home.scss"
import TitreAccueil from "../assets/TitreAccueil.png"
import LivreAccueil from "../assets/LivreAccueil.png"
import TitleLine from "../assets/TitleLine.png"
// import { useState, useEffect } from 'react'

const Home = () => {
  return (
    <body className="GlobalWelcContain" alt="Accueil">
      <title className="TitleContain" alt="ScriptScenario">
        <img src={TitreAccueil}></img>
        <logo className="BookFall">
          <img src={LivreAccueil}></img>
        </logo>
        <div className="Line">
          <img src={TitleLine}></img>
        </div>
        <h1 className="SubTitCon">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
          aliquid perferendis eveniet. Consectetur, quis voluptatibus!
          Aspernatur repellat accusantium beatae! Repellendus atque nobis quod
          amet voluptatem ex cum asperiores! Enim, reprehenderit!
        </h1>
      </title>
      <div className="FindScrip">
        <h2>FIND YOUR PERFECT SCRIPT</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
          eius animi, sunt est harum delectus corporis repellat perspiciatis
          quas, minus voluptate minima rerum quos cupiditate maiores. Illo
          ducimus accusamus aliquid!
        </p>
        <button className="Explo" type="button"></button>
      </div>
      <div className="CreateScrip">
        <h3>CREATE YOUR PERFECT SCRIPT</h3>
        <p className="TextContain">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          eum ullam repellat? Qui, repellendus nihil sit commodi enim facilis
          natus, consequatur possimus atque sed voluptates nam quam iure, cumque
          quo!
        </p>
        <button className="Create" type="button"></button>
      </div>
    </body>
  )
}
export default Home
