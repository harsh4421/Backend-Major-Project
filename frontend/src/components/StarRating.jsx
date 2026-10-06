import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating, interactive = false }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'filled' : 'empty'}
          onClick={() => interactive && setRating(star)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        >
          <Star size={20} fill={star <= rating ? 'var(--star-filled)' : 'none'} />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
