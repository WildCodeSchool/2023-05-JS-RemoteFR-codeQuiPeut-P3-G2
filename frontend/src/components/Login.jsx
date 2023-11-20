import { useState, useContext } from "react"
import MyContext from "./MyContext"
import "./Login.scss"
import myApi from "../services/myAPI"

import croix from "../assets/images/Close.svg"
import eye from "../assets/images/eye.svg"
import eyeOff from "../assets/images/eye_Off.svg"

export default function Login({
  setOpenForm,
  setOpenFormSignUp,
  setChangeClassToOpenMenu,
}) {
  const { user, setUser, setFollowedAutors } = useContext(MyContext)
  const [email, setEmail] = useState("")
  const [passWord, setPassWord] = useState("")
  const [wrongEmailOrPassword, setWrongEmailOrPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const HandleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const HandleSubmitlogin = () => {
    myApi
      .post("/login", {
        user,
        email,
        password: passWord,
      })
      .then(({ data }) => {
        setUser(data)
        myApi
          .get(`/autorFavorite/${data.id}`)
          .then(({ data }) => setFollowedAutors(data))
          .catch((err) => console.error(err))

        // Sauvegarde des informations de l'utilisateur dans le localStorage
        localStorage.setItem("user", JSON.stringify(data))
      })
      .then(() => setOpenForm(false))
      .catch((err) => {
        setWrongEmailOrPassword(true)
        console.error(err)
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
            className="cursorHover"
            alt="fermer la fenetre"
            onClick={HandleclosFormLogin}
          />
        </div>
        <div className="containerForm">
          <h2>Log in</h2>
          <div className="conteneurSVG">
            <svg>
              <line x1="0" x2="200" y1="0" y2="0" />
            </svg>
          </div>
          <div className="EmailPassword">
            <div className="labelInput">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={HandleChangeEmail}
              />
            </div>
            <div className="labelInput">
              <label htmlFor="passWord">Password</label>
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
                    className="cursorHover"
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
          <button
            type="button"
            onClick={HandleSubmitlogin}
            className="cursorHover"
          >
            Log In
          </button>

          <p>
            If you don't have an account,{" "}
            <span
              onClick={HandleCloseFormLoginOpenSignup}
              className="cursorHover"
            >
              create one here
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
