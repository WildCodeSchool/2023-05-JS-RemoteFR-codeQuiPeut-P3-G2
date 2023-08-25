import Button from "../components/Button"
import Navbar from "../components/Navbar"
import Switch from "../components/Switch"
import "./Scripts.scss"

export default function Scripts() {
  return (
    <div className="container">
      <Navbar />
      <header className="Title">
        <h1 className="Scripts">Scripts-Scripts-Scripts-Scripts</h1>
      </header>
      <div className="Filter">
        <div className="Type">
          <p>One Shot</p>
          <Switch />
          <p>Campagne</p>
        </div>
        <div className="Button">
          <Button />
          <Button />
          <Button />
          <Button />
        </div>
        <div className="conseiller">
          <p>The news</p>
          <p>Most populare</p>
          <p>All scénarios</p>
        </div>
        <div className="univers">
          <p>UNIVERSE</p>
        </div>
        <div className="auteur">
          <p>Autor</p>
          <select></select>
        </div>
        <div className="Difficultes">
          <p>Difficulty</p>
          <select></select>
        </div>
        <div className="nombre">
          <p>Number of player</p>
          <select></select>
        </div>
      </div>
    </div>
  )
}
