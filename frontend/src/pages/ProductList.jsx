import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`);
        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading products...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>All Products</h2>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-card glass-panel">
              <div style={{ height: '200px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span style={{ fontSize: '3rem', color: 'var(--text-muted)' }}>📦</span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
              <p style={{ flex: 1, marginBottom: '1rem', fontSize: '0.9rem' }}>
                {product.description.substring(0, 80)}...
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
                  ${product.price.toFixed(2)}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <StarRating rating={product.averageRating || 0} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    ({product.reviews ? product.reviews.length : 0})
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
