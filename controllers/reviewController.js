const Review = require('../models/Review');
const Product = require('../models/Product');
exports.getReviews = async (req, res, next) => {
  try {
    let query;
    if (req.params.productId) {
      query = Review.find({ product: req.params.productId });
    } else {
      query = Review.find().populate({
        path: 'product',
        select: 'name description'
      });
    }
    const reviews = await query;
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate({
      path: 'product',
      select: 'name description'
    });
    if (!review) {
      return res.status(404).json({ success: false, error: 'No review found with that id' });
    }
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.addReview = async (req, res, next) => {
  try {
    req.body.product = req.params.productId;
    req.body.user = req.user.id;
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'No product found with that id' });
    }
    const existingReview = await Review.findOne({
      product: req.params.productId,
      user: req.user.id
    });
    if (existingReview) {
       return res.status(400).json({ success: false, error: 'You have already submitted a review for this product' });
    }
    const review = await Review.create(req.body);
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, error: 'You have already submitted a review for this product' });
    }
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, error: 'No review found with that id' });
    }
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to update review' });
    }
    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    review.save();
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, error: 'No review found with that id' });
    }
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to update review' });
    }
    await Review.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.getAverageRating = async (req, res, next) => {
  try {
     const product = await Product.findById(req.params.productId);
     if (!product) {
       return res.status(404).json({ success: false, error: 'Product not found' });
     }
     const obj = await Review.aggregate([
       {
         $match: { product: product._id }
       },
       {
         $group: {
           _id: '$product',
           averageRating: { $avg: '$rating' }
         }
       }
     ]);
     let averageRating = undefined;
     if (obj.length > 0) {
       averageRating = Math.round(obj[0].averageRating * 10) / 10;
     }
     res.status(200).json({
       success: true,
       data: {
         product: product._id,
         averageRating: averageRating
       }
     });
  } catch(err) {
     res.status(400).json({ success: false, error: err.message });
  }
}
