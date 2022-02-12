const mongoose = require('mongoose')

const areaSchema = mongoose.Schema({
    
    scription: { type: String, require: true },

})

module.exports = mongoose.model('Area', areaSchema)