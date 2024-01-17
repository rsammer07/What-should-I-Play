const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const passport = require('../db/passport')
const Game = require("../models/gameModel")


function index(req, res, next) {
    let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {}
    let sortKey = req.query.sort || 'name'
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
        if (err) return next(err)
        res.render('users/index', {
            users,
            user: req.user,
            name: req.query.name,
            sortKey 
        })
    })
}

router.get('/users', index)

// Google Oauth login route
router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/profile',
        failureRedirect: '/'
    }
))

// OAuth logoute route
router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})


//add game into users game database

router.put('/', async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        const user = await User.findById(req.user._id)
        const gameId = req.body.gameId
        const game = await Game.findOne({ _id: gameId })

        if (!game) {
            return res.status(404).json({ error: 'Game not found' })
        }
        user.games.push(game.id)
    } catch (error) {
        next(error)
    }
})

router.put('/remove-game', async (req, res, next) => {
    try {
        if(!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        const userId = req.user._id
        const movieId = req.body.movieId

        const user = await User.findById({ _id: userId })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        user.games.pull(gameId)
        await user.save()
    } catch (error) {
        next(error)
    }
})

