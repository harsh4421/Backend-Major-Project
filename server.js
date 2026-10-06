const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
// You should update MONGO_URI in .env before running if you want to connect to a real database.
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Route files
const auth = require('./routes/authRoutes');
const products = require('./routes/productRoutes');
const reviews = require('./routes/reviewRoutes');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/reviews', reviews);

// Error handler middleware (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
