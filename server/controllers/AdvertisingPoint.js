const schedule = require('node-schedule');


const AdvertisingPoint = require('../models/advertisingPoint')
const Street = require('../models/street')
const Size = require('../models/size')
const Order = require('../models/order')

const createUAdvertisingPoint = async (req, res) => {
  console.log('create AdvertisingPoint', req.body)

  let address = await Street.findOne({"streetName":req.body.address})
  if(!address) {address = new Street({ streetName: req.body.address })
  await address.save()}
  let size = await Size.findOne({"sizeName":req.body.size})
  if(!size) {size = new Size({ sizeName: req.body.size })
  await size.save()}
  const AdvertisingPointObj = new AdvertisingPoint({
    address: address.id,
    size: size._id,
    price: req.body.price,
    status: 0
  })
  
  try {
     await AdvertisingPointObj.save()
    const newAdvertisingPointafterPopulate =await AdvertisingPoint.findOne({"_id":AdvertisingPointObj._id}).populate('address')
      res.status(200).json({
      message: 'new AdvertisingPoint created succesfully',
      newAdvertisingPoint: newAdvertisingPointafterPopulate
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const getAdvertisingPoint = async (req, res) => {
  console.log('get AdvertisingPoint')
  try {
    const AdvertisingPointObj = AdvertisingPoint.findById(req.params.id)
    console.log('AdvertisingPointObj', AdvertisingPointObj)
    if (AdvertisingPointObj)
      res.status(200).json({ AdvertisingPoint: AdvertisingPointObj })
    else res.status(404).send('AdvertisingPoint not exist')
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const updateAdvertisingPoint = async (req, res) => {
  console.log('update AdvertisingPoint', req.body)
  //   let streetUpdate=''
  //   await Street.findOne({'streetName': req.body.address }, function (s, err) {
  //     console.log('APPERROR', err)
  //     streetUpdate = err
  //     console.log('APP', s)
  //   })
  // console.log("AP",street);

  //   const size = Size.findOne({ sizeName: req.body.size })

  AdvertisingPoint.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        // address: streetUpdate.streetName,
        status: req.body.status,
        price: req.body.price
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(500).send(err)
      }
      console.log('getalladvaterpoint')
      AdvertisingPoint.find()
        .populate('size')
        .populate('address')
        .then(ad => {
          res.status(200).send(ad)
        })
        .catch(err => res.send(err))
    }
  )
  // .then((b) =>
  //     console.log("😎",b)

  // )

  // .then(AdvertisingPoint => {
  //     console.log("up",advertisingPoint)
  //     res.status(200).json({ AdvertisingPoint: AdvertisingPoint })
  // }).catch(err =>{
  //      console.log("uperr",err)

  //     res.status(500).send(err.message)})
}

const deleteAdvertisingPoint = (req, res) => {
  console.log('delete AdvertisingPoint')
  AdvertisingPoint.findByIdAndDelete(req.params.id)
    .then(async () => {
      await AdvertisingPoint.find({})
        .populate('size')
        .populate('address')
        .then(ad => {
         return res.status(200).send(ad)
        })
    })
    .catch(err => res.send(err))
}

const getAllAdvertisingPoint = (req, res) => {
  console.log('getalladvaterpoint')
  AdvertisingPoint.find()
    .populate('size')
    .populate('address')
    .then(ad => {
      res.send(ad)
    })
    .catch(err => res.send(err))
}

const getPopularyBillBoard = async (req, res) => {
  // db.collection.aggregate([{$group:{_id:"$name", data:{$push:"$$ROOT"}}}])

  const order = await   Order.aggregate([{$group:{_id:"$AdvertisingPointId", data:{$push:"$$ROOT"}}}])
console.log("OOORRRDDDEERR",order);
let element = []
for (let i=0;i<order.length;i++) {
  console.log("key",order[i]);
  let AP=await AdvertisingPoint.findById(order[i]._id).populate('address').populate('size')
   element.push({"AP": AP,"count":order[i].data.length});
    
  }

  console.log(element);

//  const popular = order.forEach(async (x)=>await AdvertisingPoint.findById(x._id))
//  console.log("OOORRRDDDEERR",popular);

  return res.status(200).send(element)
}
const setAPstatus= async (req, res) => {


 const job = schedule.scheduleJob('1 0 * * *',async function (){
  const date_today= new Date();
  const month_today =date_today.getMonth();
  const day_today= date_today.getDate();
  const year_today = date_today.getFullYear()
  console.log('function work every 12 on night');
 // const order = await 
  Order.find().then(order=> 
    
    order.forEach(async x => {
  
  if(x.startDate&&(x.startDate).getDate()==day_today&&(x.startDate).getMonth()==month_today&&(x.startDate).getFullYear()==year_today)
  { 
    // x.AdvertisingPointId.staus=true
    console.log(x);
    updateone(x.AdvertisingPointId.toString(),true)
    //  await x.save(order)

  }
  if(x.endDate&&(x.endDate).getDate()==month_today&&(x.endDate).getMonth()==month_today&&(x.endDate).getFullYear()==year_today){
    updateone(x.AdvertisingPointId.toString(),false)
 await order.save()
  }
  })
  
  )
});

}
function updateone(id,stat){
  AdvertisingPoint.updateOne({ _id: id },{$set : {'status' : stat }}).then(x=>
    console.log(x))
}
module.exports = {
  createUAdvertisingPoint,
  getAdvertisingPoint,
  updateAdvertisingPoint,
  deleteAdvertisingPoint,
  getPopularyBillBoard,
  getAllAdvertisingPoint,
  setAPstatus,
  
}
