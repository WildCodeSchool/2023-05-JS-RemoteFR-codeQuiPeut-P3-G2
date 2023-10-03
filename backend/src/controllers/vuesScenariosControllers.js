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

const addUserReadScenario = (req, res) => {
  const userID = req.body.userID
  const scenarioID = req.body.scenarioID

  // TODO validations (length, format...)

  models.vuesScenarios
    .addUserReadScenario(userID, scenarioID)
    .then(([result]) => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const browseUserReadScenarios = (req, res) => {
  models.vuesScenarios
    .browseUserReadScenarios()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  add,
  edit,
  addUserReadScenario,
  browseUserReadScenarios,
}
