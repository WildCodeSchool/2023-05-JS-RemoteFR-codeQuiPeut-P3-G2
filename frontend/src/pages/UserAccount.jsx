import { NavLink, Outlet } from "react-router-dom"
import { useState, useRef } from "react"
import Navbar from "../components/Navbar"
import "./UserAccount.scss"
import profil from "../assets/images/pas_content.png"
import pen from "../assets/images/Pen.svg"

export default function UserAccount() {
  const [img, setImg] = useState("none")

  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setImg(URL.createObjectURL(selectedFile))
    }
  }

  const handleClickImage = () => {
    fileInputRef.current.click()
  }

  return (
    <>
      <Navbar />
      <div className="userContainer">
        <section className="menu">
          <div className="photoAndMenu">
            <div className="photoProfil">
              <div className="containImg">
                <img
                  className="imgPhoto"
                  src={img !== "none" ? img : profil}
                  alt="photo de profil"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <div className="containLogoModify" onClick={handleClickImage}>
                  <img src={pen} alt="modifier image" />
                </div>
              </div>
            </div>
            <div className="containMenu">
              <NavLink className="buttonMenu" to="/useraccount/">
                <h2>Informations</h2>
              </NavLink>
              <NavLink className="buttonMenu" to="/useraccount/favorites">
                <h2>Favorites</h2>
              </NavLink>
              <NavLink className="buttonMenu" to="/useraccount/creations">
                <h2>Creations</h2>
              </NavLink>
              <NavLink className="buttonMenu" to="/useraccount/followers">
                <h2>Followers</h2>
              </NavLink>
            </div>
          </div>
        </section>
        <section className="outlet">
          <Outlet />
        </section>
      </div>
    </>
  )
}
