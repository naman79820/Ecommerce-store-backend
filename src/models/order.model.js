const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      cartQuantity: {type:Number, required: true}
    },
  ],
  totalAmount:{type:Number,required: true},
  shippingAddress: {type:String, required: true},
  shippingAddressGoogleMap: {type:String, required: true},
  contactNumber:{type:Number, required: [true,"Contact Number is required"],
    validate: {
        validator: function (v) {
          // Custom validation logic: e.g., ensure it's 10 digits long
          return /^[0-9]{10}$/.test(v.toString());
        },
        message: props => `${props.value} is not a valid contact number! It should be a 10-digit number.`
      }
    
    
  },
  status:{
    type:String,
    required:true,
    enum:["Pending","Processing","Shipped","Delievered","Canceled"],
    default:"Pending"
  },
  createdAt:{
    type:Date,
    default:Date.now()
}


});


const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
