const models = require("../models")

const browse = (req, res) => {
  models.images
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
  const imageUrl = `${req.protocol}://${req.get("host")}/src/images/${
    req.file.filename
  }`
  // console.log("imageUrl", imageUrl)
  models.images
    .insert(imageUrl)
    .then(([result]) => {
      res.json(result.insertId)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.images
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
  const textes = req.body

  // TODO validations (length, format...)

  const id = req.params.id

  models.images
    .update(textes, id)
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
  models.images
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

const createNew = (req, res, next) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/src/images/${
    req.file.filename
  }`

  models.images
    .createNew(imageUrl, req.params.id)
    .then(() => {
      //   res.json(result)
      next()
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

// const createNewSpecific = (req, res) => {
//   const properties = req.body // doit contenir pageID, width, height, left, top, placeholder

//   models.images
//     .createNewSpecific(properties, req.params.id)
//     .then((result) => {
//       res.json(result)
//     })
//     .catch((err) => {
//       console.error(err)
//       res.sendStatus(500)
//     })
// }

// const recreatePrevious = (req, res) => {
//   const proprietes = req.body // contient les propriétés du texte aisi que ses styles

//   models.images
//     .recreatePrevious(proprietes, req.params.id)
//     .then((result) => {
//       res.json(result)
//     })
//     .catch((err) => {
//       console.error(err)
//       res.sendStatus(500)
//     })
// }

const getLast = (req, res) => {
  models.images
    .getLast()
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        const data = rows.map((item) => ({
          id: item.id,
          pages_id: item.pages_id,
          style_id: item.style_id,
          img_src: item.img_src,
          selected: false,
          style: {
            position: "absolute",
            width: item.width,
            height: item.height,
            boxSizing: "border-box",
            top: item.top,
            left: item.ssi_left,
            zIndex: item.z_index,
            borderStyle: item.border_style,
            borderColor: item.border_color,
            borderWidth: item.border_width,
            borderRadius: item.border_radius,
            boxShadow: item.box_shadow,
            opacity: item.opacity,
            padding: item.padding,
          },
        }))
        res.send(data[0])
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const readImageFromUrl = (req, res) => {}

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
  readImageFromUrl,
  createNew,
  //   createNewSpecific,
  //   recreatePrevious,
  getLast,
}
