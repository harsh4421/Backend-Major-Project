const express = require('express');
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getAverageRating
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });
router.get('/', (req, res, next) => {
  if (req.originalUrl.includes('average-rating')) {
    return getAverageRating(req, res, next);
  }
  return getReviews(req, res, next);
});
router
  .route('/')
  .post(protect, addReview);
router
  .route('/:id')
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);
module.exports = router;
