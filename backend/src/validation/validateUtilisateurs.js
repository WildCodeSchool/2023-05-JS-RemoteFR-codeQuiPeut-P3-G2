const validateUtilisateurs = (req, res, next) => {
  // const { lastname, firstname, login, email, password, img, inscription_date } =   // A corriger au bon moment le "inscription_date"
  //   req.body
  const { lastname, firstname, login, email, password, img, inscriptionDate } =
    req.body
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/
  const errors = []

  if (lastname == null) {
    errors.push({ field: "lastname", message: "The field is required" })
  } else if (lastname.length > 100) {
    errors.push({
      field: "lastname",
      message:
        "The field is too long, it should contain less than 100 characters",
    })
  }
  if (firstname == null) {
    errors.push({ field: "firstname", message: "The field is required" })
  } else if (firstname.length > 100) {
    errors.push({
      field: "firstname",
      message:
        "The field is too long, it should contain less than 100 characters",
    })
  }
  if (login == null) {
    errors.push({ field: "login", message: "The field is required" })
  } else if (login.length > 100) {
    errors.push({
      field: "login",
      message:
        "The field is too long, it should contain less than 100 characters",
    })
  }
  if (email == null) {
    errors.push({ field: "email", message: "The field is required" })
  } else if (email.length > 255) {
    errors.push({
      field: "email",
      message:
        "The field is too long, it should contain less than 255 characters",
    })
  } else if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" })
  }
  if (password == null) {
    errors.push({ field: "password", message: "The field is required" })
  } else if (password.length > 45) {
    errors.push({
      field: "password",
      message:
        "The field is too long, it should contain less than 45 characters",
    })
  }
  if (img.length > 1000) {
    errors.push({
      field: "img",
      message:
        "The field is too long, it should contain less than 1000 characters",
    })
  }
  // if (inscription_date == null) {
  //   errors.push({ field: "inscription_date", message: "The field is required" }) // => bonne version, l'autre est pour le commit ...
  // }
  if (inscriptionDate == null) {
    errors.push({ field: "inscriptionDate", message: "The field is required" })
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors })
  } else {
    next()
  }
}

module.exports = {
  validateUtilisateurs,
}
