const express = require('express')
const router = express.Router()
const Game = require('../models/gameModel')
const { IMGBB_API_KEY } = require('../config')
const imgbbUploader = require('imgbb-uploader')










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

module.exports = router