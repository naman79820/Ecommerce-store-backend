const express =require('express');
const router = express.Router()

const cartController = require("../controller/cart.controller")




router.post('/carts' ,cartController.addToCart)
router.get('/carts/user/:userId' ,cartController.getCartByUserId)
router.delete('/carts/:id' ,cartController.deleteCartById)
router.delete('/carts/user/:userId' , cartController.deleteAllCartsByUserId)


module.exports = router