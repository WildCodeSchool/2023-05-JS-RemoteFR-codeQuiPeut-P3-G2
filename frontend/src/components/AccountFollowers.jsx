import { useEffect, useContext, useState } from "react"
import MyContext from "./MyContext"
import etoilePleine from "../assets/images/etoile-pleine.png"
import "./AccountFollowers.scss"
import axios from "axios"
import UserProfile from "./userProfile"
import FormInvitationCollaboration from "./FormInvitationCollaboration"

export default function AccountFollowers() {
  const { user } = useContext(MyContext)
  const [followers, setFollowers] = useState([])
  const [showPopUpProfile, setShowPopUpProfile] = useState(false)
  const [followerID, setFollowerId] = useState()
  const [followersProfile, setFollowersProfile] = useState([])
  const [showFormProposeCoWriting, setShowFormProposeCoWriting] =
    useState(false)

  const handleClickShowPopupProfile = (id) => {
    setFollowerId(id)
    setShowPopUpProfile(true)

    axios.get(`http://localhost:4242/utilisateurs/${id}`).then((res) => {
      setFollowersProfile(res.data)
    })
  }

  const handleClickProposeCoWriting = (id) => {
    setFollowerId(id)
    setShowFormProposeCoWriting(true)
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
          <div className="follower">
            <p className="login">{follower.login}</p>
            <div className="containerFavoris">
              <img src={etoilePleine} alt="" />
              <p>{follower.nbFavoris}</p>
            </div>
            <p>{follower.nbAvis} avis</p>
            <button
              className="cursorHover"
              onClick={() =>
                handleClickShowPopupProfile(follower.utilisateurId)
              }
            >
              Voir le profil
            </button>
            <button
              className="cursorHover"
              onClick={() =>
                handleClickProposeCoWriting(follower.utilisateurId)
              }
            >
              Proposer co-écriture
            </button>
          </div>
        </div>
      ))}
      {showPopUpProfile && (
        <UserProfile
          showPopUpProfile={showPopUpProfile}
          setShowPopUpProfile={setShowPopUpProfile}
          followerID={followerID}
          followersProfile={followersProfile}
        />
      )}

      {showFormProposeCoWriting && (
        <FormInvitationCollaboration
          followerID={followerID}
          setShowFormProposeCoWriting={setShowFormProposeCoWriting}
        />
      )}
    </>
  )
}
