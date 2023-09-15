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
}) {
  const [isChecked, setIsChecked] = useState(false)

  const checkHandler = () => {
    setIsChecked((prevChecked) => !prevChecked)

    // const changeType = !isChecked
    //   ? scenarios.filter((scenario) => scenario.type === "one shot")
    //   : campagnes.filter((scenario) => scenario.type === "campagne")
    //   ? scenarios.filter((scenario) => scenario.type === "one shot")
    //   : campagnes.map((campagne) => campagne.type === "campagne")

    // setTypeScenarios(changeType)
    // setValueType(type)

    if (isChecked) {
      const oneShotScenarios = scenarios.filter(
        (scenario) => scenario.type === "one shot"
      )
      setTypeScenarios(oneShotScenarios)
      setValueType("one shot")
    } else {
      const campagneScenarios = campagnes.filter(
        (campagne) => campagne.type === "campagne"
      )
      setTypeScenarios(campagneScenarios)
      setValueType("campagne")
    }
  }

  return (
    <>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={checkHandler} />
        <span className="slider"></span>
      </label>
    </>
  )
}

export default Switch
