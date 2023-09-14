// import "./Switch.scss"
// // import axios from "axios"
// import React, { useState } from "react"

// function Switch({ typeScenarios, setTypeScenarios }) {
//   const [isChecked, setIsChecked] = useState(false)

//   const checkHandler = () => {
//     setIsChecked(!isChecked)

//     const changeType = isChecked
//       ? typeScenarios.filter((scenario) => scenario.type === "campagne")
//       : typeScenarios.filter((scenario) => scenario.type === "solo")

//     setTypeScenarios(changeType)
//   }

//   return (
//     <>
//       <label className="switch">
//         <input type="checkbox" checked={isChecked} onChange={checkHandler} />
//         <span className="slider"></span>
//       </label>
//     </>
//   )
// }

// export default Switch
