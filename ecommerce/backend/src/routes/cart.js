const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');

// Ver carrinho do usuário
router.get('/:userId', getCart);

// Adicionar item ao carrinho
router.post('/:userId/add', addToCart);

// Remover item do carrinho
router.delete('/:userId/remove/:productId', removeFromCart);

// Atualizar quantidade de um item no carrinho
router.put('/:userId/update/:productId', updateCartItem);

module.exports = router;