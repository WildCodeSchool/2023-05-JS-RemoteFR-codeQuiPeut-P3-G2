import { useState, useEffect } from "react"
import myApi from "../services/myAPI"

import CardScenario from "../components/CardScenario"

export default function Home() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    myApi.get("/characters").then((res) => setCharacters(res.data))
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
