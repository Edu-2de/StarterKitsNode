const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "mysecret"; // Recomenda-se usar variável de ambiente

// Middleware para verificar se o usuário está autenticado
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Espera o header no formato: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // user: { userId, email, ... }
    next();
  });
}

module.exports = authenticateToken;