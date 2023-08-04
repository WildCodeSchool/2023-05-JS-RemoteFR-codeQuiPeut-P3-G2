const express = require("express")

const router = express.Router()

const scenariosControllers = require("./controllers/scenariosControllers")
const utilisateursControllers = require("./controllers/utilisateursControllers")
const forumCommControllers = require("./controllers/forumCommControllers")
const sujetForumControllers = require("./controllers/sujetForumControllers")
const savedStyleTextControllers = require("./controllers/savedStyleTextControllers")
const savedStyleImageControllers = require("./controllers/savedStyleImageControllers")
const savedStylePageControllers = require("./controllers/savedStylePageControllers")

router.get("/scenarios", scenariosControllers.browse)
router.get("/scenarios/:id", scenariosControllers.read)
router.put("/scenarios/:id", scenariosControllers.edit)
router.post("/scenarios", scenariosControllers.add)
router.delete("/scenarios/:id", scenariosControllers.destroy)

router.get("/utilisateurs", utilisateursControllers.browse)
router.get("/utilisateurs/:id", utilisateursControllers.read)
router.post("/utilisateurs", utilisateursControllers.add)
router.put("/utilisateurs/:id", utilisateursControllers.edit)
router.delete("/utilisateurs/:id", utilisateursControllers.destroy)

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
router.post("/saved_style_text", savedStyleTextControllers.add)
router.put("/saved_style_text/:id", savedStyleTextControllers.edit)
router.delete("/saved_style_text/:id", savedStyleTextControllers.destroy)

router.get("/saved_style_image", savedStyleImageControllers.browse)
router.get("/saved_style_image/:id", savedStyleImageControllers.read)
router.put("/saved_style_image/:id", savedStyleImageControllers.edit)
router.post("/saved_style_image", savedStyleImageControllers.add)
router.delete("/saved_style_image/:id", savedStyleImageControllers.destroy)

router.get("/saved_style_page", savedStylePageControllers.browse)
router.get("/saved_style_page/:id", savedStylePageControllers.read)
router.put("/saved_style_page/:id", savedStylePageControllers.edit)
router.post("/saved_style_page", savedStylePageControllers.add)
router.delete("/saved_style_page/:id", savedStylePageControllers.destroy)

module.exports = router
