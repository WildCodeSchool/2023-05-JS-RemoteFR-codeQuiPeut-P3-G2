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
      const targetElement = event.target
      const targetElementStyle = window.getComputedStyle(targetElement)
      const cursorStyle = targetElementStyle.getPropertyValue("cursor")

      if (cursorStyle === "pointer" || cursorStyle === "default") {
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
      <div
        style={cursorStyle}
        // className={`cursor-outline-1 ${isHovered ? "hovered" : ""}`}
        className="cursor-outline-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        style={cursorStyle}
        // className={`cursor-outline-2 ${isHovered ? "hovered" : ""}`}
        className="cursor-outline-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        style={cursorStyle}
        // className={`cursor-outline-3 ${isHovered ? "hovered" : ""}`}
        className="cursor-outline-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
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
