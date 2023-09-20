const models = require("../models")

const browse = (req, res) => {
  models.utilisateurs
    .findAllWithoutPassword()
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
  // console.info("RB__ADD", utilisateurs)

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
    .findWithoutPassword(req.params.id)
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

const readUserByEmailWithPassword = (req, res, next) => {
  models.utilisateurs
    .readUserByEmailWithPassword(req.body.email)
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
    .readUserByLogin(req.body.login)
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
    .readUserByEmailNoPassword(req.body.email)
    .then(([rows]) => {
      if (rows[0] == null) {
        next()
      } else {
        res.status(422).json({ errorMessage: "Mail déjà existant" })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ errorMessage: "Mail déjà existant" }) // inutile a cet endroit
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
        res.status(422).json({ errorMessage: "Login déjà existant" })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ errorMessage: "Login déjà existant" }) // inutile a cet endroit
    })
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
        res.send(rows)
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
  readUserByEmailWithPassword,
  readUserByLogin,
  verifyEmail,
  verifyLogin,
  sendUserWhoHasGoodEmailAndPassword,
  changePassword,
  usersWhoAreFollowers,
}
