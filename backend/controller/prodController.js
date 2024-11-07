// controller/prodController.js
const asyncHandler = require('express-async-handler');
const Product = require('../model/prodModel');

// Get list of products
const getProductList = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Add a new product
const putProducts = asyncHandler(async (req, res) => {
    const { name, price, image, details, category } = req.body;

    if (!name || !price || !image || !details|| !category) {
        res.status(400);
        throw new Error('Name, price, image and details are required');
    }

    const product = await Product.create({
        name,
        price,
        image,
        details,
        category
    });

    res.status(201).json({ name: product.name, price: product.price, image: product.image,details: product.details, category: product.category });
});

const getProductDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if id is provided
    if (!id) {
        res.status(400);
        throw new Error('Product ID is required');
    }

    // Find the product by ID
    const product = await Product.findById(id);

    // Check if product exists
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json(product);
});

module.exports = { getProductList, putProducts,getProductDetails };
