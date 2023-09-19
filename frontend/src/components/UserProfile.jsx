import { useEffect, useContext, useState } from "react"
import MyContext from "./MyContext"
import axios from "axios"
import "./UserProfile.scss"
import profil from "../assets/images/pas_content.png"
import UserProfileFavorite from "./UserProfileFavorite"
import UserProfileCreations from "./UserProfileCreations"
import UserProfileFollowers from "./UserProfileFollowers"
import croix from "../assets/images/Close.svg"

export default function UserProfile({setShowPopUpProfile}){
const { user } = useContext(MyContext)
const [ongletActif, setOngletActif] = useState(1)
const [scenariosUserFavorite, setScenariosUserFavorite]=useState([])
const [followersProfile,setFollowersProfile]=useState([])

const showTap = (numOnglet) => {
        setOngletActif(numOnglet)
      }

const HandlecloseFormProfile = () => {
    setShowPopUpProfile(false)
      }

      useEffect(() => {
        axios
          .get(`http://localhost:4242/scenariosFavorites/utilisateur/${user.id}`)
          .then((res) => {
            setScenariosUserFavorite(res.data)
          })

          axios
          .get(`http://localhost:4242/followers/${user.auteurId}`)
          .then((res) => {
            setFollowersProfile(res.data)     
        })  

      }, [])

    return(
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
                    src={profil}
                    alt="photo de profil"
                    />
                </div>
                <p>The best</p>
                <div className="containerProfile">
                        <ul>
                            <li onClick={() => showTap(1)}>Favorite</li>
                            <li onClick={() => showTap(2)}>Creations Finished</li>
                            <li onClick={() => showTap(2)}>Followers</li>
                        </ul>

                        <div className="containTab">
                            {ongletActif === 1 && (
                            <UserProfileFavorite
                            scenariosUserFavorite={scenariosUserFavorite}
                                user={user}
                            />
                            )}
                            {ongletActif === 2 && (
                            <UserProfileCreations
                            scenariosUserFavorite={scenariosUserFavorite}
                                user={user}
                            />
                            )}
                            {ongletActif === 3 && (
                            <UserProfileFollowers
                            followersProfile={followersProfile}
                                user={user}
                            />
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}