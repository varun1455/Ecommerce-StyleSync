const express = require('express')
const {fetchCartByUser, addToCart, deleteFormCart, updateCart} = require('../controllers/Cart')
const router = express.Router();

router.get('/', fetchCartByUser).post('/', addToCart).delete('/:id', deleteFormCart).patch('/:id', updateCart)


exports.router = router;
