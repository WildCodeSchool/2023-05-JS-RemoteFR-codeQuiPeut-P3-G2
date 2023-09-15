const models = require("../models")

const findCampagnes = (req, res) => {
  models.campagnesMulti
    .findCampagne()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  findCampagnes,
}
