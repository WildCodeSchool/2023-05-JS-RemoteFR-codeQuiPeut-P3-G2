const express = require("express")

const router = express.Router()

const scenariosControllers = require("./controllers/scenariosControllers")
const utilisateursControllers = require("./controllers/UtilisateursControllers")
const forumCommControllers = require("./controllers/forumCommControllers")
const sujetForumControllers = require("./controllers/sujetForumControllers")
const savedStyleTextControllers = require("./controllers/savedStyleTextControllers")
const styleTextControllers = require("./controllers/styleTextControllers")
const styleImageControllers = require("./controllers/styleImageControllers")
const stylePageControllers = require("./controllers/stylePageControllers")
const savedStyleImageControllers = require("./controllers/savedStyleImageControllers")
const savedStylePageControllers = require("./controllers/savedStylePageControllers")
const auteursControllers = require("./controllers/auteursControllers")
const campagnesControllers = require("./controllers/campagnesControllers")
const pagesControllers = require("./controllers/pagesControllers")
const textesControllers = require("./controllers/textesControllers")
const rolegamesControllers = require("./controllers/rolegamesControllers")
const themesControllers = require("./controllers/themesControllers")
const scenarioThemesControllers = require("./controllers/scenarioThemesControllers")
const campagnesThemesControllers = require("./controllers/campagnesThemesControllers")
const imagesControllers = require("./controllers/imagesControllers")
const favoriteControllers = require("./controllers/favoriteControllers.js")
const scenarioCommentControllers = require("./controllers/scenarioCommentControllers")
const multer = require("./middleware/multer-config")
const {
  deleteImage,
  destroyStyleFromImageID,
} = require("./middleware/deleteImage")
const {
  imageURLProvider,
  deleteImageForm,
} = require("./middleware/imageURLProvider")

// router.get("/scenarios", scenariosControllers.browse)
router.get("/scenarios", scenariosControllers.browseScenarios)
// router.get("/scenarios/:id", scenariosControllers.read)
// router.get("/scenarios", scenariosControllers.browse)
// router.get("/scenarios/:id", scenariosControllers.read)
router.get("/scenarios/:id", scenariosControllers.readWithTheme)
router.put("/scenarios/:id", scenariosControllers.edit)
router.post("/scenarios", scenariosControllers.add)
router.delete("/scenarios/:id", scenariosControllers.destroy)
router.get("/scenarios/:id/pages", scenariosControllers.readPages)

router.get("/themesScenarios", scenarioThemesControllers.browse)
router.put("/themesScenarios/:id", scenarioThemesControllers.edit)
router.post("/themesScenarios", scenarioThemesControllers.add)
router.delete("/themesScenarios/:id", scenarioThemesControllers.destroy)

router.get("/themesCampagnes", campagnesThemesControllers.browse)
router.put("/themesCampagnes/:id", campagnesThemesControllers.edit)
router.post("/themesCampagnes", campagnesThemesControllers.add)
router.delete("/themesCampagnes/:id", campagnesThemesControllers.destroy)

router.get("/utilisateurs", utilisateursControllers.browse)
router.get("/utilisateurs/:id", utilisateursControllers.read)
router.post("/utilisateurs", utilisateursControllers.add)
router.put("/utilisateurs/:id", utilisateursControllers.edit)
router.put("/password/:id", utilisateursControllers.changePassword)
router.delete("/utilisateurs/:id", utilisateursControllers.destroy)
router.post(
  "/login",
  utilisateursControllers.readUserByEmail,
  utilisateursControllers.verifyPassword,
  utilisateursControllers.sendUserWhoHasGoodEmailAndPassword
)
router.post(
  "/signup",
  utilisateursControllers.verifyEmail,
  utilisateursControllers.verifyLogin,
  utilisateursControllers.add
)

router.get("/commentaires_forum", forumCommControllers.browse)
router.get("/commentaires_forum/:id", forumCommControllers.read)
router.post("/commentaires_forum", forumCommControllers.add)
router.put("/commentaires_forum/:id", forumCommControllers.edit)
router.delete("/commentaires_forum/:id", forumCommControllers.destroy)

router.get("/sujet_forum", sujetForumControllers.browse)
router.get("/sujet_forum/:id", sujetForumControllers.read)
router.post("/sujet_forum", sujetForumControllers.add)
router.put("/sujet_forum/:id", sujetForumControllers.edit)
router.delete("/sujet_forum/:id", sujetForumControllers.destroy)

router.get("/saved_style_text", savedStyleTextControllers.browse)
router.get("/saved_style_text/:id", savedStyleTextControllers.read)
router.get(
  "/saved_style_text/utilisateur/:id",
  savedStyleTextControllers.readFromUtilisateurID
)
router.post("/saved_style_text", savedStyleTextControllers.add)
router.put("/saved_style_text/:id", savedStyleTextControllers.edit)
router.delete("/saved_style_text/:id", savedStyleTextControllers.destroy)

router.get("/styleText", styleTextControllers.browse)
router.get("/styleText/:id", styleTextControllers.read)
router.post("/styleText", styleTextControllers.add)
router.put("/styleText/:id", styleTextControllers.edit)
router.put("/styleText/texte/:id", styleTextControllers.editStyleFromTexteID)
router.delete("/styleText/:id", styleTextControllers.destroy)
router.delete("/styleText/texte/:id", styleTextControllers.destroyFromTextID)

