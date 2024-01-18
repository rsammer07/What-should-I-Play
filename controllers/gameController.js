const express = require('express')
const router = express.Router()
const Game = require('../models/gameModel')
const { IMGBB_API_KEY } = require('../config')
const imgbbUploader = require('imgbb-uploader')

router.get('/', async (req, res, next) => {
    try {
        const games = await Game.find({})
        res.json(games)
    } catch (error) {
        next(error)
    }
})


router.get("/:id", async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id)
        res.json(game)
    } catch (error) {
        next(error)
    }
})


router.get('/newGame', async (req, res, next) => {
    try {
        res.render('games/newGame')
    } catch (error) {
        next(error)
    }
})

router.get('/edit/:id', async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id)
        res.render('games/editGame', { game })
    } catch (error) {
        next(error)
    }
})


router.post('/', async (req, res, next) => {
    console.log('Creating new game')
    // console.log(req.body)
    const bbOptions = {
        apiKey: IMGBB_API_KEY,
        base64string: req.body.image,
    }


    //Post Image data only to ImgBBAPI & get back URL of image from response
    const imageResponse = await imgbbUploader(bbOptions)
    console.log(imageResponse)
    //now create the new game
    const newGame = await Game.create({
        title: req.body.title,
        platform: req.body.platform,
        image: imageResponse.url
    })
})


router.put('/:title', async(req, res, next) => {
    try {
        const filter = {
            'title': req.params.title
        }
        const data = {
            title: req.body.title,
            platform: req.body.platform,
            image: req.body.image
        }
        const updatedGame = await Game.findOneAndUpdate(filter, data, { new: true })
        res.json(updatedGame)
    } catch (error) {
        next(error)
    }
})


router.delete('/:title', async(req, res, next) => {
    try {
        const title = req.params.title
        await Game.findOneAndDelete({ title: title })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/google')
}

module.exports = router