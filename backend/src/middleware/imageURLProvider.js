const fs = require("fs")
const path = require("path")

const imageURLProvider = (req, res) => {
  //   const imageUrl = `${req.protocol}://${req.get("host")}/src/images/${
  //     req.file.filename
  //   }`
  const imageUrl = `${req.protocol}://${req.get("host")}/public/assets/images/${
    req.file.filename
  }`

  res.send(imageUrl)
}

const deleteImageForm = (req, res) => {
  const url = req.body.img_src

  // Extraire le chemin d'accès relatif au fichier à partir de l'URL
  const relativePath = url.replace("http://localhost:4242", "")

  // Construire le chemin d'accès absolu au fichier
  const absolutePath = path.join(__dirname, "..", "..", relativePath)

  // Supprimer le fichier
  fs.unlink(absolutePath, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.info("Image supprimée avec succès")
    }
  })
}

module.exports = {
  imageURLProvider,
  deleteImageForm,
}
