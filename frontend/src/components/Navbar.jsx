import { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import MyContext from "./MyContext"
import "../components/Navbar.scss"
import ScripLogo from "../assets/ScripLogo.png"
import Login from "./Login"
import logout from "../assets/images/Logout.svg"
import SignUp from "./Signup"
import myApi from "../services/myAPI"

import InvitationPannel from "./InvitationPannel"

const Navbar = () => {
  const { user, setUser, setFollowedAutors } = useContext(MyContext)
  const [openForm, setOpenForm] = useState(false)
  const [openFormSignUp, setOpenFormSignUp] = useState(false)
  const [changeClassToOpenMenu, setChangeClassToOpenMenu] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)

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
    setFollowedAutors([])

    // suppression du token d'autentification
    myApi.get("/logout")
  }

  const HandleClickOpenLogSignUp = () => {
    setOpenFormSignUp(true)
  }

  const handleLeaveMenu = () => {
    setChangeClassToOpenMenu(false)
  }

  const handleClickButtonNotification = () => {
    setShowNotifications(true)
  }

  useEffect(() => {
    if (openForm) {
      document.querySelector("nav").classList.add("nav-no-scroll")
    } else {
      document.querySelector("nav").classList.remove("nav-no-scroll")
    }
  }, [openForm])

  useEffect(() => {
    if (user !== null) {
      myApi.get(`/invitations/utilisateur/${user.id}`).then(({ data }) => {
        const emitted = data.filter((item) => item.etat === "emitted")
        setNotifications(emitted)
      })
    }
  }, [user])

  return (
    <nav className="ContainNav" alt="Navigation">
      <figcaption className="FeatherBox cursorHover" alt="logo">
        <img src={ScripLogo}></img>
      </figcaption>
      <ul className="ContainLink">
        <Link to="/" className="li-container cursorHover">
          <li className="link" alt="Home">
            HOME
          </li>
        </Link>
        <Link to="/scripts" className="li-container cursorHover">
          <li className="link" alt="Scripts">
            SCRIPTS
          </li>
        </Link>

        {user !== null && (
          <Link to="/editor" className="li-container cursorHover">
            <li className="link" alt="Create">
              CREATE
            </li>
          </Link>
        )}
        <Link to="/forum" className="li-container cursorHover">
          <li className="link" alt="Forum">
            FORUM
          </li>
        </Link>
      </ul>
      <div className="PushContain">
        {user === null ? (
          <>
            <button
              className="push cursorHover"
              type="button"
              onClick={HandleClickOpenLog}
            >
              LOG IN
            </button>
            <button
              className={user === null ? "push cursorHover" : "hidden"}
              type="button"
              onClick={HandleClickOpenLogSignUp}
            >
              SIGN UP
            </button>
          </>
        ) : (
          <div className="loginContainer">
            {user !== null && notifications.length > 0 && (
              <button
                className="button-notifications cursorHover"
                title={`You got ${notifications.length} invitatations.`}
                onClick={handleClickButtonNotification}
              >
                {notifications.length}{" "}
              </button>
            )}

            <button
              className="userConnect cursorHover"
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
                  ? "scrollingMenu cursorHover"
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

        {/* </div>
      <div className="BurgerMenu">
        <div className="BurgerIcon"></div>
      </div>
      <div> */}
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

        {showNotifications && (
          <InvitationPannel
            invitations={notifications}
            setInvitations={setNotifications}
            setShowNotifications={setShowNotifications}
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar
