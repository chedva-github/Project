const mongoose = require('mongoose')
const User = require('../models/user')

const createUser = async (req, res) => {
    console.log("create user")
    const user = new User(req.body)
    try {
        const newUser = await user.save()
        res.status(200).json({ message: "new user created succesfully", newUser: newUser })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
const getUserByNameAndPassword = async (req, res) => {
    console.log("get user by name")
    try {
        const user = await User.findOne({ name: req.body.name, pasword: req.body.pasword })
        if (user)
            res.status(200).json({ user: user })
        else
            res.status(404).send("user not exist")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const getUser = async (req, res) => {
    console.log("get user")
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            console.log(user);
            res.status(200).json({ user: user })
        }
        else
            res.status(404).send("user not exist")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


const updateUser = (req, res) => {
    console.log("update user")
    User.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(user => {
            res.status(200).json({ user: user })
        }).catch(err =>
            res.status(500).send(err.message))
}

const deleteUser = (req, res) => {
    console.log("delete user")
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            res.status(200).json({ message: "user deleted succesfully", user: user })
        }).catch(err =>
            res.status(500).send(err.message))
}

const getAllUsers =(req,res)=>{
    User.find()
    .then(users=>res.send(users))
    .catch(err=>res.send(err))
}


module.exports = { createUser, getUser, updateUser, deleteUser, getUserByNameAndPassword,getAllUsers }