const express = require('express')
const Game = require('../models/gameModel')
const User = require('../models/userModel')
const { IMGBB_API_KEY } = require('../config')
const imgbbUploader = require('imgbb-uploader')


const getGameById = async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id)
        res.json(game)
    } catch (error) {
        next(error)
    }
}

const getAllGames = async (req, res, next) => {
    try {
        const games = await Game.find({})
        res.json(games)
    } catch (error) {
        next(error)
    }
}




const createGame = async (req, res, next) => {
    console.log('Creating new game')
    // console.log(req.body)
    const bbOptions = {
        apiKey: IMGBB_API_KEY,
        base64string: req.body.image,
    }
    console.log(req.body)

    //Post Image data only to ImgBBAPI & get back URL of image from response
    const imageResponse = await imgbbUploader(bbOptions)
    console.log(imageResponse)
    //now create the new game
    const newGame = await Game.create({
        title: req.body.title,
        platform: req.body.platform,
        image: imageResponse.url
    })

    const user = await User.findById(req.userId)
    user.games.push(newGame.id)
    await user.save()
    
}


const editGame = async(req, res, next) => {
    try {
        const filter = {
            'id': req.params.id
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
}


const deleteGame = async(req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const id = req.params.id
        console.log(id)
        user.games.pull(id)
        await Game.findOneAndDelete({ _id: id })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getGameById,
    getAllGames,
    createGame,
    editGame,
    deleteGame,
}