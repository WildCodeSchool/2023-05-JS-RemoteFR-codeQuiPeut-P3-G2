import "../components/Navbar.scss"
import ScripLogo from "../assets/ScripLogo.png"

const Navbar = () => {
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
      </nav>
    </>
  )
}

export default Navbar
