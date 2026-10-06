const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality noise-cancelling headphones with 30-hour battery life.',
    price: 199.99
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches for fast response.',
    price: 129.50
  },
  {
    name: 'Ultra HD 4K Monitor',
    description: '27-inch 4K UHD monitor with stunning color accuracy and sleek design.',
    price: 349.00
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your health, heart rate, and steps with this water-resistant smartwatch.',
    price: 89.99
  }
];

// Import data
const importData = async () => {
  try {
    await Product.deleteMany();
    console.log('Old products cleared.');
    
    await Product.insertMany(products);
    console.log('Sample Products Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
