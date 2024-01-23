const express = require("express")
const User = require("../models/userModel")
const Game = require("../models/gameModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SESSION_SECRET } = require("../config")


//GET USER BY ID
const getUserById = (req, res, next) =>{
    console.log("Getting user by id ${req.params.id}")

    User.findById(req.params.id)
    .then((usr) => {
        return res.status(200).json(usr)
    })
    .catch((err) => {
        return next(err)
    })
}



//GET ALL USERS
const getAllUsers = (req, res, next) =>{
    console.log("getting all users")
    User.find()
    .then((users) => {
        return res.status(200).json(users)
    })
    .catch((err) => {
        return next(err)
    })

}


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
    console.log(req.body)
    req.body.email = req.body.email.toLowerCase()

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
const addGame = async (req, res) => {
    try {
        if(!req.isAuthenticated()) {
            return res.status(401).json({message: 'Not authenticated'})
        }
        const user = await User.findById(req.user._id)
        const gameId = req.body._id
        const game = await Game.findOne({_id: gameId})
        user.games.push(game)
        await user.save()
        return res.json(user)
    } catch (error) {
        console.error(error)
    }
}

const removeGame = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Not authenticated' })
        }
        const userId = req.user._id
        const gameId = req.body._id
        console.log(gameId)

        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        user.games.pull(gameId)
        await user.save()
    } catch (error) {
        console.error(error)
    }
}

// DELETE USER
const deleteUser = async (req, res, next) => {
    console.log('Deleting user')
    if(req.userId !== req.params.id) {
        return res.send("Access Denied")
    }

    User.findById(req.params.id)
    .then ((usr) => {
        if(!usr) {
            return res.status(404).send("User not found")
        }

        User.findByIdAndDelete(req.params.id).then(() => {
            return res.status(200).send("User deleted")
        })
    })
    .catch((err) => {
        return next(err)
    })
}


module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    logIn,
    addGame,
    removeGame,
    deleteUser
}