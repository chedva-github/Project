const mongoose = require('mongoose')

const sizeSchema = mongoose.Schema({
    sizeName: { type: String }
})

module.exports = mongoose.model('Size', sizeSchema)