import { useState, useContext } from "react"
import MyContext from "./MyContext"
import "./AccountInformations.scss"
import pen from "../assets/images/Pen.svg"
import axios from "axios"

export default function AccountInformations() {
  const { user, setUser } = useContext(MyContext)
  const [lastname, setLastname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [login, setLogin] = useState("")
  const [email, setEmail] = useState("")
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false)
  const [loginAlreadyUsed, setLoginAlreadyUsed] = useState(false)
  const [password, setPassword] = useState("")
  const [modifyInfo, setModifyInfo] = useState(false)
  const [successMessage, setSuccesMessage] = useState(false)
  const [successMessagePassword, setMessagePassword] = useState(false)
  const [modifyPassword, setModifyPassword] = useState(false)

  const HandleClickPutInformations = () => {
    axios
      .put(`http://localhost:4242/utilisateurs/${user.id}`, {
        lastname,
        firstname,
        login,
        email,
      })
      .then(() => {
        axios
          .get(`http://localhost:4242/utilisateurs/${user.id}`)
          .then((res) => setUser(res.data))
      })
      .then(() => {
        setSuccesMessage(true)
      })
      .then(() => {
        setModifyInfo(false)
      })
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

  const HandleClickPutPassWord = () => {
    axios
      .put(`http://localhost:4242/password/${user.id}`, {
        password,
      })
      .then(() => {
        setMessagePassword(true)
      })
      .then(() => {
        setModifyPassword(false)
      })
      .catch((err) => {
        console.error(err)
      })
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

  const HandletoModify = () => {
    setModifyInfo(true)
    setSuccesMessage(false)
  }

  const HandleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const HandletoModifyPassword = () => {
    setModifyPassword(true)
    setMessagePassword(false)
  }

  return (
    <>
      <form className="modifyAccount">
        <div className="containerForm">
          <div className="imgContainer">
            {modifyInfo ? (
              <p
                onClick={() => {
                  HandleClickPutInformations()
                }}
              >
                Enregistrer
              </p>
            ) : (
              <img src={pen} alt="pen for modify" onClick={HandletoModify} />
            )}
          </div>
          <div className="containInformation">
            <div className="LastnameFirstname">
              <div className="labelInput">
                <label htmlFor="lastname">Votre nom</label>
                {modifyInfo ? (
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    defaultValue={user.lastname}
                    onChange={HandleChangeLastname}
                    className="inputModify"
                  />
                ) : (
                  <p>{user ? user.lastname : ""}</p>
                )}
              </div>
              <div className="labelInput">
                <label htmlFor="firstname">Votre prénom</label>
                {modifyInfo ? (
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    defaultValue={user ? user.firstname : ""}
                    onChange={HandleChangeFirstname}
                    className="inputModify"
                  />
                ) : (
                  <p>{user ? user.firstname : ""}</p>
                )}
              </div>
            </div>
            <div className="labelInput">
              <label htmlFor="login">Votre pseudo</label>
              {modifyInfo ? (
                <input
                  id="login"
                  type="text"
                  name="login"
                  defaultValue={user.login}
                  onChange={HandleChangeLogin}
                  className="inputModify"
                />
              ) : (
                <p>{user ? user.login : ""}</p>
              )}
              {loginAlreadyUsed && <p>Login déjà utilisé</p>}
            </div>
            <div className="labelInput">
              <label htmlFor="email">Votre email</label>
              {modifyInfo ? (
                <input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  onChange={HandleChangeEmail}
                  className="inputModify"
                />
              ) : (
                <p>{user ? user.email : ""}</p>
              )}
            </div>
            <div className="emailMessageAndSuccessMessage">
              {emailAlreadyUsed && <p>Email déjà utilisé</p>}
              {successMessage && <p>Enregistrement Réussi</p>}
            </div>
          </div>
        </div>
        <div className="containerPassword">
          <div className="containerEditPassword">
            {successMessagePassword ? (
              <label
                style={{ color: "#ffbd59" }}
                htmlFor="password"
                // onClick={()=>{HandleClickPutPassWord()}}
              >
                Votre mot de passe a été modifié
              </label>
            ) : (
              <p>Modifiez votre mot de passe</p>
            )}

            <div className="imgContainer">
              {modifyPassword ? (
                <p
                  onClick={() => {
                    HandleClickPutPassWord()
                  }}
                >
                  Enregistrer
                </p>
              ) : (
                <img
                  src={pen}
                  alt="pen for modify"
                  onClick={HandletoModifyPassword}
                />
              )}
            </div>
          </div>
          <div>
            {modifyPassword && (
              <input
                id="password"
                type="password"
                name="password"
                defaultValue={""}
                onChange={HandleChangePassword}
                className="inputModify"
              />
            )}
          </div>
        </div>
      </form>
    </>
  )
}
