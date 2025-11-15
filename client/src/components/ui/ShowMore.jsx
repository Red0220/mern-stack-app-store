import  { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
const ShowMore = ({text}) => {

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => setShowMore(p => !p);

  return (
    <div>
        <p className={`text-gray-700 ${!showMore ?'line-clamp-5' : ''} whitespace-pre-line`}>{text}</p>
        {
            text.length > 200 && (
                <button 
                onClick={toggleShowMore} 
                className="text-blue-500 text-sm mt-2 flex items-center gap-1  cursor-pointer">
                    {showMore ?
                     <>
                        Show Less <IoIosArrowUp className="text-base"/>
                     </>
                      : 
                      <>
                        Show More <IoIosArrowDown className="text-base"/>
                        </>}
                </button>
            )
        }
    </div>
  )
}

export default ShowMore