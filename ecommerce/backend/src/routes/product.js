const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Listar todos os produtos
router.get('/', getProducts);

// Buscar produto por ID
router.get('/:id', getProductById);

// Criar novo produto
router.post('/', createProduct);

// Atualizar produto
router.put('/:id', updateProduct);

// Deletar produto
router.delete('/:id', deleteProduct);

module.exports = router;