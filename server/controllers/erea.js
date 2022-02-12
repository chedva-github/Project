const mongoose = require('mongoose')
const Area = require('../models/area')

const createArea = async (req,res)=>{
    console.log("create area")
    const Area = new Area(req.body)
    try{
    const newArea = await Area.save()
    res.status(200).json({message:"new area created succesfully",newArea:newArea})
    }
    catch(err){
    res.status(500).send(err.message)
    }
}

const getArea = async (req,res)=>{
    console.log("get Area")
    try{
    const Area = Area.findById(req.params.id)
    if(area)
    res.status(200).json({area:area})
    else
    res.status(404).send("area not exist")
    }
    catch(err){
    res.status(500).send(err.message)
    }
}


const updateArea = (req,res)=>{
    console.log("update Area")
    Area.findByIdAndUpdate(req.body._id,req.body, {new:true})
    .then(area=>{
    res.status(200).json({area:area})
    }).catch(err=>
    res.status(500).send(err.message))
}

const deleteArea = (req,res)=>{
    console.log("delete Area")
    Area.findByIdAndDelete(req.params.id)
    .then(area=>{
    res.status(200).json({message:"Area deleted succesfully",area:area})
    }).catch(err=>
    res.status(500).send(err.message))
}


module.exports = {createArea,getArea,updateArea,deleteArea}