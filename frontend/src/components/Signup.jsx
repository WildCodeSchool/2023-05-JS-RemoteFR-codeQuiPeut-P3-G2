import { useState } from "react"
import "./SignUp.scss"
import axios from "axios"
import croix from "../assets/images/Close.svg"
import eye from "../assets/images/eye.svg"
import eyeOff from "../assets/images/eye_Off.svg"

export default function SignUp({
  setOpenFormSignUp,
  setOpenForm,
  setChangeClassToOpenMenu,
}) {
  // const [inscription, setInscription] = useState(false)
  const [lastname, setLastname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [login, setLogin] = useState("")
  const [email, setEmail] = useState("")
  const [passWord, setPassWord] = useState("")
  const [img, setImg] = useState("")
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false)
  const [loginAlreadyUsed, setLoginAlreadyUsed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const HandleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const HandleSubmitSignUp = () => {
    axios
      .post("http://localhost:4242/signup", {
        lastname,
        firstname,
        login,
        email,
        password: passWord,
        img,
      })
      // .then(() => setInscription(true))
      .then(() => setOpenFormSignUp(false))
      .catch((err) => {
        if (err.response) {
          const { data } = err.response
          if (data.errorMessage === "Mail déjà existant") {
            setEmailAlreadyUsed(true)
            // setLoginAlreadyUsed(false)
          } else if (data.errorMessage === "Login déjà existant") {
            setLoginAlreadyUsed(true)
            // setEmailAlreadyUsed(false)
          }
        } else {
          console.error("Une erreur s'est produite : ", err.message)
        }
      })

    setChangeClassToOpenMenu(false)
    console.info(loginAlreadyUsed)
    console.info(emailAlreadyUsed)
    // console.info(err.message)
  }

  const HandleCloseFormSignOpenLog = () => {
    setOpenFormSignUp(false)
    setOpenForm(true)
    setChangeClassToOpenMenu(false)
  }

  const HandleclosFormSignUp = () => {
    setOpenFormSignUp(false)
    setChangeClassToOpenMenu(false)
  }

  const HandleChangeLastname = (event) => {
    setLastname(event.target.value)
  }

  const HandleChangeFirstname = (event) => {
    setFirstname(event.target.value)
  }

  const HandleChangeLogin = (event) => {
    setLogin(event.target.value)
  }

  const HandleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const HandleChangePassWord = (event) => {
    setPassWord(event.target.value)
  }

  const HandleChangeImg = (event) => {
    setImg(event.target.value)
  }

  return (
    <div className="popUpSignUp">
      <form className="signUp">
        <div className="imgcontainer">
          <img
            src={croix}
            alt="fermer la fenetre"
            onClick={HandleclosFormSignUp}
          />
        </div>
        <div className="mainContainer">
          <div className="containerForm">
            <h2>Inscrivez vous</h2>
            <div className="conteneurSVG">
              <svg>
                <line x1="0" x2="200" y1="0" y2="0" />
              </svg>
            </div>
            <div className="containInformation">
              <div className="LastnameFirstname">
                <div className="labelInput">
                  <label htmlFor="lastname">Votre nom</label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={HandleChangeLastname}
                  />
                </div>
                <div className="labelInput">
                  <label htmlFor="firstname">Votre prénom</label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={HandleChangeFirstname}
                  />
                </div>
              </div>
              <div className="labelInput">
                <label htmlFor="login">Choisissez un pseudo</label>
                <input
                  id="login"
                  type="text"
                  name="login"
                  value={login}
                  onChange={HandleChangeLogin}
                />
                {loginAlreadyUsed && <p>Login déjà utilisé</p>}
              </div>
              <div className="labelInput">
                <label htmlFor="email">Votre mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={HandleChangeEmail}
                />
                {emailAlreadyUsed && <p>Email déjà utilisé</p>}
              </div>
              <div className="labelInput">
                <label htmlFor="passWord">Choisissez un mot de passe</label>
                <div className="inputPassword">
                  <input
                    id="passWord"
                    type={showPassword ? "text" : "password"}
                    name="passWord"
                    value={passWord}
                    onChange={HandleChangePassWord}
                  />
                  <div
                    className="containerImg"
                    onClick={HandleClickShowPassword}
                  >
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
              <div className="labelInput">
                <label htmlFor="img">Choisissez votre image de profil</label>
                <input
                  id="img"
                  type="file"
                  name="img"
                  accept="image/png, image/jpeg"
                  value={img}
                  onChange={HandleChangeImg}
                />
              </div>
            </div>
            <button type="button" onClick={HandleSubmitSignUp}>
              Confirmer l'inscription
            </button>
            <p>
              Si vous avez déjà un compte,{" "}
              <span onClick={HandleCloseFormSignOpenLog}>
                connectez vous ici
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
