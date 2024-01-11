const Order = require('../models/orderModel');
const { Types } = require('mongoose');
const { ObjectId } = Types;

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const newOrder = await Order.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = req.body;
    await Order.updateOne({ _id: new ObjectId(id) }, { $set: order });
    const updateOrder = await Order.findOne({ _id: new ObjectId(id) }).populate('product');
    res.json(updateOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.deleteOne({ _id: new ObjectId(id) });
    res.json({deleted:true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  editOrder,
  deleteOrder
};
