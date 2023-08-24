import { useState, useContext } from "react"
import MyContext from "./MyContext"
import "./Login.scss"
import axios from "axios"

export default function Login() {
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
      .then(({ data }) => setUser(data))
      .catch(() => {
        setWrongEmailOrPassword(true)
      })
  }

  const HandleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const HandleChangePassWord = (event) => {
    setPassWord(event.target.value)
  }

  return (
    <div className="popUp">
      <form className="signUp">
        <h2>Connectez vous</h2>
        <div className="conteneurSVG">
          <svg>
            <line x1="0" x2="200" y1="0" y2="0" />
          </svg>
        </div>
        <div className="login">
          <div>
            <label htmlFor="email">Adresse email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={HandleChangeEmail}
            />
          </div>

          <div>
            <label htmlFor="passWord">Mot de passe</label>
            <input
              id="passWord"
              type="text"
              name="passWord"
              value={passWord}
              onChange={HandleChangePassWord}
            />
          </div>

          {wrongEmailOrPassword ?? (
            <p className="wrongLogin">Wrong Email or PassWord</p>
          )}

          <button type="button" onClick={HandleSubmitlogin}>
            Se connecter
          </button>
        </div>
        <p>Si vous n'avez pas de compte, créez le ici</p>
      </form>
    </div>
  )
}
