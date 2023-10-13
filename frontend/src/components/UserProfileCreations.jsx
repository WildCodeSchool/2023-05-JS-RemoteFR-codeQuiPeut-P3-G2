import CardCampaignCreation from "./CardCampaignCreation"
import CardScenarioCreation from "./CardScenarioCreation"
import Switch from "./Switch"
import "./UserProfileCreations.scss"
import { useState, useEffect } from "react"
import axios from "axios"
import myApi from "../services/myAPI"

export default function UserProfileCreations({
  scenariosUserFavorite,
  user,
  followerID,
  followersProfile,
}) {
  const [scenariosFinished, setScenariosFinished] = useState([])
  const [campagnesFinished, setCampagnesFinished] = useState([])
  const [scenariosCampaignType, setScenariosCampaignType] = useState("one shot")

  useEffect(() => {
    axios
      .get(
        `http://localhost:4242/scenariosInProgress/utilisateur/${followerID}`
      )
      .then((res) => {
        const finished = res.data.filter(
          (item) => parseInt(item.publication_date.slice(0, 4), 10) < 2990
        )
        setScenariosFinished(finished)
      })

    axios
      .get(
        `http://localhost:4242/campagnesDetailed/auteur/${followersProfile.auteurs_id}`
      )
      .then(({ data }) => {
        const finished = data.filter(
          (item) => parseInt(item.publication_date.slice(0, 4), 10) < 2990
        )
        setCampagnesFinished(finished)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="containerUserCreations">
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
          ? scenariosFinished.map((scenario) => (
              <div className="containerCard" key={scenario.id}>
                <div className="containerImg"></div>
                <CardScenarioCreation user={user} scenario={scenario} />
              </div>
            ))
          : campagnesFinished.map((campagne) => (
              <div className="containerCard" key={campagne.id}>
                <div className="containerImg"></div>
                <CardCampaignCreation campagne={campagne} user={user} />
              </div>
            ))}
      </div>
    </div>
  )
}
