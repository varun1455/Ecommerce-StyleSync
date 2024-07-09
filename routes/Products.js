const express = require('express')
const {createProduct, fetchAllProducts, fetchProductById, updateProduct, fetchProducts} = require('../controllers/Product')
const router = express.Router();

router.post('/', createProduct).get('/', fetchAllProducts).get('/:id', fetchProductById).patch('/:id', updateProduct).get('/', fetchProducts)


exports.router = router;

