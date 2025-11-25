import { useMemo } from 'react';
import  { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
const ShowMore = ({text}) => {

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => setShowMore(p => !p);

    const paragraphs =  useMemo(()=> {
      return text.split('\n').filter(p => p.trim() !== '');
    },[text])
  

  return (
    <div className='space-y-2'>
        <div 
        className={`trasition-all duration-300
        ${showMore ?'' : 'line-clamp-4 '} `}>
          {
         
          paragraphs.map((line, index) => (
            <p key={index}
            className='text-gray-700 whitespace-pre-line mb-3 leading-relaxed'
            >
              <span className='font-bold text-xl'>-</span> 
              {" "}{line}
              <br />
            </p>
          ))
         }
          </div>
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