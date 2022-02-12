const mongoose = require('mongoose')
const Street = require('../models/street') 

const getAllStreets = (req,res)=>{
    Street.find().then(streets=>
        res.status(200).send(streets)
    ).catch(err=>res.status(500).send(err))
}
module.exports = {getAllStreets}