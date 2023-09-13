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
  // const [themes, setThemes] = useState([])

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4242/themes")
  //     .then((res) => setThemes(res.data) || console.info(res.data))
  //     .catch((error) => console.error(error))
  // }, [])

  // function handleClickgender(themes, scenarios) {
  //   const filteredScenarios = scenarios.filter(
  //     (scenario) => themes.name === themes
  //   )
  //   filteredScenarios.map((scenario) => (
  //     <div key={scenario.id}>
  //       <CardScenario scenario={scenario} />
  //     </div>
  //   ))
  // // }

  function handleClickGender(id, name) {
    const filtered = scenarios.filter((scenario) => scenario.themeId === id)

    setFilteredScenarios(filtered)
    setValueTheme(name)
  }

  return (
    <>
      {/* {themes.map((theme) => (
        <div key={theme.id}>
          <button className="ButtonGenre" onClick={handleClickGender}>
            {theme.name}
          </button>
        </div>
      ))} */}
      {themes.map((theme) => (
        <div key={theme.id}>
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
    </>
  )
}

export default Button
