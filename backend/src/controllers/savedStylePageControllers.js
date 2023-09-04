const models = require("../models")

const browse = (req, res) => {
  models.savStylPag
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
  const saveStPg = req.body

  // TODO validations (length, format...)

  models.savStylPag
    .insert(saveStPg)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.savStylPag
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
  const saveStPg = req.body

  // TODO validations (length, format...)

  saveStPg.id = parseInt(req.params.id, 10)

  models.savStylPag
    .update(saveStPg)
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
  models.savStylPag
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

const readFromUtilisateurID = (req, res) => {
  models.savStylPag
    .readFromUtilisateurID(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        const userPageStyles = rows.map((style) => ({
          id: style.id,
          styleName: style.styleName,
          showDelete: false,
          styleCss: {
            backgroundColor: style.background_color,
            padding: style.padding,
          },
        }))
        res.send(userPageStyles)
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
  readFromUtilisateurID,
}
