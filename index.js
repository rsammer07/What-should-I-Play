const express = require("express")
const app = express()
const mongoose = require("./db/connection")
const gamesRouter = require("./controllers/gameController")
const Game = require("./models/gameModel")
const bodyParser = require("body-parser")
const cors = require("cors")
const { IMGBB_API_KEY } = require("./config")
const imgbbUploader = require("imgbb-uploader/lib/cjs")



const PORT = process.env.PORT || 4000

app.use(bodyParser.json({ limit: "200mb" }))
app.use(express.urlencoded({ extended: true, limit: "200mb" }))
app.use(cors())

app.use("/games", gamesRouter)


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})

