const express = require("express")
const logger = require("morgan")
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require("path")
const methodOverride = require("method-override")
const mongoose = require("./db/connection")
const gamesRouter = require("./controllers/gameController")
const usersRouter = require("./controllers/userController")
const indexRouter = require("./controllers/indexController")
const Game = require("./models/gameModel")
const bodyParser = require("body-parser")
const cors = require("cors")
const { SESSION_SECRET, PORT } = require("./config")
const app = express()
require('./db/passport')



//Middleware
app.use(logger('dev')) // Logging middleware before other middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.use(bodyParser.json({ limit: "200mb" }))
app.use(express.urlencoded({ extended: true, limit: "200mb" }))
app.use(cors())




//Routes
app.use("/games", gamesRouter)
app.use('/users', usersRouter)
app.use('/', indexRouter)



// Start the server
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})

