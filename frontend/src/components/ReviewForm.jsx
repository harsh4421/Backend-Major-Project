import { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
const ReviewForm = ({ productId, token, onReviewAdded }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${productId}/reviews`,
        { title, text, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setText('');
      setRating(5);
      onReviewAdded(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
      <h4 style={{ marginBottom: '1.2rem', fontSize: '1.1rem' }}>Write a Review</h4>
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" style={{ marginBottom: '0.5rem' }}>Rating</label>
          <StarRating rating={rating} setRating={setRating} interactive={true} />
        </div>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength="100"
            placeholder="Summarize your experience"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Review</label>
          <textarea
            className="form-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="What did you like or dislike?"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};
export default ReviewForm;
