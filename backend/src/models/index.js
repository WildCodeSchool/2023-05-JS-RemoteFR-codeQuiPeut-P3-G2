require("dotenv").config()

const mysql = require("mysql2/promise")

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  )
})

// declare and fill models: that's where you should register your own managers

const models = {}

const ScenariosManager = require("./ScenariosManager")
const UtilisateursManager = require("./UtilisateursManager")
const ForumCommManager = require("./ForumCommManager")
const SujetForumManager = require("./SujetForumManager")
const SavedStyleTextManager = require("./SavedStyleTextManager")
const SavedStyleImageManager = require("./SavedStyleImageManager")
const SavedStylePageManager = require("./SavedStylePageManager")
const AuteursManager = require("./AuteursManager")
const CampagnesManager = require("./CampagnesManager")
const PagesManager = require("./PagesManager")
const StyleTextManager = require("./StyleTextManager")
const StyleImageManager = require("./StyleImageManager")
const TextesManager = require("./TextesManager")
const ImagesManager = require("./ImagesManager")
const StylePageManager = require("./StylePageManager")
const RoleGamesManager = require("./RoleGamesManager")
const ThemesManager = require("./ThemesManager")
const ThemesScenarioManager = require("./ThemesScenarioManager")
const ThemesCampagnesManager = require("./ThemesCampagnesManager")
const FavoriteManager = require("./FavoriteManager")
const AuteursFavorisManager = require("./AuteursFavorisManager")

models.scenarios = new ScenariosManager()
models.scenarios.setDatabase(pool)

models.utilisateurs = new UtilisateursManager()
models.utilisateurs.setDatabase(pool)

models.forumCom = new ForumCommManager()
models.forumCom.setDatabase(pool)

models.sujetForum = new SujetForumManager()
models.sujetForum.setDatabase(pool)

models.savStylTxt = new SavedStyleTextManager()
models.savStylTxt.setDatabase(pool)

models.savStylImg = new SavedStyleImageManager()
models.savStylImg.setDatabase(pool)

models.savStylPag = new SavedStylePageManager()
models.savStylPag.setDatabase(pool)

models.auteurs = new AuteursManager()
models.auteurs.setDatabase(pool)

models.campagnes = new CampagnesManager()
models.campagnes.setDatabase(pool)

models.pages = new PagesManager()
models.pages.setDatabase(pool)

models.styleText = new StyleTextManager()
models.styleText.setDatabase(pool)

models.styleImage = new StyleImageManager()
models.styleImage.setDatabase(pool)

models.textes = new TextesManager()
models.textes.setDatabase(pool)

models.stylePage = new StylePageManager()
models.stylePage.setDatabase(pool)

models.roleGames = new RoleGamesManager()
models.roleGames.setDatabase(pool)

models.themes = new ThemesManager()
models.themes.setDatabase(pool)

models.themesScenario = new ThemesScenarioManager()
models.themesScenario.setDatabase(pool)

models.themesCampagnes = new ThemesCampagnesManager()
models.themesCampagnes.setDatabase(pool)

models.images = new ImagesManager()
models.images.setDatabase(pool)

models.favorites = new FavoriteManager()
models.favorites.setDatabase(pool)

models.auteursFavoris = new AuteursFavorisManager()
models.auteursFavoris.setDatabase(pool)

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop]
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1)

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    )
  },
}

module.exports = new Proxy(models, handler)
