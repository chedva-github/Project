const AdvertisingPoint = require('../models/advertisingPoint')

const createUAdvertisingPoint = async (req, res) => {
    console.log("create AdvertisingPoint")
    const AdvertisingPointObj = new AdvertisingPoint(req.body)
    try {
        const newAdvertisingPoint = await AdvertisingPointObj.save()
        res.status(200).json({ message: "new AdvertisingPoint created succesfully", newAdvertisingPoint: newAdvertisingPoint })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const getAdvertisingPoint = async (req, res) => {
    console.log("get AdvertisingPoint")
    try {
        const AdvertisingPointObj = AdvertisingPoint.findById(req.params.id)
        if (AdvertisingPointObj)
            res.status(200).json({ AdvertisingPoint: AdvertisingPointObj })
        else
            res.status(404).send("AdvertisingPoint not exist")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


const updateAdvertisingPoint = (req, res) => {
    console.log("update AdvertisingPoint")
    User.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(AdvertisingPoint => {
            res.status(200).json({ AdvertisingPoint: AdvertisingPoint })
        }).catch(err =>
            res.status(500).send(err.message))
}

const deleteAdvertisingPoint = (req, res) => {
    console.log("delete AdvertisingPoint")
    AdvertisingPoint.findByIdAndDelete(req.params.id)
        .then(AdvertisingPoint => {
            res.status(200).json({ message: "AdvertisingPoint deleted succesfully", user: user })
        }).catch(err =>
            res.status(500).send(err.message))
}
 
const getAllAdvertisingPoint = (req,res)=>{
    AdvertisingPoint.find().then(ad=>res.send(ad))
    .catch(err=>res.send(err))
}

module.exports  = { createUAdvertisingPoint, getAdvertisingPoint, updateAdvertisingPoint, deleteAdvertisingPoint,getAllAdvertisingPoint }