router.get("/styleImage", styleImageControllers.browse)
router.get("/styleImage/:id", styleImageControllers.read)
router.put("/styleImage/image/:id", styleImageControllers.editStyleFromImageID)
router.delete("/styleImage/image/:id", styleImageControllers.destroyFromImageID)

router.get("/stylePage", stylePageControllers.browse)
router.get("/stylePage/:id", stylePageControllers.read)
router.post("/stylePage", stylePageControllers.add)
router.put("/stylePage/:id", stylePageControllers.edit)
router.put("/stylePage/page/:id", stylePageControllers.editStyleFromPageID)
router.delete("/stylePage/:id", stylePageControllers.destroy)
router.delete("/stylePage/page/:id", stylePageControllers.destroyFromPageID)

router.get("/saved_style_image", savedStyleImageControllers.browse)
router.get("/saved_style_image/:id", savedStyleImageControllers.read)
router.put("/saved_style_image/:id", savedStyleImageControllers.edit)
router.post("/saved_style_image", savedStyleImageControllers.add)
router.delete("/saved_style_image/:id", savedStyleImageControllers.destroy)
router.get(
  "/saved_style_image/utilisateur/:id",
  savedStyleImageControllers.readFromUtilisateurID
)

router.get("/saved_style_page", savedStylePageControllers.browse)
router.get("/saved_style_page/:id", savedStylePageControllers.read)
router.get(
  "/saved_style_page/utilisateur/:id",
  savedStylePageControllers.readFromUtilisateurID
)
router.put("/saved_style_page/:id", savedStylePageControllers.edit)
router.post("/saved_style_page", savedStylePageControllers.add)
router.delete("/saved_style_page/:id", savedStylePageControllers.destroy)

router.get("/auteurs", auteursControllers.browse)
router.get("/auteurs/:id", auteursControllers.read)
router.get("/auteurs/user/:userID", auteursControllers.readFromUserID) // retourne l'id et le name de l'auteur en fonction de l'ID de l'utilisateur
router.post("/auteurs", auteursControllers.add)
router.put("/auteurs/:id", auteursControllers.edit)
router.delete("/auteurs/:id", auteursControllers.destroy)
router.get("/auteurs/:id/campagnes", auteursControllers.readAuthorsCampagnes) // recherche les campagnes d'un auteur (retourne : id, campagneName)

router.get("/campagnes", campagnesControllers.browse)
router.get("/campagnes/:id", campagnesControllers.readWithTheme)
router.post("/campagnes", campagnesControllers.add)
router.put("/campagnes/:id", campagnesControllers.edit)
router.delete("/campagnes/:id", campagnesControllers.destroy)
router.get(
  "/campagnes/:id/scenarios",
  campagnesControllers.readCampagneScenarios
) // recherche les scenarios associés à une campagne (retourne : id, scenarioName)

router.get("/pages", pagesControllers.browse)
router.get("/pages/:id", pagesControllers.read)
router.post("/pages", pagesControllers.add)
router.put("/pages/:id", pagesControllers.edit)
router.delete("/pages/:id", pagesControllers.destroy)
router.get("/pages/:id/textes", pagesControllers.readPageTexts)
router.get("/pages/:id/images", pagesControllers.readPageImages)

router.get("/images", imagesControllers.browse)
router.get("/images/:id", imagesControllers.read)
router.post("/images", imagesControllers.add)
router.delete(
  "/images/:id",
  deleteImage,
  destroyStyleFromImageID,
  imagesControllers.destroy
)

router.get("/textes", textesControllers.browse)
router.get("/textes/:id", textesControllers.read)
router.post("/textes", textesControllers.add)
router.put("/textes/:id", textesControllers.edit)
router.delete("/textes/:id", textesControllers.destroy)
router.post("/pages/:id/newtexte", textesControllers.createNew)
router.post(
  "/pages/:id/newtexteAtPageCreation",
  textesControllers.createNewSpecific
)
router.post("/pages/:id/ancientexte", textesControllers.recreatePrevious)
router.get("/lasttexte/", textesControllers.getLast) // renvoie le dernier texte de la table avec son style

router.get("/rolegames", rolegamesControllers.browse)
router.get("/rolegames/:id", rolegamesControllers.read)
router.post("/rolegames", rolegamesControllers.add)
router.put("/rolegames/:id", rolegamesControllers.edit)
router.delete("/rolegames/:id", rolegamesControllers.destroy)

router.get("/themes", themesControllers.browse)
router.get("/themes/:id", themesControllers.read)
router.post("/themes", themesControllers.add)
router.put("/themes/:id", themesControllers.edit)
router.delete("/themes/:id", themesControllers.destroy)

router.post(
  "/pages/:id/newImage",
  multer,
  imagesControllers.createNew,
  imagesControllers.getLast
)

router.post("/tmpImage", multer, imageURLProvider)
router.delete("/deleteTmpImage", deleteImageForm)

router.post("/favorite", favoriteControllers.add)
router.delete("/favorite", favoriteControllers.destroy)
router.get("/favorite/:id", favoriteControllers.read)

router.get("/scenarcomm", scenarioCommentControllers.browse)
router.post("/scenarcomm", scenarioCommentControllers.add)

module.exports = router
