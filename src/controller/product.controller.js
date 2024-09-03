const { toSlug } = require("../utils/helper");
const { uploadImageToCloudinary } = require("../utils/fileUpload"); //}
const Product = require("../models/product.model");
const { query } = require("express");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity } = req.body;
    const slug = toSlug(name);
    const file = req.file;

    const imageUrl = await uploadImageToCloudinary(file);

    const product = new Product({
      name,
      price,
      description,
      category,
      quantity,
      slug,
      imageUrl,
    });

    const resp = await product.save();

    const newProduct = await Product.findById(resp._id).populate("category");
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const cid = req.query.cid || null;
    const query = {};

    if (cid) {
      query.category = cid;
    }
    const products = await Product.find({ ...query })
      .populate("category")
      .populate("reviews");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params._id;

    const products = await Product.findById(productId)
      .populate("category")
      .populate("reviews");

    if (!products) {
      res.status(404).json({ message: "Product not found" });
    }

    res.json(products);
  } catch (error) {
   c;
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params._id;
    const file = req.file;
    const imageUrl = null;

    if (file) {
      imageUrl = await uploadImageToCloudinary(file);
    }
    if (imageUrl) {
      req.body.imageUrl = imageUrl;
    }
    request.body.slug = toSlug(req.body.name);
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    const updateProduct = await product.populate("category");
    res.status(201).json(updateProduct);
  } catch (error) {
    const updateProduct = await product.populate("category");
    res.status(201).json(updateProduct);
  }
};

const deleteProduct = async(req, res) => {

    try{
    const productId = req.params._id
    const product = await Product.findByIdAndDelete(productId)
    res.status(200).json({message: "Product deleted successfully"})
    }catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
