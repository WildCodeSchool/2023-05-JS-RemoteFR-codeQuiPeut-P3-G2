import { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import MyContext from "./MyContext"
import "../components/Navbar.scss"
import ScripLogo from "../assets/ScripLogo.png"
import Login from "./Login"
import logout from "../assets/images/Logout.svg"
import SignUp from "./Signup"

const Navbar = () => {
  const { user, setUser } = useContext(MyContext)
  const [openForm, setOpenForm] = useState(false)
  const [openFormSignUp, setOpenFormSignUp] = useState(false)
  const [changeClassToOpenMenu, setChangeClassToOpenMenu] = useState(false)

  const HandleChangeClassTopOpenMenu = () => {
    setChangeClassToOpenMenu(!changeClassToOpenMenu)
  }
  const navigate = useNavigate()

  const HandleClickOpenLog = () => {
    setOpenForm(true)
  }

  const HandleClickLogout = () => {
    navigate("/")
    setUser(null)
  }

  const HandleClickOpenLogSignUp = () => {
    setOpenFormSignUp(true)
  }

  const handleLeaveMenu = () => {
    setChangeClassToOpenMenu(false)
  }

  useEffect(() => {
    if (openForm) {
      document.querySelector("nav").classList.add("nav-no-scroll")
    } else {
      document.querySelector("nav").classList.remove("nav-no-scroll")
    }
  }, [openForm])

  return (
    <nav className="ContainNav" alt="Navigation">
      <figcaption className="FeatherBox" alt="logo">
        <img src={ScripLogo}></img>
      </figcaption>
      <ul className="ContainLink">
        <Link to="/" className="">
          <li className="link" alt="Home">
            HOME
          </li>
        </Link>
        <Link to="/scripts" className="">
          <li className="link" alt="Scripts">
            SCRIPTS
          </li>
        </Link>

        {user !== null && (
          <Link to="/editor" className="">
            <li className="link" alt="Create">
              CREATE
            </li>
          </Link>
        )}
        <Link to="/forum" className="">
          <li className="link" alt="Forum">
            FORUM
          </li>
        </Link>
      </ul>
      <div className="PushContain">
        {user === null ? (
          <button className="push" type="button" onClick={HandleClickOpenLog}>
            LOG IN
          </button>
        ) : (
          <div className="loginContainer">
            <button
              className="userConnect"
              type="button"
              onClick={HandleChangeClassTopOpenMenu}
            >
              <p>{user.login}</p>
              {/* <img src={logout} alt="logout" onClick={HandleClickLogout} /> */}
            </button>
            <ul
              onMouseLeave={handleLeaveMenu}
              className={
                changeClassToOpenMenu
                  ? "scrollingMenu"
                  : "scrollingMenu displayNone"
              }
            >
              <Link to="/useraccount">
                <li>Informations</li>
              </Link>
              <Link to="/useraccount/favorites">
                <li>Favorites</li>
              </Link>
              <Link to="/useraccount/creations">
                <li>Creations</li>
              </Link>
              <Link to="/useraccount/followers">
                <li>Followers</li>
              </Link>
              <li onClick={HandleClickLogout}>
                <img src={logout} alt="logout" />
              </li>
            </ul>
          </div>
        )}
        <button
          className={user === null ? "push" : "hidden"}
          type="button"
          onClick={HandleClickOpenLogSignUp}
        >
          SIGN UP
        </button>
      </div>
      <div className="BurgerMenu">
        <div className="BurgerIcon"></div>
      </div>
      <div>
        {openForm && (
          <Login
            setOpenForm={setOpenForm}
            setOpenFormSignUp={setOpenFormSignUp}
            setChangeClassToOpenMenu={setChangeClassToOpenMenu}
          />
        )}
        {openFormSignUp && (
          <SignUp
            setOpenFormSignUp={setOpenFormSignUp}
            setOpenForm={setOpenForm}
            setChangeClassToOpenMenu={setChangeClassToOpenMenu}
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar
