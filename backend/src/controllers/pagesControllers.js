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
    .then((result) => {
      res.json(result)
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

const readPageTexts = (req, res) => {
  models.pages
    .findPageTexts(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        const data = rows.map((item) => ({
          id: item.id,
          pages_id: item.pages_id,
          text: item.text,
          placeHolder: "Tapez votre texte",
          selected: false,
          style: {
            backgroundColor: item.backgroundColor,
            position: "absolute",
            width: item.width,
            height: item.height,
            boxSizing: "border-box",
            top: item.top,
            left: item.left,
            zIndex: item.zIndex,
            borderStyle: item.borderStyle,
            borderColor: item.borderColor,
            borderWidth: item.borderWidth,
            borderRadius: item.borderRadius,
            boxShadow: item.boxShadow,
            fontSize: item.fontSize,
            fontStyle: item.fontStyle,
            textDecoration: item.textDecoration,
            fontWeight: item.fontWeight,
            fontFamily: item.fontFamily,
            color: item.color,
            padding: item.padding,
            textAlign: item.textAlign,
            backdropFilter: item.backdropFilter,
            WebkitBackdropFilter: item.backdropFilter,
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
  add,
  read,
  edit,
  destroy,
  readPageTexts,
}
