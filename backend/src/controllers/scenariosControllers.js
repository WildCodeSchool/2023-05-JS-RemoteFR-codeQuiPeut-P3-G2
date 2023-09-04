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

const readWithTheme = (req, res) => {
  models.scenarios
    .readWithTheme(req.params.id)
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
      // res.location(`/items/${result.insertId}`).status(201).send(result.insertId)
      res.status(200).send(result.insertId.toString())
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

const readPages = (req, res) => {
  models.scenarios
    .findPages(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        const data = rows.map((item) => ({
          id: item.id,
          scenarios_id: item.scenarios_id,
          page_types_id: item.page_types_id,
          img: item.img,
          titre: item.titre,
          number: item.number,
          style: {
            padding: item.padding,
            backgroundColor: item.background_color,
          },
        }))
        res.send(data)
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
  readPages,
  readWithTheme,
}
