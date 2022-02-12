const removeTime = require('../models/user')

const createremoveTime = async (req, res) => {
    console.log("create removeTime")
    const removeTime = new User(req.body)
    try {
        const removeTime = await removeTime.save()
        res.status(200).json({ message: "new removeTime created succesfully", removeTime: removeTime })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const getremoveTime = async (req, res) => {
    console.log("get removeTime")
    try {
        const removeTime = removeTime.findById(req.params.id)
        if (user)
            res.status(200).json({ removeTime: removeTime })
        else
            res.status(404).send("removeTime not exist")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


const updateremoveTime = (req, res) => {
    console.log("update removeTime")
    User.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(user => {
            res.status(200).json({ removeTime: removeTime })
        }).catch(err =>
            res.status(500).send(err.message))
}

const deleteremoveTime = (req, res) => {
    console.log("delete removeTime")
    removeTime.findByIdAndDelete(req.params.id)
        .then(removeTime => {
            res.status(200).json({ message: "removeTime deleted succesfully", removeTime: removeTime })
        }).catch(err =>
            res.status(500).send(err.message))
}


module.exports = { createremoveTime, getremoveTime, updateremoveTime, deleteremoveTime }