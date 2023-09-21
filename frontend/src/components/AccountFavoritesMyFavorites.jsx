import CardScenario from "./CardScenario"
import CardCampaign from "./CardCampaign"
import "./AccountFavoritesMyFavorites.scss"
import Switch from "./Switch"
import { useState } from "react"

export default function AccountFavoritesMyFavorites({
  scenariosFavorite,
  campagnes,
  user,
}) {
  const [scenariosCampaignType, setScenariosCampaignType] = useState("one shot")

  return (
    <div className="containerMyFavorites">
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
          ? scenariosFavorite[0] &&
            scenariosFavorite.map((scenario) => (
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
