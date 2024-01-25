const express = require("express")
const {
    getUserById,
    getAllUsers,
    createUser,
    logIn,
    removeGame,
    addGame,
    deleteUser,
    getRandomUserGame
} = require("../controllers/userController")
const { checkAuth } = require("../middleware/checkAuth")
const router = express.Router()



router.get('/:id', getUserById)


router.get('/:id/randomGame', getRandomUserGame)


router.get('/', getAllUsers)


router.post('/signup', createUser)


router.post('/login', logIn)


router.use(checkAuth)


router.put('/games', addGame)


router.put('/profile', removeGame)


router.delete("/:id", deleteUser)

module.exports = router