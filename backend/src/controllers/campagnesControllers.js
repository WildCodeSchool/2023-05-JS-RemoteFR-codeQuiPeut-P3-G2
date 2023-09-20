const models = require("../models")

const browse = (req, res) => {
  models.campagnes
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const readWithTheme = (req, res) => {
  models.campagnes
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

const add = (req, res) => {
  const campagnes = req.body

  // TODO validations (length, format...)

  models.campagnes
    .insert(campagnes)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.campagnes
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
  const campagnes = req.body

  const id = req.params.id

  models.campagnes
    .update(campagnes, id)
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
  models.campagnes
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

const readCampagneScenarios = (req, res) => {
  models.campagnes
    .findScenarios(req.params.id)
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

const readCampagneDetailedScenarios = (req, res) => {
  models.campagnes
    .readCampagneDetailedScenarios(req.params.id)
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

// const findCampagne = (req, res) => {
//   models.campagnes
//     .findCampagne()
//     .then(([rows]) => {
//       res.send(rows)
//     })
//     .catch((err) => {
//       console.error(err)
//       res.sendStatus(500)
//     })
// }

const findCampagnesWithDetails = (req, res) => {
  models.campagnes
    .findCampagnesWithDetails()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const findUserFavoriteCampagnesWithDetails = (req, res) => {
  const utilisateurID = req.params.id

  models.campagnes
    .findUserFavoriteCampagnesWithDetails(utilisateurID)
    .then(([rows]) => {
      res.send(rows)
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
  readCampagneScenarios,
  readWithTheme,
  readCampagneDetailedScenarios,
  findCampagnesWithDetails,
  findUserFavoriteCampagnesWithDetails,
}
