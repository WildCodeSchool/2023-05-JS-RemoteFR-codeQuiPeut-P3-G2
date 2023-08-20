const models = require("../models")

const browse = (req, res) => {
  models.savStylTxt
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
  const saveStTx = req.body
  // TODO validations (length, format...)

  models.savStylTxt
    .insert(saveStTx)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.savStylTxt
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
  const saveStTx = req.body

  // TODO validations (length, format...)

  saveStTx.id = parseInt(req.params.id, 10)

  models.savStylTxt
    .update(saveStTx)
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
  models.savStylTxt
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
            backgroundColor: style.background_color,
            position: "absolute",
            boxSizing: "border-box",
            zIndex: style.z_index,
            borderStyle: style.border_style,
            borderColor: style.border_color,
            borderWidth: style.border_width,
            borderRadius: style.border_radius,
            boxShadow: style.box_shadow,
            fontSize: style.font_size,
            fontStyle: style.font_style,
            textDecoration: style.text_decoration,
            fontWeight: style.font_weight,
            fontFamily: style.font_family,
            color: style.color,
            padding: style.padding,
            textAlign: style.text_align,
            backdropFilter: style.backdrop_filter,
            WebkitBackdropFilter: style.backdrop_filter,
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
