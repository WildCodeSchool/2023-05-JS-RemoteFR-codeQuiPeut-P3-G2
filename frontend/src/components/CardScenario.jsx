import "./CardScenario.scss"

function CardScenario() {
  return (
    <div className="Scenario">
      <div className="containerimg">
        <img src="../src/assets/L_ile_des_mors.png" alt="illustration" />
      </div>
      <div className="Card">
        <div className="title">
          <h2>L'ile des mors</h2>
          <img src="../src/assets/etoile_vide.png" alt="favoris" />
        </div>
        <div className="viewer">
          <p>30 avis</p>
          <p>96 vues</p>
        </div>
        <p className="description"> Description</p>
        <div className="theme">
          <p className="univers">Donjon & Dragon</p>
          <p className="genre">Horreur</p>
        </div>
        <div className="auteur">
          <p>Victor Hugo</p>
          <button type="button">suivre l'auteur</button>
        </div>
      </div>
    </div>
  )
}
export default CardScenario
