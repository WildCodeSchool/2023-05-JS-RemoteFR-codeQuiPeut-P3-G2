import { useEffect, useContext, useState } from "react"
import MyContext from "./MyContext"
import axios from "axios"
import "./UserProfile.scss"
import profil from "../assets/images/pas_content.png"
import UserProfileFavorite from "./UserProfileFavorite"
import UserProfileCreations from "./UserProfileCreations"
import UserProfileFollowers from "./UserProfileFollowers"
import croix from "../assets/images/Close.svg"

export default function UserProfile({
  setShowPopUpProfile,
  followerID,
  followersProfile,
}) {
  const { user } = useContext(MyContext)
  const [ongletActif, setOngletActif] = useState(1)
  // const [scenariosUserFavorite, setScenariosUserFavorite] = useState([])

  const showTap = (numOnglet) => {
    setOngletActif(numOnglet)
  }

  const HandlecloseFormProfile = () => {
    setShowPopUpProfile(false)
  }

  return (
    <div className="popUpProfile">
      <div className="profile">
        <div className="imgcontainerClose">
          <img
            src={croix}
            alt="fermer la fenetre"
            onClick={HandlecloseFormProfile}
          />
        </div>
        <div className="containImg">
          <img
            className="imgPhoto"
            src={
              followersProfile.img === "none" ? profil : followersProfile.img
            }
            alt="photo de profil"
          />
          <p>{followersProfile.login}</p>
        </div>
        <div className="containerProfile">
          <ul>
            <li onClick={() => showTap(1)}>Favorite</li>
            <li onClick={() => showTap(2)}>Creations Finished</li>
            <li onClick={() => showTap(3)}>Followers</li>
          </ul>

          <div className="containTab">
            {ongletActif === 1 && (
              <UserProfileFavorite
                // scenariosUserFavorite={scenariosUserFavorite}
                // setScenariosUserFavorite={setScenariosUserFavorite}
                // setFollowersProfile= {setFollowersProfile}
                user={user}
                followerID={followerID}
              />
            )}
            {ongletActif === 2 && (
              <UserProfileCreations
                // scenariosUserFavorite={scenariosUserFavorite}
                user={user}
              />
            )}
            {ongletActif === 3 && (
              <UserProfileFollowers
                followerID={followerID}
                followersProfile={followersProfile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
