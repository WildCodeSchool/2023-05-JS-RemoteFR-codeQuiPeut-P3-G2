// import "./Cursor.scss"
// import React, { useState, useEffect } from "react"

// const Cursor = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 })

//   const updateCursorPosition = (e) => {
//     setPosition({ x: e.clientX, y: e.clientY })
//   }

//   useEffect(() => {
//     window.addEventListener("mousemove", updateCursorPosition)

//     return () => {
//       window.removeEventListener("mousemove", updateCursorPosition)
//     }
//   }, [])

//   const cursorStyle = {
//     left: `${position.x}px`,
//     top: `${position.y}px`,
//   }

//   return (
//     <>
//       <div className="cursor-outline-1" style={cursorStyle}></div>
//       <div className="cursor-outline-2" style={cursorStyle}></div>
//       <div className="cursor-outline-3" style={cursorStyle}></div>
//       <div className="cursor-dot" style={cursorStyle}></div>
//     </>
//   )
// }

// export default Cursor

import "./Cursor.scss"
import React, { useState, useEffect } from "react"
// import sourisScripter from "../assets/images/sourisScripter.png"
import sourisPlume from "../assets/images/sourisPlume4.png"

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const updateCursorPosition = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateCursorPosition)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (event) => {
      // const targetElement = event.target
      // const hasCursorHoverClass = targetElement.classList.contains('cursorHover');

      const targetElement = event.target.closest(".cursorHover")
      const hasCursorHoverClass = Boolean(targetElement)

      // event.target.closest('.cursorHover') renvoie l’élément lui-même ou l’ancêtre le plus proche avec la classe cursorHover, ou null si aucun élément correspondant n’a été trouvé. Ensuite, Boolean(targetElement) convertit cette valeur en un booléen, qui est true si un élément correspondant a été trouvé et false sinon.

      if (hasCursorHoverClass) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  }

  return (
    <>
      <img
        src={sourisPlume}
        alt="mouse"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={cursorStyle}
        className="cursor-mouse"
      />
      {/* <div
        style={cursorStyle}
        className={`cursor-outline-1 ${isHovered ? "hovered-line" : ""}`}
        // className="cursor-outline-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        style={cursorStyle}
        className={`cursor-outline-2 ${isHovered ? "hovered-line" : ""}`}
        // className="cursor-outline-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        style={cursorStyle}
        className={`cursor-outline-3 ${isHovered ? "hovered-line" : ""}`}
        // className="cursor-outline-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div> */}
      <div
        style={cursorStyle}
        // className="cursor-dot"
        className={`cursor-dot ${isHovered ? "hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
    </>
  )
}

export default Cursor
