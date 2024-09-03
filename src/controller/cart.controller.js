const { Cart } = require("../models/cart.model");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, cartQuantity } = req.body;

    let cart = await Cart.findOne({ userId, productId });
    if (cart) {
      cart.quantity += parseInt(cartQuantity);
    } else {
      cart = new Cart({ userId, productId, cartQuantity });
    }

    const savedCart = await cart.save();
    res.status(200).message(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const carts = await Cart.find({ userId }).populate("productId");
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      res.status(404).json({ message: "cart not found" });
    }
    res.json({ message: "cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllCartsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await Cart.deleteMany({ userId });
    res.json({ message: `${result.deletedCount} Carts deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getCartByUserId, addToCart,deleteCartById,deleteAllCartsByUserId}