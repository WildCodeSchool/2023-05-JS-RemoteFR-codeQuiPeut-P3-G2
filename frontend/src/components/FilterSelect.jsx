import { useEffect, useState } from "react"
import axios from "axios"
import "./FilterSelect.scss"

function FilterSelect({ filteredAuteur, setFilteredAuteur, scenarios }) {
  const [auteurs, setAuteurs] = useState([])
  const [valueAuteur, setValueAuteur] = useState("---")

  useEffect(() => {
    axios
      .get("http://localhost:4242/auteurs")
      .then((res) => setAuteurs(res.data) || console.info("axios", res.data))
      .catch((error) => console.error(error))
  }, [])

  function handleSelectAuteur(e) {
    setValueAuteur(e.target.value)
    const auteurId = auteurs.filter(
      (auteur) => auteur.name === e.target.value
    )[0].id
    const selectFiltered = scenarios.filter(
      (scenario) => scenario.auteurId === auteurId
    )

    setFilteredAuteur(selectFiltered)
  }

  return (
    <select
      className="autorSelect"
      onChange={handleSelectAuteur}
      value={valueAuteur}
    >
      <option>---</option>
      {auteurs.map((auteur) => (
        <option key={auteur.id}>{auteur.name} </option>
      ))}
    </select>
  )
}
export default FilterSelect
