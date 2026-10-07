const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
const auth = require('./routes/authRoutes');
const products = require('./routes/productRoutes');
const reviews = require('./routes/reviewRoutes');
app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/reviews', reviews);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
