import { useState, useEffect } from "react"
import etoilePleine from "../assets/images/etoile-pleine.png"
import "./UserProfileFollowers.scss"
import axios from "axios"
import myApi from "../services/myAPI"

export default function UserProfileFollowers({ followerID, followersProfile }) {
  // const { user } = useContext(MyContext)
  const [followersOfUserFollower, setFollowersOfUserFollower] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/followers/${followersProfile.auteurs_id}`)
      .then((res) => {
        setFollowersOfUserFollower(res.data)
      })
  }, [])

  return (
    <main className="main-UserProfileFollowers">
      {followersOfUserFollower[0] &&
        followersOfUserFollower.map((follower) => (
          <div className="containerFollower" key={follower.utilisateurId}>
            <div className="follower">
              <p className="login">{follower.login}</p>
              <div className="containerFavoris">
                <img src={etoilePleine} alt="" />
                <p>{follower.nbFavoris}</p>
              </div>
              <p>30 vues</p>
              <p>{follower.nbAvis} avis</p>
            </div>
          </div>
        ))}
    </main>
  )
}
