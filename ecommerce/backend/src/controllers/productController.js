const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

// Listar todos os produtos (inclui imagens)
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { images: true }
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Buscar produto por ID (inclui imagens)
exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { images: true }
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Erro interno do servidor" });
  }
};

// Criar novo produto com upload de imagem
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, sku, categoryId } = req.body;
    let imageUrls = [];

    // Se houver arquivos enviados, salva as URLs relativas
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Cria o produto
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        sku,
        isActive: true,
        categoryId: categoryId || null,
        images: {
          create: imageUrls.map(url => ({ url }))
        }
      },
      include: { images: true }
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Atualizar produto (opcional: atualizar imagens)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, sku, categoryId } = req.body;
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Atualiza produto
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        sku,
        categoryId: categoryId || null,
        ...(imageUrls.length > 0 && {
          images: {
            deleteMany: {},
            create: imageUrls.map(url => ({ url }))
          }
        })
      },
      include: { images: true }
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Deletar produto (e imagens associadas)
exports.deleteProduct = async (req, res) => {
  try {
    // Remove imagens do disco
    const images = await prisma.productImage.findMany({
      where: { productId: req.params.id }
    });
    images.forEach(img => {
      const imgPath = path.join(__dirname, "../../", img.url);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    // Remove produto e imagens do banco
    await prisma.product.delete({
      where: { id: req.params.id }
    });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Erro interno do servidor" });
  }
};