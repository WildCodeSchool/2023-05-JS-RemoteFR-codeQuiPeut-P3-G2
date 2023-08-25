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
  // const imageUrl = `${req.protocol}://${req.get("host")}/src/images/${
  //   req.file.filename
  // }`
  // console.log("imageUrl", imageUrl)
  //   models.images
  //     .insert(textes)
  //     .then(([result]) => {
  //       res.json(result.insertId)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //       res.sendStatus(500)
  //     })
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

// const createNew = (req, res) => {
//   const position = req.body // doit contenir sst_left et top

//   models.images
//     .createNew(position, req.params.id)
//     .then((result) => {
//       res.json(result)
//     })
//     .catch((err) => {
//       console.error(err)
//       res.sendStatus(500)
//     })
// }

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

// const getLast = (req, res) => {
//   models.images
//     .getLast()
//     .then(([rows]) => {
//       if (rows[0] == null) {
//         res.sendStatus(404)
//       } else {
//         const data = rows.map((item) => ({
//           id: item.id,
//           pages_id: item.pages_id,
//           text: item.text,
//           placeHolder: "Tapez votre texte",
//           selected: false,
//           style: {
//             backgroundColor: item.backgroundColor,
//             position: "absolute",
//             width: item.width,
//             height: item.height,
//             boxSizing: "border-box",
//             top: item.top,
//             left: item.left,
//             zIndex: item.zIndex,
//             borderStyle: item.borderStyle,
//             borderColor: item.borderColor,
//             borderWidth: item.borderWidth,
//             borderRadius: item.borderRadius,
//             boxShadow: item.boxShadow,
//             fontSize: item.fontSize,
//             fontStyle: item.fontStyle,
//             textDecoration: item.textDecoration,
//             fontWeight: item.fontWeight,
//             fontFamily: item.fontFamily,
//             color: item.color,
//             padding: item.padding,
//             textAlign: item.textAlign,
//             backdropFilter: item.backdropFilter,
//             WebkitBackdropFilter: item.backdropFilter,
//           },
//         }))
//         res.send(data[0])
//       }
//     })
//     .catch((err) => {
//       console.error(err)
//       res.sendStatus(500)
//     })
// }

const readImageFromUrl = (req, res) => {}

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
  readImageFromUrl,
  //   createNew,
  //   createNewSpecific,
  //   recreatePrevious,
  //   getLast,
}
