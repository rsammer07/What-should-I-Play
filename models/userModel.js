const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    games: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game"}],

  });

UserSchema.pre("findOne", function(next) {
  this.populate("games");
  next();
})

UserSchema.pre("find", function(next) {
  this.populate("games");
  next();
})

const User = mongoose.model('User', UserSchema, 'users')

module.exports = User