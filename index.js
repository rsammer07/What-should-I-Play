const express = require("express")
const logger = require("morgan")
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const gamesRouter = require("./routers/gamesRouter")
const usersRouter = require("./routers/usersRouter")
const Game = require("./models/gameModel")
const bodyParser = require("body-parser")
const cors = require("cors")
const { PORT, DATABASE_URL } = require("./config")
const app = express()



//Middleware
// app.use(logger('dev')) // Logging middleware before other middlewares
app.use(bodyParser.json({ limit: "200mb" }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "200mb" }))
app.use(cors())





//Routes
app.use("/games", gamesRouter)
app.use('/users', usersRouter)


mongoose.connect(DATABASE_URL)
.then(() => {
  console.log("connected to mongoDB")
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
  })
})
