const mongoose = require('mongoose')
const Size = require('../models/size')

const getAllSize = (req, res) => {
    console.log('getAllsize')
    Size.find().then(s =>
        res.status(200).send(s))
    .catch(err => res.status(500).send(err))
}

const insertSize = async (req,res) =>{
    console.log("inserSize")
    const size = new Size(req.body)
    try {
        const newSize = await size.save()
        res.status(200).json({ message: "new user created succesfully", newSize: newSize })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = { getAllSize ,insertSize }