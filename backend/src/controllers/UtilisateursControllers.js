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

const readUserByLogin = (req, res, next) => {
  models.utilisateurs
    .readUserByEmail(req.body.login)
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

const verifyEmail = (req, res, next) => {
  models.utilisateurs
    .readUserByEmail(req.body.email)
    .then(([rows]) => {
      if (rows[0] == null) {
        next()
      } else {
        res.sendStatus(404)
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ errorMessage: "Mail déjà existant" })
    })
}

const verifyLogin = (req, res, next) => {
  models.utilisateurs
    .readUserByLogin(req.body.login)
    .then(([rows]) => {
      if (rows[0] == null) {
        next()
      } else {
        // res.send(rows[0])
        res.sendStatus(404)
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ errorMessage: "Login déjà existant" })
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

const changePassword = (req, res) => {
  const utilisateurs = req.body
  const id = req.params.id

  models.utilisateurs
    .updatePassword(utilisateurs, id)
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

const usersWhoAreFollowers = (req, res) => {
  models.utilisateurs
    .usersWhoAreFollowers(req.params.auteurId)
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
  readUserByEmail,
  readUserByLogin,
  verifyPassword,
  verifyEmail,
  verifyLogin,
  sendUserWhoHasGoodEmailAndPassword,
  changePassword,
  usersWhoAreFollowers,
}
