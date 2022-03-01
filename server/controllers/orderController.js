const mongoose = require('mongoose')
const Order = require('../models/order')

const createOrder = async (req,res)=>{
    console.log("create order",req.body)
    const avilable = await check_AP_avilable(req.body)
    if(avilable)
        return res.status(500).send('השלט טפוס')

    const order = new Order(req.body)
    if(!order.userId||!order.startDate||!order.endDate||!order.AdvertisingPointId)
        return res.status(500).send('problam')

    const newOrder = await order.save()
    if( newOrder) return res.status(200).json({message:"new order created succesfully",newOrder:newOrder})
  
    return res.status(500).send('problam')
}
async function check_AP_avilable(order){
const startDate = new Date(order.startDate);
const endDate = new Date(order.endDate);

const ordersByAP = await Order.find({AdvertisingPointId:order.AdvertisingPointId})
await ordersByAP.filter(o=>{
    !(o.startDate <= startDate && 
    o.endDate >= startDate&&
    o.startDate <= endDate &&
     o.endDate >= endDate) })
if (ordersByAP.length > 0) return false
return true
}

module.exports = {createOrder}