const models = require("../models")

const browse = (req, res) => {
  models.savStylImg
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
  const saveStIm = req.body

  // TODO validations (length, format...)

  models.savStylImg
    .insert(saveStIm)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.savStylImg
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
  const saveStIm = req.body

  // TODO validations (length, format...)

  saveStIm.id = parseInt(req.params.id, 10)

  models.savStylImg
    .update(saveStIm)
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
  models.savStylImg
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
  models.savStylTxt
    .readFromUtilisateurID(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        const userTextStyles = rows.map((style) => ({
          id: style.id,
          styleName: style.styleName,
          showDelete: false,
          styleCss: {
            position: "absolute",
            boxSizing: "border-box",
            zIndex: style.z_index,
            borderStyle: style.border_style,
            borderColor: style.border_color,
            borderWidth: style.border_width,
            borderRadius: style.border_radius,
            boxShadow: style.box_shadow,
            padding: style.padding,
            opacity: style.opacity,
          },
        }))
        res.send(userTextStyles)
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
