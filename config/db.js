const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('user:password')) {
       console.log('MongoDB connection skipped: Please provide a valid MONGO_URI in .env');
       return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
