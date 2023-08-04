import "../components/Navbar.scss"
import ScripLogo from "../assets/ScripLogo.png"

const Navbar = () => {
  return (
    <>
      <navbar className="ContainNav" alt="Navigation">
        <logo className="FeatherBox" alt="logo">
          <img src={ScripLogo}></img>
        </logo>
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
          <button className="push" type="button">
            LOG IN
          </button>
          <button className="push" type="button">
            SIGN UP
          </button>
        </div>
        <div className="BurgerMenu">
          <div className="BurgerIcon"></div>
        </div>
      </navbar>
    </>
  )
}

export default Navbar
