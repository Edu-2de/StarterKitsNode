const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rota de registro
router.post('/register', register);

// Rota de login
router.post('/login', login);

module.exports = router;