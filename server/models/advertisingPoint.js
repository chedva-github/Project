const mongoose = require('mongoose')

const AdvertisingPointSchema = mongoose.Schema ({
    address: { type: mongoose.Types.ObjectId, ref:'Street' },
    areaId: { type: mongoose.Types.ObjectId, ref:'Area' },
    size:{ type: mongoose.Types.ObjectId, ref:'Size' },
    price: { type: Number},
    status: { type: Boolean },
    lat:{ type: String },
    lng:{ type: String}
})

module.exports = mongoose.model('AdvertisingPoint', AdvertisingPointSchema)
