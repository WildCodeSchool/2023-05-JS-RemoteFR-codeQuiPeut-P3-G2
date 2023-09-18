import { useEffect } from "react"
import etoilePleine from "../assets/images/etoile-pleine.png"
import "./AccountFollowers.scss"
import axios from "axios"

export default function AccountFollowers() {
  // useEffect(() => {
  //     axios
  //     .get(`http://localhost:4242/utilisateurs/followers`, {
  //     auteurId: user.auteur_id,
  //   })

  //   }, [
  //     auteurId
  //   ])

  return (
    <div className="containerFollower">
      <div className="follower">
        <p>Utilisateur 1</p>
        <div className="containerFavoris">
          <img src={etoilePleine} alt="" />
          <p>60</p>
        </div>
        <p>30 vues</p>
        <p>3 avis</p>
        <button>Voir le profil</button>
        <button>Proposer co-écriture</button>
      </div>
    </div>
  )
}
