
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
const Ratings = ({rating , onRate, color='#ffc000'}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - (halfStar ?? 0)

  const st = {
    color,
    cursor: 'pointer',

  }

  const handleHover = (index) => {
    // Optional: Implement hover effect if needed

  }
  return (
    <div className="flex items-center text-lg py-2 gap-1" 
     title='share your opnio with us .'>
      {
        [...Array(fullStars)].map((_, i)=> (
          <FaStar 
          key={i}
          style={st}
          onClick={()=> handleHover(i + 1)}
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