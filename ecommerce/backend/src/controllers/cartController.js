const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ver carrinho do usuário
exports.getCart = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true }
    });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Adicionar item ao carrinho
exports.addToCart = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { productId, quantity } = req.body;
  try {
    // Se já existe, atualiza quantidade
    const existing = await prisma.cart.findFirst({
      where: { userId, productId }
    });
    if (existing) {
      const updated = await prisma.cart.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity }
      });
      return res.json(updated);
    }
    // Se não existe, cria novo
    const item = await prisma.cart.create({
      data: { userId, productId, quantity }
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remover item do carrinho
exports.removeFromCart = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  try {
    await prisma.cart.deleteMany({
      where: { userId, productId }
    });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar quantidade de um item
exports.updateCartItem = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;
  try {
    const item = await prisma.cart.updateMany({
      where: { userId, productId },
      data: { quantity }
    });
    res.json({ message: "Cart item updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};