const { decodeJWT } = require("./jwtCreator")

const authorization = async (req, res, next) => {
  try {
    //   const headerBearerToken = req.header("authorization")
    //   if(!headerBearerToken) throw new error()

    //   const [_,token] = headerBearerToken.split(" ") //permet de défonir une variable token égale à la 2eme valeur du tableau
    const token = req.cookies.auth_token
    if (!token) throw new Error("Token not found")

    const data = decodeJWT(token)

    if (!data) {
      return res.status(401).send("Invalid authorization")
    }

    return next()
  } catch (err) {
    console.error(err)
    res.sendStatus(401)
  }
}

module.exports = {
  authorization,
}
