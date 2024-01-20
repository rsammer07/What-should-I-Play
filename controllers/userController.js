const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const Game = require("../models/gameModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SESSION_SECRET } = require("../config")


//GET USER BY ID



//GET ALL USERS



// CREATE USER

const createUser = async (req, res) => {
    console.log('Creating new user')
    console.log(req.body)
    req.body.email=req.body.email.toLowerCase()


    //encrypt password
    const encryptedPW = await bcrypt.hash(req.body.password, 12)
    req.body.password = encryptedPW

    //create user & token and pass both back
        const user = await User.create(req.body)
        const token = await jwt.sign({ userId: user._id, email: user.email }, SESSION_SECRET, {expiresIn: '2h'})
        return res.json({user, token})
}


// LOGIN
const logIn = async (req, res) => {
    console.log('Logging in existing user')
    req.body.email(req.body.email.toLowerCase())

    //check if user exists by querying for email
    const existingUser = await User.findOne({email: req.body.email})
    if(!existingUser) {
        return res.status(401).json({message: 'No user with that email'})
    } 

    //user exists now decrypt password
    console.log('comparing provided password with existing user.password')
    const correctPW = await bcrypt.compare(req.body.password, existingUser.password)
    if(!correctPW) {
        return res.status(401).json({message: 'Incorrect password'})
    }

    //since correctPW is true now we generate a login token
    const token = jwt.sign({userId: existingUser._id, email: existingUser.email}, SESSION_SECRET, {expiresIn: '2h'})

    return res.status(201).json({user: existingUser, token})

}


// UPDATE USER



// DELETE USER



module.exports = { createUser, logIn, }