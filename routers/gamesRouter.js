const express = require("express")
const { getGameById, getAllGames, createGame, editGame, deleteGame } = require("../controllers/gameController")
const { checkAuth } = require("../middleware/checkAuth")
const router = express.Router()


router.get('/:id', getGameById)


router.get('/', getAllGames)


router.use(checkAuth)


router.post('/newGame', createGame)


router.put('/:id', editGame)


router.delete('/:id', deleteGame)



module.exports = router