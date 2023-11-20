const jwt = require("jsonwebtoken")

const encodeJWT = (payload) => {
  // il faut envoyer l'objet user au payload donc en entrée de la fonction
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "4h" })
}

const decodeJWT = (token) => {
  return jwt.decode(token, process.env.TOKEN_SECRET)
}

module.exports = { encodeJWT, decodeJWT }
