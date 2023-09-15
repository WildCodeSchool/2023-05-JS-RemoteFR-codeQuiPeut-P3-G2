const models = require("../models")

const add = (req, res) => {
  const { utilisateurID, auteurID } = req.body

  models.auteursFavoris
    .addAuteur(utilisateurID, auteurID)
    .then(([result]) => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.auteursFavoris
    .findFavoriteAuteur(req.params.id)
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

const destroy = (req, res) => {
  const { auteurID, utilisateurID } = req.body

  models.auteursFavoris
    .deleteFavoriteAuteur(auteurID, utilisateurID)
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

module.exports = {
  add,
  read,
  destroy,
}
