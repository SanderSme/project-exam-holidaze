import fullStar from '../assets/fullStar.svg'
import emptyStar from '../assets/emptyStar.svg'
import halfStar from '../assets/halfStar.svg'

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className='flex gap-2'>
      {[...Array(fullStars)].map((_, i) => (
        <img key={`full-star-${i}`} src={fullStar} alt="full star" className="w-4 sm:w-5" />
      ))}
      {hasHalfStar && <img src={halfStar} alt="half star" className="w-4 sm:w-5"/>}
      {[...Array(emptyStars)].map((_, i) => (
        <img key={`empty-star-${i}`} src={emptyStar} alt="empty star" className="w-4 sm:w-5"/>
      ))}
    </div>
  );
}

export default StarRating