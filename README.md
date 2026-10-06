# E-commerce Product Review System API

## Environment Setup
1. Rename or use `.env` and fill in your `MONGO_URI` with a valid MongoDB Atlas connection string.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the server with nodemon (or `node server.js`).

## API Endpoints

### Auth Endpoints
- `POST /api/auth/register` - Register a new user (requires name, email, password)
- `POST /api/auth/login` - Login user (requires email, password)
- `GET /api/auth/me` - Get current logged in user (Requires Bearer token)

### Product Endpoints
- `GET /api/products` - Get all products (includes reviews)
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product (Requires Bearer token)

### Review Endpoints
- `GET /api/reviews` - Get all reviews
- `GET /api/products/:productId/reviews` - Get all reviews for a specific product
- `GET /api/products/:productId/average-rating` - Get average rating using MongoDB aggregation
- `GET /api/reviews/:id` - Get a single review
- `POST /api/products/:productId/reviews` - Add a review for a product (Requires Bearer token, limits to 1 per user per product)
- `PUT /api/reviews/:id` - Update a review (Requires Bearer token, ownership check)
- `DELETE /api/reviews/:id` - Delete a review (Requires Bearer token, ownership check)

## Requirements Satisfied:
- Schema design (Product, Order, Review, User)
- CRUD for reviews
- Prevent duplicate reviews (unique index + controller check)
- Aggregation for average rating
- Validation (Rating 1-5, Required fields)
- JWT Auth & Ownership verification
