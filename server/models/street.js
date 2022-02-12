const mongoose = require('mongoose')

const streetSchema = mongoose.Schema({
    streetName:{type:String}
})

module.exports = mongoose.model('Street', streetSchema)