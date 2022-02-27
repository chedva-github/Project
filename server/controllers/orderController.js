const mongoose = require('mongoose')
const Order = require('../models/order')

const createOrder = async (req,res)=>{
    console.log("create order",req.body)
    const order = new Order(req.body)
    if(!order.userId||!order.startDate||!order.endDate)
        return res.status(500).send('problam')

    const newOrder = await order.save()
    if( newOrder) return res.status(200).json({message:"new area created succesfully",newOrder:newOrder})
  
    return res.status(500).send('problam')
}
module.exports = {createOrder}