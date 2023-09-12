const models = require("../models")

const findTheme = (req, res) => {
  models.filter
    .findTheme()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
module.exports = {
  findTheme,
}
