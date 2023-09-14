import "./CardScenario.scss"
import etoile from "../assets/images/etoile-vide.png"

function CardScenario({ scenario }) {
  // console.log(scenario)
  return (
    <div className="Scenario">
      <div className="containerimg">
        <img src={scenario.img} alt="illustration" />
      </div>
      <div className="Card">
        <div className="title">
          <h2>{scenario.title}</h2>
          <img src={etoile} alt="favoris" />
        </div>
        <div className="viewer">
          <p>{scenario.nb_avis} avis</p>
          <p>96 vues</p>
        </div>
        <p className="description"> {scenario.description} </p>
        <div className="theme">
          <p className="univers">{scenario.universe}</p>
          <p className="genre">{scenario.theme}</p>
        </div>
        <div className="auteur">
          <p>{scenario.autor}</p>
          <button type="button">suivre l'auteur</button>
        </div>
      </div>
    </div>
  )
}
export default CardScenario
