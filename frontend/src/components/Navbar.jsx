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

          {user !== null && (
            <Link to="/editor" className="">
              <li className="link" alt="Create">
                CREATE
              </li>
            </Link>
          )}
          <li className="link" alt="Forum">
            FORUM
          </li>
        </ul>
        <div className="PushContain">
          {user === null ? (
            <button className="push" type="button" onClick={HandleClickOpenLog}>
              LOG IN
            </button>
          ) : (
            <button className="userConnect" type="button">
              <p>{user.login}</p>
              <img src={logout} alt="logout" onClick={HandleClickLogout} />
            </button>
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
      </nav>
      {openForm && (
        <Login
          setOpenForm={setOpenForm}
          setOpenFormSignUp={setOpenFormSignUp}
        />
      )}
      {openFormSignUp && (
        <SignUp
          setOpenFormSignUp={setOpenFormSignUp}
          setOpenForm={setOpenForm}
        />
      )}
    </>
  )
}

export default Navbar
