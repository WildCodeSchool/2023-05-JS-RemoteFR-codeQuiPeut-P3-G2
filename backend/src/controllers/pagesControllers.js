const models = require("../models")

const browse = (req, res) => {
  models.pages
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
  const pages = req.body

  // TODO validations (length, format...)

  models.pages
    .insert(pages)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.pages
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
  const pages = req.body

  const id = req.params.id

  models.pages
    .update(pages, id)
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
  models.pages
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

// const readpagescenarios = (req, res) => {
//     models.pages
//     .findScenarios(req.params.id)
//     .then(([rows]) => {
//         if (rows[0] == null) {
//           res.sendStatus(404)
//         } else {
//           res.send(rows)
//         }
//       })
//       .catch((err) => {
//         console.error(err)
//         res.sendStatus(500)
//       })
// }

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
}
