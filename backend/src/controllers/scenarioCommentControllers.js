const models = require("../models")

const add = (req, res) => {
  const { utilisateurID, scenarioID, textcomment, datecomment } = req.body

  models.scenarcomms
    .add(utilisateurID, scenarioID, textcomment, datecomment)
    .then(([result]) => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const browse = (req, res) => {
  models.scenarcomms
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  const { scenarioID, utilisateurID } = req.body

  models.scenarcomms
    .deleteFavorite(scenarioID, utilisateurID)
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
  browse,
  destroy,
}
