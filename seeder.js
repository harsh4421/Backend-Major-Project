const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

const products = [
  {
    name: 'Apple iPhone 18 Pro Max',
    description: 'Forged in aerospace-grade titanium, featuring the revolutionary A20 Pro chip, AI-driven computational photography, and an edge-to-edge holographic display.',
    price: 169900,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung Galaxy S26 Ultra',
    description: 'The ultimate AI phone. Features a 250MP main camera, next-gen Snapdragon 8 Gen 5 processor, and a built-in S Pen with air gestures.',
    price: 149900,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sony PlayStation 5 Pro',
    description: 'Experience 8K gaming and hyper-realistic ray tracing. Includes the new DualSense Edge controller with adaptive haptic feedback.',
    price: 65990,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Meta Quest 4',
    description: 'The most immersive mixed reality headset yet. Features dual 4K micro-OLED displays and zero-latency hand tracking.',
    price: 45999,
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'MacBook Pro 14-inch M5 Max',
    description: 'Supercharged by the M5 Max chip. Delivers desktop-level performance with up to 30 hours of battery life and a stunning Liquid Retina XDR display.',
    price: 319900,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dyson Gen5detect Absolute',
    description: 'The most powerful HEPA cordless vacuum. Reveals 2x more invisible dust with advanced laser illumination technology.',
    price: 79900,
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Oura Ring Gen 4',
    description: 'The smartest health tracking ring in the world. Monitors sleep, stress, heart rate variability, and blood oxygen with clinical accuracy.',
    price: 29999,
    imageUrl: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Garmin Fenix 8 Solar',
    description: 'The ultimate multisport GPS watch. Features unlimited battery life with solar charging, built-in flashlight, and advanced mapping.',
    price: 95990,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Logitech MX Master 4S',
    description: 'The iconic mouse, remastered. Features an 8K DPI sensor, zero-latency wireless connectivity, and silent tactile clicks.',
    price: 10995,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'LG C6 65-inch OLED 4K TV',
    description: 'Experience perfect black and infinite contrast. Features the new Alpha 11 AI processor and a virtually bezel-less design.',
    price: 185000,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sonos Arc Gen 2',
    description: 'The premium smart soundbar for TV, movies, music, and more. Delivers immersive 3D sound with Dolby Atmos and AI room calibration.',
    price: 99999,
    imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nothing Phone (4)',
    description: 'A revolutionary transparent design with advanced Glyph interface. Powered by pure Android and the Snapdragon 8 Gen 4.',
    price: 44999,
    imageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Keychron Q1 HE Wireless',
    description: 'Premium custom mechanical keyboard featuring Hall Effect magnetic switches for adjustable actuation and rapid trigger performance.',
    price: 18499,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple Vision Pro 2',
    description: 'The era of spatial computing is here. Blends digital content seamlessly with your physical space using eye and hand tracking.',
    price: 349900,
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'DJI Mavic 4 Pro',
    description: 'Professional drone featuring a Hasselblad camera with 4/3 CMOS sensor, omnidirectional obstacle sensing, and 50-minute flight time.',
    price: 195000,
    imageUrl: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80'
  }
];

// Import data
const importData = async () => {
  try {
    await connectDB();
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
