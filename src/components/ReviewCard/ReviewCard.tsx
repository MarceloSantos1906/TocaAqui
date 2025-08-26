import type { Review } from '../../types';
import './ReviewCard.css';

interface ReviewCardProps {
    review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="review-item">
            <div className="review-avatar">{review.name.charAt(0)}</div>
            <div className="review-content">
                <h4>{review.name}</h4>
                <p>{review.text}</p>
            </div>
        </div>
    );
}

export default ReviewCard;
