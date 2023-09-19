const models = require("../models")

const add = (req, res) => {
  const nbVues = req.body.nbVues
  const scenarioId = req.body.scenarioId

  // TODO validations (length, format...)

  models.vuesScenarios
    .insert(nbVues, scenarioId)
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
  const scenarioId = req.body.scenarioId

  models.vuesScenarios
    .update(nbVues, scenarioId)
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
