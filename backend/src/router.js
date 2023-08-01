const express = require("express")

const router = express.Router()

const scenariosControllers = require("./controllers/scenariosControllers")
const utilisateursControllers = require("./controllers/UtilisateursControllers")

router.get("/utilisateurs", utilisateursControllers.browse)
router.get("/utilisateurs/:id", utilisateursControllers.read)
router.post("/utilisateurs", utilisateursControllers.add)
router.put("/utilisateurs/:id", utilisateursControllers.edit)
router.delete("/utilisateurs/:id", utilisateursControllers.destroy)

router.get("/scenarios", scenariosControllers.browse)
router.get("/scenarios/:id", scenariosControllers.read)
router.put("/scenarios/:id", scenariosControllers.edit)
router.post("/scenarios", scenariosControllers.add)
router.delete("/scenarios/:id", scenariosControllers.destroy)

module.exports = router
