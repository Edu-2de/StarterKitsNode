const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os produtos
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buscar produto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Criar novo produto
exports.createProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, description, price: parseFloat(price), imageUrl }
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { name, description, price: parseFloat(price), imageUrl }
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Deletar produto
exports.deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};