import { useState } from "react"
import "./Login.scss"

export default function Login() {
  const [email, setEmail] = useState("")
  const [passWord, setPassWord] = useState("")

  const HandleChangeEmail = (event) => {
    const input = event.target
    setEmail(input.value)
  }

  const HandleChangePassWord = (event) => {
    const input = event.target
    setPassWord(input.value)
  }

  return (
    <div className="popUp">
      <form className="signUp">
        <label htmlFor="email">Adresse email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={HandleChangeEmail}
        />

        <label htmlFor="passWord">Mot de passe</label>
        <input
          id="passWord"
          type="text"
          name="passWord"
          value={passWord}
          onChange={HandleChangePassWord}
        />
      </form>
    </div>
  )
}
