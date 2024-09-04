const { Order } = require("../models/order.model")

const createOrder = async(req,res)=>{
   
    try{

         const {userId , products , totalAmount , shippingAddress , shippingAddressGoogleMap , contactNumber} = req.body

         const order = new Order({
            userId , products , totalAmount , shippingAddress , shippingAddressGoogleMap , contactNumber
         })
         const savedOrder = await order.save()
         res.status(201).json(savedOrder)
    }

    catch(error){
        res.status(500).json({message: error.message})
    }
}


const getOrderByUserId = async(req, res)=>{
    try{
    const userId = req.params.userId
    const order = await Order.find({userId}).populate("products.productId").populate("userId")
    res.json(order)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getAllOrder= async(req,res)=>{

    try{
        
        const order = await Order.find().populate("products.productId").populate("userId")
        res.json(order)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
}


const updateOrder = async(req,res)=>{

    try{
        
        const orderId = req.params.id
        const updates = req.body
        const options = {new:true}
        const updatedOrder = await Order.findByIdAndUpdate(orderId , updates , options)
        if(!updatedOrder){
            return res.status(404).json({message:"Order not found"})
        }
        res.status(200).json(updatedOrder)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }

}

const deleteOrder = async(req,res)=>{

    try{
        const order = await Order.findOneAndDelete(req.params.id)
        if(!order){
           return res.status(404).json({message:"Order not found"})
        }
        res.status(200).json({message:"order deleted successfully", data:{}})

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports= {createOrder , getOrderByUserId,getAllOrder,updateOrder,deleteOrder}