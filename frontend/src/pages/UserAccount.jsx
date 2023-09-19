import { NavLink, Outlet } from "react-router-dom"
import { useState, useRef, useContext } from "react"
import Navbar from "../components/Navbar"
import "./UserAccount.scss"
import profil from "../assets/images/pas_content.png"
import pen from "../assets/images/Pen.svg"
import MyContext from "../components/MyContext"
import axios from "axios"

export default function UserAccount() {
  const { user, setUser } = useContext(MyContext)
  const [img, setImg] = useState(user.img)

  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    // const selectedFile = event.target.files[0]
    // if (selectedFile) {
    //   setImg(URL.createObjectURL(selectedFile))
    // }

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    if (img === "none") {
      axios
        .post("http://localhost:4242/tmpImage", formData)
        .then(({ data }) => {
          setImg(data)
          return data
        })
        .then((newImg) => {
          axios
            .put(`http://localhost:4242/utilisateurs/${user.id}`, {
              lastname: user.lastname,
              firstname: user.firstname,
              login: user.login,
              email: user.email,
              img: newImg,
            })
            .then(() => {
              axios
                .get(`http://localhost:4242/utilisateurs/${user.id}`)
                .then((res) => setUser(res.data))
            })
        })
    } else {
      axios.delete("http://localhost:4242/deleteTmpImage", {
        data: {
          img_src: img,
        },
      })
      axios
        .post("http://localhost:4242/tmpImage", formData)
        .then(({ data }) => {
          setImg(data)
          return data
        })
        .then((newImg) => {
          axios
            .put(`http://localhost:4242/utilisateurs/${user.id}`, {
              lastname: user.lastname,
              firstname: user.firstname,
              login: user.login,
              email: user.email,
              img: newImg,
            })
            .then(() => {
              axios
                .get(`http://localhost:4242/utilisateurs/${user.id}`)
                .then((res) => setUser(res.data))
            })
        })
    }
  }

  // const handleClickImage = () => {
  //   fileInputRef.current.click()
  // }

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
                  // accept="image/*"
                  id="inputModifyImageUserAccount"
                  onChange={handleFileChange}
                  // ref={fileInputRef}
                  style={{ display: "none" }}
                />
                {/* <div className="containLogoModify" onClick={handleClickImage}>
                  <img src={pen} alt="modifier image" />
                </div> */}
                <label
                  className="containLogoModify"
                  htmlFor="inputModifyImageUserAccount"
                >
                  <img src={pen} alt="modifier image" />
                </label>
              </div>
            </div>
            <div className="containMenu">
              <NavLink
                className="buttonMenu"
                activeClassName="active"
                to="/useraccount/"
              >
                <h2>Informations</h2>
              </NavLink>
              <NavLink
                className="buttonMenu"
                activeClassName="active"
                to="/useraccount/favorites"
              >
                <h2>Favorites</h2>
              </NavLink>
              <NavLink
                className="buttonMenu"
                activeClassName="active"
                to="/useraccount/creations"
              >
                <h2>Creations</h2>
              </NavLink>
              <NavLink
                className="buttonMenu"
                activeClassName="active"
                to="/useraccount/followers"
              >
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
