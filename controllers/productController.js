const Product = require('../models/productModel');
const { Types } = require('mongoose');
const { ObjectId } = Types;

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await Product.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    console.log(id)
    await Product.updateOne({ _id: new ObjectId(id) }, { $set: product });
    const updatedProduct = await Product.findOne({ _id: new ObjectId(id) });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.deleteOne({ _id: new ObjectId(id) });
    res.json({deleted:true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct
};
