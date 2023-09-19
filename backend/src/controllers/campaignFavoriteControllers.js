const models = require("../models")

const verifyCampaignIsFavoriteForUser = (req, res) => {
  const userId = parseInt(req.params.userId, 10)
  const campaignId = parseInt(req.params.campaignId, 10)

  models.campaignFavorite
    .verifyCampaignIsFavoriteForUser(userId, campaignId)
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

const add = (req, res) => {
  const { utilisateurID, campaignID } = req.body

  models.campaignFavorite
    .add(utilisateurID, campaignID)
    .then(([result]) => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  const { utilisateurID, campaignID } = req.body

  models.campaignFavorite
    .deleteFavorite(utilisateurID, campaignID)
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
  verifyCampaignIsFavoriteForUser,
  add,
  destroy,
}
