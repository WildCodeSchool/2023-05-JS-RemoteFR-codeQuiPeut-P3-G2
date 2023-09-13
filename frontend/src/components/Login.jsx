import { useState, useContext } from "react"
import MyContext from "./MyContext"
import "./Login.scss"
import axios from "axios"
import croix from "../assets/images/Close.svg"

export default function Login({
  setOpenForm,
  setOpenFormSignUp,
  setChangeClassToOpenMenu,
}) {
  const { user, setUser } = useContext(MyContext)
  const [email, setEmail] = useState("")
  const [passWord, setPassWord] = useState("")
  const [wrongEmailOrPassword, setWrongEmailOrPassword] = useState(false)

  const HandleSubmitlogin = () => {
    axios
      .post("http://localhost:4242/login", {
        user,
        email,
        password: passWord,
      })
      .then(({ data }) => {
        setUser(data)

        // Sauvegarde des informations de l'utilisateur dans le localStorage
        localStorage.setItem("user", JSON.stringify(data))
      })
      .then(() => setOpenForm(false))
      .catch(() => {
        setWrongEmailOrPassword(true)
      })

    setChangeClassToOpenMenu(false)
  }

  const HandleclosFormLogin = () => {
    setOpenForm(false)
    setChangeClassToOpenMenu(false)
  }

  const HandleCloseFormLoginOpenSignup = () => {
    setOpenForm(false)
    setOpenFormSignUp(true)
    setChangeClassToOpenMenu(false)
  }

  const HandleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const HandleChangePassWord = (event) => {
    setPassWord(event.target.value)
  }

  return (
    <div className="popUp">
      <form className="logIn">
        <div className="imgcontainer">
          <img
            src={croix}
            alt="fermer la fenetre"
            onClick={HandleclosFormLogin}
          />
        </div>
        <div className="containerForm">
          <h2>Connectez vous</h2>
          <div className="conteneurSVG">
            <svg>
              <line x1="0" x2="200" y1="0" y2="0" />
            </svg>
          </div>
          <div className="EmailPassword">
            <div className="labelInput">
              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={HandleChangeEmail}
              />
            </div>

            <div className="labelInput">
              <label htmlFor="passWord">Mot de passe</label>
              <input
                id="passWord"
                type="text"
                name="passWord"
                value={passWord}
                onChange={HandleChangePassWord}
              />
            </div>

            {wrongEmailOrPassword && (
              <p className="wrongLogin">Wrong Email or PassWord</p>
            )}
          </div>
          <button type="button" onClick={HandleSubmitlogin}>
            Se connecter
          </button>

          <p>
            Si vous n'avez pas de compte,{" "}
            <span onClick={HandleCloseFormLoginOpenSignup}>créez le ici</span>
          </p>
        </div>
      </form>
    </div>
  )
}
