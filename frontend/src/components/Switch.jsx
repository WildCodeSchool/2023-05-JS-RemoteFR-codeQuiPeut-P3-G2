import "./Switch.scss"
// import axios from "axios"
import React, { useState } from "react"

function Switch({
  setTypeScenarios,
  typeScenarios,
  setValueType,
  campagnes,
  setCampagnes,
  scenarios,
  scenariosCampaignType,
  setScenariosCampaignType,
}) {
  const [isChecked, setIsChecked] = useState(false)
  const checkHandler = () => {
    setIsChecked(!isChecked)

    if (scenariosCampaignType === "one shot") {
      setScenariosCampaignType("campagne")
    } else {
      setScenariosCampaignType("one shot")
    }
  }

  return (
    <div className="containerSwitch">
      <label className="switch">
        <input
          type="checkbox"
          value={isChecked}
          checked={isChecked}
          onChange={checkHandler}
        />
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default Switch
