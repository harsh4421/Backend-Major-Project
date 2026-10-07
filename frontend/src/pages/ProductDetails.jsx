import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import { Package } from 'lucide-react';

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
    fetchProduct();
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)' }}>Loading product details...</div>;
  if (!product) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Product not found</div>;

  const hasReviewed = user && product.reviews && product.reviews.some(r => r.user === user._id);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontSize: '0.9rem' }}>
        &larr; Back to Products
      </Link>
      
      <div className="panel" style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start', border: 'none', boxShadow: 'none', background: 'transparent' }}>
        <div style={{ width: '100%', height: '400px', backgroundColor: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Package size={80} color="#94a3b8" strokeWidth={1} />
        </div>
        
        <div style={{ paddingTop: '1rem' }}>
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <StarRating rating={product.averageRating || 0} />
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              {product.averageRating ? product.averageRating.toFixed(1) : 'No ratings yet'} 
              {' '}({product.reviews ? product.reviews.length : 0} reviews)
            </span>
          </div>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '600' }}>${product.price.toFixed(2)}</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '2rem' }}>{product.description}</p>
          <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
            Add to Cart
          </button>
        </div>
      </div>

      <div style={{ marginTop: '4rem', maxWidth: '800px', margin: '4rem auto 0 auto' }}>
        <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Customer Reviews</h3>
        
        {user ? (
          !hasReviewed ? (
             <ReviewForm productId={product._id} token={token} onReviewAdded={handleReviewAdded} />
          ) : (
             <div className="panel" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
               <p style={{ color: '#166534', fontSize: '0.95rem', fontWeight: '500' }}>You have already reviewed this product. Thank you!</p>
             </div>
          )
        ) : (
          <div className="panel" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Please log in to write a review.</p>
            <Link to="/login" className="btn btn-outline">Log In</Link>
          </div>
        )}

        <div className="review-list">
          {product.reviews && product.reviews.length > 0 ? (
            [...product.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(review => (
              <div key={review._id} className="review-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem', fontSize: '1rem' }}>{review.title}</h4>
                    <StarRating rating={review.rating} />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{review.text}</p>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
