const Product = require('../models/Product');
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('reviews');
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
