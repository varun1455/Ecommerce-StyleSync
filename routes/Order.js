const express = require('express')
const {createOrder, fetchOrderByUser, updateOrder, deleteOrder} = require('../controllers/Order')
const router = express.Router();

router.get('/', fetchOrderByUser).post('/', createOrder).delete('/:id', deleteOrder).patch('/:id', updateOrder)


exports.router = router;