const fs = require("fs")
const path = require("path")
const models = require("../models")

const deleteImage = (req, res, next) => {
  const url = req.body.img_src

  // Extraire le chemin d'accès relatif au fichier à partir de l'URL
  const relativePath = url.replace("http://localhost:4242", "")

  // Construire le chemin d'accès absolu au fichier
  const absolutePath = path.join(__dirname, "..", "..", relativePath)

  // Supprimer le fichier
  if (verifyNumberOfSameImageInTableImages(absolutePath) === true) {
    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error(err)
      } else {
        console.info("Image supprimée avec succès")
        next()
      }
    })
  } else {
    next()
  }
}

const verifyNumberOfSameImageInTableImages = (absolutePath) => {
  models.images
    .verifyNumberOfSameImageInTableImages(absolutePath)
    .then(([result]) => {
      const countImage = result[0].countImage
      if (countImage === 1) {
        return true
      } else {
        return false
      }
    })
}

const destroyStyleFromImageID = (req, res, next) => {
  models.styleImage
    .destroyFromImageID(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        next()
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  deleteImage,
  destroyStyleFromImageID,
}
