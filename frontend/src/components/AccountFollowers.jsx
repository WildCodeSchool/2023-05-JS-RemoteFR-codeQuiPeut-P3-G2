import { useEffect,useContext, useState } from "react"
import MyContext from "./MyContext"
import etoilePleine from "../assets/images/etoile-pleine.png"
import "./AccountFollowers.scss"
import axios from "axios"
import UserProfile from "./userProfile"

export default function AccountFollowers() {
  const { user } = useContext(MyContext)
  const[followers,setFollowers]=useState([])
  const[showPopUpProfile, setShowPopUpProfile]=useState(false)

const handleClickShowPopupProfile=()=>{
  setShowPopUpProfile(true)
}


  useEffect(() => {
      axios
      .get(`http://localhost:4242/followers/${user.auteurId}`)
      .then((res) => {
        setFollowers(res.data)     
    })
  }, [])

  return (
    <>
      {followers.map((follower) => (
      <div className="containerFollower" key={follower.utilisateurId}>
        <div className="follower" >
          <p className="login">{follower.login}</p>
          <div className="containerFavoris">
            <img src={etoilePleine} alt="" />
            <p>{follower.nbFavoris}</p>
          </div>
          <p>{follower.nbAvis} avis</p>
          <button onClick={handleClickShowPopupProfile}>Voir le profil</button>
          <button>Proposer co-écriture</button>
        </div>
      </div>
      ))}
      {showPopUpProfile && <UserProfile showPopUpProfile={showPopUpProfile} setShowPopUpProfile={setShowPopUpProfile}/>}
    </>
  )
}
