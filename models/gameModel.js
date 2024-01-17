const mongoose = require(`../db/connection`)

const GameSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    platform: {type: String, required: true},
    image: {type: String},
})


const Game = mongoose.model("Game", GameSchema, "games")

module.exports = Game