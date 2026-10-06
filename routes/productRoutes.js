const express = require('express');
const { getProducts, getProduct, createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/auth');

// Include other resource routers
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Re-route into other resource routers
router.use('/:productId/reviews', reviewRouter);
router.use('/:productId/average-rating', reviewRouter);

router
  .route('/')
  .get(getProducts)
  .post(protect, createProduct);

router
  .route('/:id')
  .get(getProduct);

module.exports = router;
