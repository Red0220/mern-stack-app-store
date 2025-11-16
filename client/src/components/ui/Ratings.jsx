
import { Cursor } from 'mongoose';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
const Ratings = ({rating , onRate, color='#8B8000'}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - (halfStar ?? 0)

  const st = {
    color,
    cursor: 'pointer',

  }
  return (
    <div className="flex items-center text-xl">
      {
        [...Array(fullStars)].map((_, i)=> (
          <FaStar 
          key={i}
          style={st}
          onClick={()=> onRate(i + 1)}
          />
        ))
      }
      {
        halfStar === 1 && (
          <FaStarHalfAlt 
          style={st}
          onClick={()=>onRate(fullStars + 0.5)}
          />
        )
      }
      {
        [...Array(emptyStars)].map((_, i)=> (
          <FaRegStar 
          key={i} 
          style={st}
          onClick={()=> onRate(fullStars + halfStar + i + 1)}
          />
        ))
      }
    </div>
  )
}


export default Ratings