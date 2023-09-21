import "./Cursor.scss"
import React, { useState, useEffect } from "react"

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const updateCursorPosition = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateCursorPosition)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
    }
  }, [])

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  }

  return (
    <>
      <div className="cursor-outline-1" style={cursorStyle}></div>
      <div className="cursor-outline-2" style={cursorStyle}></div>
      <div className="cursor-outline-3" style={cursorStyle}></div>
      <div className="cursor-dot" style={cursorStyle}></div>
    </>
  )
}

export default Cursor
