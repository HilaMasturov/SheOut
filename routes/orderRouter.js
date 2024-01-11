const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();


router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.editOrder);
router.delete('/:id', orderController.deleteOrder);


module.exports = router;