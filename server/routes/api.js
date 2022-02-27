const router = require('express').Router()
const user = require('../controllers/user')
const area = require('../controllers/erea')
const removeTime = require('../controllers/removeTime')
const rentToUser = require('../controllers/rentToUser')
const AdvertisingPoint = require('../controllers/AdvertisingPoint')
const streets = require('../controllers/street')
const size = require('../controllers/size')
const orderController = require('../controllers/orderController')


router.post('/createarea', area.createArea)
router.get('getarea/:id', area.getArea)
router.put('/updatearea', area.updateArea)
router.delete('/deletearea/:id', area.deleteArea)

router.post('/createUser', user.createUser)
router.get('/getUser/:id', user.getUser)
router.post('/getUserByNameAndPassword', user.getUserByNameAndPassword)
router.put('/updateUser', user.updateUser)
router.delete('/deleteUser/:id', user.deleteUser)
router.delete('/deleteUser/:id', user.deleteUser)

router.post('/createremoveTime', removeTime.createremoveTime)
router.get('getremoveTime/:id', removeTime.getremoveTime)
router.put('/updateremoveTime', removeTime.updateremoveTime)
router.delete('/deleteremoveTime/:id', removeTime.deleteremoveTime)

router.post('/createrentToUser', rentToUser.createRentToUser)
router.get('getrentToUser/:id', rentToUser.getRentToUser)
router.put('/updaterentToUser', rentToUser.updateRentToUser)
router.delete('/deleterentToUser/:id', rentToUser.deleteRentToUser)
router.get('/getAllRentToUser', rentToUser.getAllRentToUser)
router.get('/getRentToUserByUserId/:id', rentToUser.getRentToUserByUserId)

router.post('/createAdvertisingPoint', AdvertisingPoint.createUAdvertisingPoint)
router.get('getAdvertisingPoint/:id', AdvertisingPoint.getAdvertisingPoint)
router.put('/updateAdvertisingPoint', AdvertisingPoint.updateAdvertisingPoint)
router.post('/deleteAdvertisingPoint/:id', AdvertisingPoint.deleteAdvertisingPoint)
router.get('/getAllAdvertisingPoint', AdvertisingPoint.getAllAdvertisingPoint)

router.get('/getAllStreets', streets.getAllStreets)
router.get('/getAllSize', size.getAllSize)
router.post('/insertSize',size.insertSize)

router.post('/createOrder',orderController.createOrder)


module.exports = router