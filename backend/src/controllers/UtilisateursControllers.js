const models = require("../models")

const browse = (req, res) => {
  models.utilisateurs
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const add = (req, res) => {
  const utilisateurs = req.body

  // TODO validations (length, format...)

  models.utilisateurs
    .insert(utilisateurs)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.utilisateurs
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows[0])
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const utilisateurs = req.body

  // TODO validations (length, format...)

  const id = req.params.id

  models.utilisateurs
    .update(utilisateurs, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const destroy = (req, res) => {
  models.utilisateurs
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const login = (req, res) => {
  const { email, password } = req.body

  models.utilisateurs
    .login(email, password)
    .then()
    .catch((error) => {
      console.error("Erreur de connexion", error)
      res.sendStatus(500)
    })
}

const readUserByEmail = (req, res, next) => {
  models.utilisateurs
    .readUserByEmail(req.body.email)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        // res.send(rows[0])
        req.user = rows[0]
        next()
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const verifyPassword = (req, res, next) => {
  if (req.body.password === req.user.password) {
    next()
  } else {
    res.sendStatus(404)
  }
}

const sendUserWhoHasGoodEmailAndPassword = (req, res) => {
  models.utilisateurs
    .sendUserWhoHasGoodEmailAndPassword(req.body.email)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows[0])
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
  login,
  readUserByEmail,
  verifyPassword,
  sendUserWhoHasGoodEmailAndPassword,
}
