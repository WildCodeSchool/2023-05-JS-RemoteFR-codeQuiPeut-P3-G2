const models = require("../models")

const browse = (req, res) => {
  models.invitations
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
  const invitation = req.body

  // TODO validations (length, format...)

  models.invitations
    .insert(invitation)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const update = (req, res) => {
  const invitationId = req.params.id
  const invitation = req.body

  models.invitations
    .update(invitation, invitationId)
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
  models.invitations
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

const readMyPropositions = (req, res) => {
  const auteurID = req.params.id

  models.invitations
    .readMyPropositions(auteurID)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const readMyInvitations = (req, res) => {
  const utilisateurID = req.params.id

  models.invitations
    .readMyInvitations(utilisateurID)
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
  destroy,
  readMyPropositions,
  readMyInvitations,
  update,
}
