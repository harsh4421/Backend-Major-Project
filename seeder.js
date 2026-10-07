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
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry leading noise cancellation, two processors control 8 microphones for unprecedented noise cancellation.',
    price: 29990,
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Keychron K2 Wireless Mechanical Keyboard',
    description: 'A 75% layout (84-key) RGB backlight Bluetooth mechanical keyboard. Aluminum frame.',
    price: 8499,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dell UltraSharp 27 4K USB-C Hub Monitor',
    description: 'Experience true color reproduction on this brilliant 27-inch 4K monitor with a wide color coverage.',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Smarter. Brighter. Mightier. The most powerful chip in Apple Watch ever. A magical new way to use your Apple Watch without touching the screen.',
    price: 41900,
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'The iconic mouse, remastered. Feel every moment of your workflow with even more precision, tactility, and performance.',
    price: 9495,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac1eeb536fcb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nintendo Switch OLED Model',
    description: 'Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen with the Nintendo Switch system.',
    price: 32999,
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80'
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
