const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    games: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game"}],
    googleId: String
  }, {
    timestamps: true
  });

UserSchema.pre("findOne", function(next) {
  this.populate("games");
  next();
})

UserSchema.pre("find", function(next) {
  this.populate("games");
  next();
})

const User = mongoose.model('User', UserSchema)

module.exports = User