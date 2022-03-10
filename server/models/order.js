const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({  
    userId: {type:mongoose.SchemaTypes.ObjectId, ref:'User'},
    AdvertisingPointId: {type:mongoose.SchemaTypes.ObjectId, ref:'AdvertisingPoint'},
    startDate: { type: Date },
    endDate: { type: Date },
    img:String,
    accept: {type:Number,default:-1}
})

module.exports = mongoose.model('Order', orderSchema)