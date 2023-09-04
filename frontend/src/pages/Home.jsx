import { useState, useEffect } from "react"
import axios from "axios"

import CardScenario from "../components/CardScenario"

export default function Home() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4242/characters")
      .then((res) => setCharacters(res.data))
  }, [])

  return (
    <>
      <header className="App-header">
        {characters.map((character) => (
          <>
            <img src={character.imgUrl} alt={character.name} />
            <p>{character.firstname}</p>
          </>
        ))}
        <p>page Home</p>
      </header>
      <div className="MostPopular">
        <h1 className="Popular">POPULAR SCRIPTS</h1>
        <CardScenario />
      </div>
    </>
  )
}
