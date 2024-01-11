const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    count: Number
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
