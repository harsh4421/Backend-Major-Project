const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/500'
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});
module.exports = mongoose.model('Product', ProductSchema);
