import { useState } from "react"
import "./SignUp.scss"
import axios from "axios"
import croix from "../assets/images/Close.svg"

export default function SignUp({ setOpenFormSignUp }) {
  // const [inscription, setInscription] = useState(false)
  const [lastname, setLastname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [login, setLogin] = useState("")
  const [email, setEmail] = useState("")
  const [passWord, setPassWord] = useState("")
  const [img, setImg] = useState("")
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false)
  const [loginAlreadyUsed, setLoginAlreadyUsed] = useState(false)

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
            setLoginAlreadyUsed(false)
          } else if (data.errorMessage === "Login déjà existant") {
            setLoginAlreadyUsed(true)
            setEmailAlreadyUsed(false)
          }
        } else {
          console.error("Une erreur s'est produite : ", err.message)
        }
      })
  }

  const HandleclosFormSignUp = () => {
    setOpenFormSignUp(false)
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
              {loginAlreadyUsed ?? <p>Login déjà utilisé</p>}
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
              {emailAlreadyUsed ?? <p>Email déjà utilisé</p>}
            </div>
            <div className="labelInput">
              <label htmlFor="passWord">Choisissez un mot de passe</label>
              <input
                id="passWord"
                type="password"
                name="passWord"
                value={passWord}
                onChange={HandleChangePassWord}
              />
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
          <p>Si vous avez déjà un compte, connectez vous ici</p>
        </div>
      </form>
    </div>
  )
}
