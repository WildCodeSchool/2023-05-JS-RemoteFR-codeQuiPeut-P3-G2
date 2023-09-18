const Joi = require("joi")

const userSchema = Joi.object({
  lastname: Joi.string().min(1).max(100).required(),
  firstname: Joi.string().min(1).max(100).required(),
  login: Joi.string().min(1).max(100).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr", "unv"] },
    })
    .max(255)
    .required(),
  password: Joi.string().min(8).max(45),
  img: Joi.string().max(1000),
})

const userSchemaPassword = Joi.string().pattern(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et avoir une longueur minimale de 8 caractères."
)

const validateDataUsersNoCheckPassword = (req, res, next) => {
  const { lastname, firstname, login, email, password, img } = req.body

  const { error } = userSchema.validate(
    { lastname, firstname, login, email, password, img },
    { abortEarly: false }
  )

  if (error) {
    res.status(422).json({ validationErrors: error.details })
  } else {
    // console.info("sortie", req.body)
    next()
  }
}

const validateDataUsersCheckOnlyPassword = (req, res, next) => {
  const { password } = req.body

  const { error } = userSchemaPassword.validate(password, { abortEarly: false })

  if (error) {
    res.status(422).json({ validationErrors: error.details })
  } else {
    next()
  }
}

// const validateDataUsersCheckOnlyPassword = (req, res, next) => {
//   const { password } = req.body
//   console.info("entree_2", req.body)
//   // console.info("password", req.body.password)

//   const TestRegexPassword = (password) => {
//     console.info("password KaKa ?", password)
//     const regexPassword =
//       "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
//     regexPassword.test(req.body.password)
//   }
//   console.info("password", password)
//   // console.info("TestRegexPassword", TestRegexPassword())

//   if (TestRegexPassword) {
//     // alert("Mot de passe  valide")
//     next()
//   } else {
//     alert("Mot de passe invalide")
//   }
// }

module.exports = {
  validateDataUsersNoCheckPassword,
  validateDataUsersCheckOnlyPassword,
}
