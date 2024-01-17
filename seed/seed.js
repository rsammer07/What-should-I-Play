const Games = require('../models/gameModel')

const seedData = require('./games.json')


Games.deleteMany({})
    .then(() => {
        return Games.insertMany(seedData)
    })

    .then(console.log('Success'))

    .catch(console.error)

    .finally(() => {
        process.exit()
    })

