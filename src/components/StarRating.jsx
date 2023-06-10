import ReactStars from 'react-rating-stars-component';

const StarRating = ({ averageRating }) => {
  return <ReactStars count={10} size={35} activeColor="#ffd700" edit={false} value={averageRating || 0} key={averageRating} />;
};

export default StarRating;
