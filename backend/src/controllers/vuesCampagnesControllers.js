const models = require("../models")

const add = (req, res) => {
  const nbVues = req.body.nbVues
  const campagneId = req.body.campagneId

  // TODO validations (length, format...)

  models.vuesCampagnes
    .insert(nbVues, campagneId)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const nbVues = req.body.nbVues
  const campagneId = req.body.campagneId

  models.vuesCampagnes
    .update(nbVues, campagneId)
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
  edit,
}
