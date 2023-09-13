// import { useState, useEffect } from "react"
// import axios from "axios"
import "./Button.scss"

function Button({
  scenarios,
  setFilteredScenarios,
  filteredScenarios,
  themes,
  setThemes,
  valueTheme,
  setValueTheme,
}) {
  function handleClickGender(id, name) {
    const filtered = scenarios.filter((scenario) => scenario.themeId === id)

    setFilteredScenarios(filtered)
    setValueTheme(name)
  }

  return (
    <div className="container-button">
      {themes.map((theme) => (
        <div key={theme.id} className="allButtonGenre">
          <button
            className="ButtonGenre"
            onClick={() => handleClickGender(theme.id, theme.name)}
          >
            {theme.name}
          </button>
        </div>
      ))}
      {/* <div className="filtered-scenarios">
        {filteredScenarios.map((scenario) => (
          <div key={scenario.id}>
            <CardScenario scenario={scenario} />
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Button
