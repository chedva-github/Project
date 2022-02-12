const mongoose = require('mongoose')

const AdvertisingPointSchema = mongoose.Schema ({
    address: { type: mongoose.Types.ObjectId, ref:'Street' },
    areaId: { type: mongoose.Types.ObjectId, ref:'Area' },
    size:{ type: mongoose.Types.ObjectId, ref:'Size' },
    basicPriceWeek: { type: Number, require: true },
    status: { type: Boolean, require: true },
    lat:{ type: String, require: true },
    lng:{ type: String, require: true }
})

module.exports = mongoose.model('AdvertisingPoint', AdvertisingPointSchema)
