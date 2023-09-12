import { useState, useEffect } from "react"
import axios from "axios"
import "./Button.scss"

function Button({ scenarios, onExportResult }) {
  const [themes, setThemes] = useState([])
  // const [filteredScenarios, setFilteredScenarios] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:4242/themes")
      .then((res) => setThemes(res.data) || console.info(res.data))
      .catch((error) => console.error(error))
  }, [])

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

  // function handleClickGender(themeName) {
  //   const filtered = scenarios.filter(
  //     (scenario) => scenario.theme === themeName
  //   )

  //   setFilteredScenarios(filtered)
  // }

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
            // onClick={() => handleClickGender(theme.name)}
          >
            {theme.name}
          </button>
        </div>
      ))}
      {/* 
      <div className="filtered-scenarios">
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
