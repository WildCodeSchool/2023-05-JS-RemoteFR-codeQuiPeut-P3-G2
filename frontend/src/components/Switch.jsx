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
  isChecked,
  setIsChecked,
}) {
  const checkHandler = () => {
    setIsChecked((prevChecked) => !prevChecked)

    const newType = isChecked ? "one shot" : "campagne"
    setValueType(newType)

    const updatedScenarios =
      newType === "one shot"
        ? scenarios.filter((scenario) => scenario.type === "one shot")
        : campagnes.filter((campagne) => campagne.type === "campagne")

    setTypeScenarios(updatedScenarios)
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
