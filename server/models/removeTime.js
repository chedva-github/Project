const mongoose = require('mongoose')

const removeTSchema = mongoose.Schema({
    
    duration:{type:String, require:true},
    precentSale:{type:Number, require:true},
})

module.exports = mongoose.model('RemoveTime', removeTSchema)