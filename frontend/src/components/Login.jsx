import { useState, useContext } from "react"
import MyContext from "./MyContext"
import "./Login.scss"
import axios from "axios"
import croix from "../assets/images/Close.svg"
import eye from "../assets/images/eye.svg"
import eyeOff from "../assets/images/eye_Off.svg"

export default function Login({ setOpenForm, setOpenFormSignUp }) {
  const { user, setUser } = useContext(MyContext)
  const [email, setEmail] = useState("")
  const [passWord, setPassWord] = useState("")
  const [wrongEmailOrPassword, setWrongEmailOrPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const HandleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

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
  }

  const HandleclosFormLogin = () => {
    setOpenForm(false)
  }

  const HandleCloseFormLoginOpenSignup = () => {
    setOpenForm(false)
    setOpenFormSignUp(true)
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
              <div className="inputPassword">
                <input
                  id="passWord"
                  type={showPassword ? "text" : "password"}
                  name="passWord"
                  value={passWord}
                  onChange={HandleChangePassWord}
                />
                <div className="containerImg" onClick={HandleClickShowPassword}>
                  <img
                    src={showPassword ? eyeOff : eye}
                    title={
                      showPassword
                        ? "masquer le mot de passe"
                        : "afficher le mot de passe"
                    }
                    alt={
                      showPassword
                        ? "logo oeil masquer le mot de passe"
                        : "logo oeil afficher le mot de passe"
                    }
                  />
                </div>
              </div>
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
