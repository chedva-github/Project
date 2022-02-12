const mongoose = require('mongoose')

const rentToUserSchema = mongoose.Schema({
    pointId: {type:mongoose.SchemaTypes.ObjectId, ref:'AdvertisingPoint'},
    startDate: { type: Date },
    endDate: { type: Date },
    userId: {type:mongoose.SchemaTypes.ObjectId, ref:'User'},
    paymentNum: { type: Number },
    removeTime: { type: Object },
    messageFile: { type: Buffer },
})

module.exports = mongoose.model('rentToUser', rentToUserSchema)