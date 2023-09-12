import { useState, useContext } from "react"
import MyContext from "./MyContext"
import "./AccountInformations.scss"
import pen from "../assets/images/Pen.svg"
import axios from "axios"
import eye from "../assets/images/eye.svg"
import eyeOff from "../assets/images/eye_Off.svg"

export default function AccountInformations() {
  const { user, setUser } = useContext(MyContext)
  const [lastname, setLastname] = useState(user.lastname)
  const [firstname, setFirstname] = useState(user.firstname)
  const [login, setLogin] = useState(user.login)
  const [email, setEmail] = useState(user.email)
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false)
  const [loginAlreadyUsed, setLoginAlreadyUsed] = useState(false)
  const [password, setPassword] = useState("")
  const [modifyInfo, setModifyInfo] = useState(false)
  const [successMessage, setSuccesMessage] = useState(false)
  const [successMessagePassword, setMessagePassword] = useState(false)
  const [modifyPassword, setModifyPassword] = useState(false)
  const[showPassword,setShowPassword]=useState(false)

  const HandleClickShowPassword=()=>{
    setShowPassword(!showPassword)
  }

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
                    value={lastname}
                    onChange={HandleChangeLastname}
                    className="inputModify"
                  />
                ) : (
                  <p>{lastname}</p>
                )}
              </div>
              <div className="labelInput">
                <label htmlFor="firstname">Votre prénom</label>
                {modifyInfo ? (
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={HandleChangeFirstname}
                    className="inputModify"
                  />
                ) : (
                  <p>{firstname}</p>
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
                  value={login}
                  onChange={HandleChangeLogin}
                  className="inputModify"
                />
              ) : (
                <p>{login}</p>
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
                  value={email}
                  onChange={HandleChangeEmail}
                  className="inputModify"
                />
              ) : (
                <p>{email}</p>
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
              <div className="inputPassword">
                <input
                  id="password"
                  type={showPassword ? "text" : "password" }
                  name="password"
                  value={password}
                  onChange={HandleChangePassword}
                  className="inputModify"
                />
                <div className="containerImg" onClick={HandleClickShowPassword}>
                  <img src={showPassword ? eyeOff : eye } title= {showPassword ? "masquer le mot de passe" : "afficher le mot de passe" } alt={showPassword ? "logo oeil masquer le mot de passe" : "logo oeil afficher le mot de passe" } />
                </div>
              </div>

            )}
          </div>
        </div>
      </form>
    </>
  )
}
