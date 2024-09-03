const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true

    },
    cartQuantity:{
        type:Number,
        required:true,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports ={Cart}