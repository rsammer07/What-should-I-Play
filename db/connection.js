const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');
require('dotenv').config();

const db = mongoose.connection;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
                  
     
mongoose.connection.on('connected', () => {
console.log(`Connected to database`);
})
                  
                  
mongoose.connection.on('disconnected', () => {
console.log(`Disconnected from database`);
})
                  
                  
mongoose.connection.on('error', (error) => {
console.log(`Error connecting to`);
console.error(error);
})
                  
module.exports = mongoose