import CardScenario from "./CardScenario"
import Switch from "./Switch"
import CardCampaign from "./CardCampaign"
import "./UserProfileFavorite.scss"
import { useEffect, useState } from "react"
import myApi from "../services/myAPI"

// export default function UserProfileFavorite({ scenariosUserFavorite, setScenariosUserFavorite, setFollowersProfile, user, followerID }) {
export default function UserProfileFavorite({ user, followerID }) {
  const [scenariosUserFavorite, setScenariosUserFavorite] = useState([])
  const [followersProfile, setFollowersProfile] = useState([])
  const [scenariosCampaignType, setScenariosCampaignType] = useState("one shot")
  const [campagnes, setCampagnes] = useState([])

  useEffect(() => {
    myApi.get(`/scenariosFavorites/utilisateur/${followerID}`).then((res) => {
      setScenariosUserFavorite(res.data)
    })

    myApi.get(`/followers/${followerID}`).then((res) => {
      setFollowersProfile(res.data)
    })

    myApi
      .get(`/campagnesFavorites/utilisateur/${followerID}`)
      .then(({ data }) => setCampagnes(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="containerUserFavorite">
      {/* <div className="boardCards">
        {scenariosUserFavorite.map((scenario) => (
          <div className="containerCard" key={scenario.id}>
            <CardScenario user={user} scenario={scenario} />
          </div>
        ))}
      </div> */}
      <div className="div-switch">
        <p>Scenarios</p>
        <Switch
          scenariosCampaignType={scenariosCampaignType}
          setScenariosCampaignType={setScenariosCampaignType}
        />
        <p>Campaigns</p>
      </div>
      <div className="boardCards">
        {scenariosCampaignType === "one shot"
          ? scenariosUserFavorite[0] &&
            scenariosUserFavorite.map((scenario) => (
              <div className="containerCard" key={scenario.id}>
                <CardScenario user={user} scenario={scenario} />
              </div>
            ))
          : campagnes[0] &&
            campagnes.map((campagne) => (
              <div className="containerCard" key={campagne.id}>
                <CardCampaign user={user} campaign={campagne} />
              </div>
            ))}
      </div>
    </div>
  )
}
