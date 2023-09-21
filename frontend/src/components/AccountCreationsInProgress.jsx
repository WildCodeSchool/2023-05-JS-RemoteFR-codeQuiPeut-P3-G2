import "./AccountCreationsInProgress.scss"
import CardScenarioCreation from "./CardScenarioCreation"
import CardCampaignCreation from "./CardCampaignCreation"
import { useState } from "react"
import Switch from "./Switch"

export default function AccountCreationsInProgress({
  scenariosInProgress,
  campagnesInProgress,
  user,
}) {
  const [scenariosCampaignType, setScenariosCampaignType] = useState("one shot")

  return (
    <div className="containerCreationsInProgress">
      <h1>My creations in progress</h1>

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
          ? scenariosInProgress.map((scenario) => (
              <div className="containerCard" key={scenario.id}>
                <div className="containerImg"></div>
                <CardScenarioCreation user={user} scenario={scenario} />
              </div>
            ))
          : campagnesInProgress.map((campagne) => (
              <div className="containerCard" key={campagne.id}>
                <div className="containerImg"></div>
                <CardCampaignCreation campagne={campagne} user={user} />
              </div>
            ))}
      </div>
    </div>
  )
}
