import "./Button.scss"
// import { useState } from "react"
function Button({ selectedGenre, onGenreSelect }) {
  // const [filter, setFilter] = useState("")

  const examples = [
    {
      id: 1,
      name: "scenario1",
      genre: "horreur",
    },
    {
      id: 2,
      name: "campagne1",
      genre: "fantaisy",
    },
  ]

  //   const handleFilterByGender = (event) => setFilter(event.target.value)
  //   const filteredExamples = filter
  //     ? examples.filter((example) => example.genre === filter)
  //     : examples
  //   return (
  //     <>
  //       <div>
  //         {examples.map((example) => (
  //           <button
  //             className="ButtonGenre"
  //             key={example.id}
  //             onClick={handleFilterByGender}
  //           >
  //             {example.genre}
  //           </button>
  //         ))}
  //       </div>
  //       <div>
  //         {filteredExamples.map((example) => (
  //           <div key={example.id}>
  //             <p>
  //               {example.name}
  //               {example.genre}
  //             </p>
  //           </div>
  //         ))}
  //       </div>
  //     </>
  //   )
  // }

  return (
    <div>
      {examples.map((example) => (
        <button
          className={`ButtonGenre ${
            selectedGenre === example.genre ? "selected" : ""
          }`}
          key={example.id}
          onClick={() => onGenreSelect(example.genre)}
        >
          {example.genre}
        </button>
      ))}
    </div>
  )
}

export default Button
