import etoilePleine from "../assets/images/etoile-pleine.png"
import "./UserProfileFollowers.scss"

export default function UserProfileFollowers({ followersProfile }) {
  // const { user } = useContext(MyContext)

  return (
    <>
      {followersProfile.map((follower) => (
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
    </>
  )
}
