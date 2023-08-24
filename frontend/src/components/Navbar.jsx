import { useEffect, useState } from "react"
// import MyContext from "./MyContext"
import "../components/Navbar.scss"
import ScripLogo from "../assets/ScripLogo.png"
import Login from "./Login"

const Navbar = () => {
  // const { user, setUser } = useContext(MyContext)
  const [openForm, setOpenForm] = useState(false)
  const [logoLogin, setlogoLogin] = useState(false)
  const HandleClickOpenLog = () => {
    setOpenForm(true)
  }

  useEffect(() => {
    if (openForm) {
      document.querySelector("nav").classList.add("nav-no-scroll")
    } else {
      document.querySelector("nav").classList.remove("nav-no-scroll")
    }
  }, [openForm])

  return (
    <>
      <nav className="ContainNav" alt="Navigation">
        <figcaption className="FeatherBox" alt="logo">
          <img src={ScripLogo}></img>
        </figcaption>
        <ul className="ContainLink">
          <li className="link" alt="Home">
            HOME
          </li>
          <li className="link" alt="Scripts">
            SCRIPTS
          </li>
          <li className="link" alt="Create">
            CREATE
          </li>
          <li className="link" alt="Forum">
            FORUM
          </li>
        </ul>
        <div className="PushContain">
          {logoLogin === true ? (
            <button className="push" type="button" onClick={HandleClickOpenLog}>
              LOG IN
            </button>
          ) : (
            <button className="push" type="button">
              Bonjour toi!
            </button>
          )}
          <button className="push" type="button">
            SIGN UP
          </button>
        </div>
        <div className="BurgerMenu">
          <div className="BurgerIcon"></div>
        </div>
      </nav>
      {openForm && (
        <Login setlogoLogin={setlogoLogin} setOpenForm={setOpenForm} />
      )}
    </>
  )
}

export default Navbar
