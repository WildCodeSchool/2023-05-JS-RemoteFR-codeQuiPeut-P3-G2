// import { useState } from "react";
// import "./Switch.scss"
// // import React, { useState, useEffect } from "react"

// function Switch(props) {
//   const example = [
//     {
//       id: 1,
//       name: "scenario1",
//     },
//     {
//       id: 2,
//       name: "campagne1",
//     },
//   ]
//   const [selectedId, setSelectedId] = useState(1)
//   const handleSwitch = () => {
//     setSelectedId((prevSelectedId) => (prevSelectedId === 1 ? 2 : 1))
//   }

//   const selectedData = example.find((data) => data.id === selectedId)
//   props.onSelectedDataChange(selectedData);
//   return (
//     <>
//       <p>One Shot</p>
//       <label className="switch">
//         <input type="checkbox" onChange={handleSwitch}></input>
//         <span className="slider"></span>
//       </label>
//       <p>Campagne</p>
//       {/* <div>
//         <p>{props.selectedData && props.selectedData.name}</p>
//       </div> */}
//     </>
//   )
// }

// // // import "./Switch.scss"; // Assurez-vous d'importer correctement votre fichier CSS

// // // function Switch() {
// // //   const [isShowingScenarios, setIsShowingScenarios] = useState(true);
// // //   const [data, setData] = useState([]);

// // //   // Simuler la récupération des données depuis la base de données
// // //   useEffect(() => {
// // //     // Ici, vous pourriez appeler votre API pour récupérer les données
// // //     // et les stocker dans le state "data".
// // //     // C'est juste un exemple, vous devrez adapter cela à votre cas d'utilisation.
// // //     const mockData = isShowingScenarios
// // //       ? ["Scénario 1", "Scénario 2", "Scénario 3"]
// // //       : ["Campagne 1", "Campagne 2", "Campagne 3"];
// // //     setData(mockData);
// // //   }, [isShowingScenarios]);

// // //   return (
// // //     <>
// // //       <label className="switch">
// // //         <input
// // //           type="checkbox"
// // //           checked={isShowingScenarios}
// // //           onChange={() => setIsShowingScenarios(!isShowingScenarios)}
// // //         />
// // //         <span className="slider"></span>
// // //       </label>
// // //       <div>
// // //         {data.map((item, index) => (
// // //           <div key={index}>{item}</div>
// // //         ))}
// // //       </div>
// // //     </>
// // //   );
// // // }

// export default Switch
