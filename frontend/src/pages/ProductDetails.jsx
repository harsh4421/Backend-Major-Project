import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';

const ProductDetails = ({ user, token }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = () => {
    // Re-fetch product to get updated reviews and average rating
    fetchProduct();
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading product details...</div>;
  if (!product) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Product not found</div>;

  const hasReviewed = user && product.reviews && product.reviews.some(r => r.user === user._id);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
        &larr; Back to Products
      </Link>
      
      <div className="glass-panel" style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div style={{ width: '100%', height: '400px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '8rem', color: 'var(--text-muted)' }}>📦</span>
        </div>
        
        <div>
          <h1 style={{ marginBottom: '1rem' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <StarRating rating={product.averageRating || 0} />
            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              {product.averageRating ? product.averageRating.toFixed(1) : 'No ratings yet'} 
              {' '}({product.reviews ? product.reviews.length : 0} reviews)
            </span>
          </div>
          <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '2.5rem' }}>${product.price.toFixed(2)}</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{product.description}</p>
          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            Add to Cart
          </button>
        </div>
      </div>

      <div style={{ marginTop: '4rem', maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '2rem' }}>Customer Reviews</h2>
        
        {user ? (
          !hasReviewed ? (
             <ReviewForm productId={product._id} token={token} onReviewAdded={handleReviewAdded} />
          ) : (
             <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--success)' }}>
               <p style={{ color: 'var(--success)' }}>You have already reviewed this product. Thank you!</p>
             </div>
          )
        ) : (
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
            <p style={{ marginBottom: '1rem' }}>Please log in to write a review.</p>
            <Link to="/login" className="btn btn-outline">Log In</Link>
          </div>
        )}

        <div className="review-list">
          {product.reviews && product.reviews.length > 0 ? (
            // Sort reviews by newest first
            [...product.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(review => (
              <div key={review._id} className="review-card glass-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{review.title}</h4>
                    <StarRating rating={review.rating} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ color: 'var(--text-main)' }}>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
