const mongoose = require('mongoose')
const rentToUser = require('../models/rentToUser')

const createRentToUser = async (req, res) => {
    console.log("create rentToUser")
    const r = new rentToUser(req.body)
    try {
        const newRentToUser = await r.save()
        res.status(200).json({ message: "new rentToUser created succesfully", newRentToUser: newRentToUser })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const getRentToUser = async (req, res) => {
    console.log("get rentToUser")
    try {
        const rentToUser = RentToUser.findById(req.params.id)
        if (user)
            res.status(200).json({ rentToUser: rentToUser })
        else
            res.status(404).send("rentToUser not exist")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


const updateRentToUser = (req, res) => {
    console.log("update rentToUser")
    rentToUser.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(rentToUser => {
            res.status(200).json({ rentToUser: rentToUser })
        }).catch(err =>
            res.status(500).send(err.message))
}

const deleteRentToUser = (req, res) => {
    console.log("delete rentToUser")
    rentToUser.findByIdAndDelete(req.params.id)
        .then(rentToUser => {
            res.status(200).json({ message: "rentToUser deleted succesfully", rentToUser: rentToUser })
        }).catch(err =>
            res.status(500).send(err.message))
}

const getAllRentToUser = (req,res)=>{
    console.log('getAllrenttouser')
    rentToUser.find()
    .then(r=>res.status(200).send(r))
    .catch(err=>res.status(500).send(err.message))
}

const getRentToUserByUserId = (req,res)=>{
    console.log('getRentToUserByUserId')
    rentToUser.find({userId:req.params.id})
    .then(r=>res.status(200).send(r))
    .catch(err=>res.status(500).send(err.message))
}

module.exports = { createRentToUser, getRentToUser, updateRentToUser, deleteRentToUser ,getAllRentToUser,getRentToUserByUserId}