// import some node modules for later

const fs = require("node:fs")
const path = require("node:path")

// create express app

const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

// use some application-level middlewares

app.use(express.json())
app.use(cookieParser())

const cors = require("cors")

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true, // permet d'accepter l'envoie de credentials comme le token d'autorisation stocké dans un cookie
  })
)

// import and mount the API routes

const router = require("./router")

app.use(router)

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")))

// route pour récupérer mes images sur mon serveur
// app.use("/src/images", express.static(path.join(__dirname, "./images")))
app.use(
  "/public/assets/images",
  express.static(path.join(__dirname, "../public/assets/images"))
)

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
)

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")))

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    if (req.path.includes("images")) {
      res.sendFile(path.join(__dirname, "..", "..", req.path))
    } else {
      res.sendFile(reactIndexFile)
    }
  })
}

// ready to export

module.exports = app
