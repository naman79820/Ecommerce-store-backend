const express = require('express')
const router = express.Router()
const orderController= require('../controller/order.controller')

router.post('/orders',orderController.createOrder)
router.get('/orders/user/:userId',orderController.getOrderByUserId)
router.get('/orders',orderController.getAllOrder)
router.put('/orders/:id',orderController.updateOrder)
router.delete('/orders/:id',orderController.deleteOrder)





module.exports = router