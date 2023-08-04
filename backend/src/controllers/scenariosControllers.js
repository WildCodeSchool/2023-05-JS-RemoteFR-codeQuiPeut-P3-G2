const models = require("../models")

const browse = (req, res) => {
  models.scenarios
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.scenarios
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
  const scenarios = req.body

  // TODO validations (length, format...)

  scenarios.id = parseInt(req.params.id, 10)

  models.scenarios
    .update(scenarios)
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

const add = (req, res) => {
  const scenarios = req.body

  // TODO validations (length, format...)

  models.scenarios
    .insert(scenarios)
    .then(([result]) => {
      res.location(`/items/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  models.scenarios
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

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
}
