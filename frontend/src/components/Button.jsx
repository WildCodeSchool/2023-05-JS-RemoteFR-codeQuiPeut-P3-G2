// import { useState, useEffect } from "react"
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

    setThemes((prevState) =>
      prevState.map((theme) =>
        theme.id === id ? { ...theme, selected: !theme.selected } : theme
      )
    )
  }

  return (
    <div className="container-button">
      {themes.map((theme) => (
        <div key={theme.id} className="allButtonGenre">
          <button
            className="ButtonGenre"
            style={
              theme.selected
                ? { backgroundColor: "#ffbd59", color: "black" }
                : null
            }
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
