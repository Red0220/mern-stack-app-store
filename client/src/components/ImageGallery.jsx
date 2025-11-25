import { useState, useEffect, memo } from 'react'
import ZoomImg from './ui/ZoomImg'

const ImageGallery = ({images, title}) => {
    const [selectImg, setSelectImg] = useState(null)
    
     useEffect(()=>{
        if(images?.length) {
            setSelectImg(images[0])
        }
      },[images])
   
    
    if(!images) return null;
  return (
          <div className="flex flex-col-reverse gap-6 sm:flex-row items-center justify-around mb-2 sm:mb-10 ">
            {/* images */}
           <div className="flex gap-6 p-8 sm:p-0">
              <ul className="flex sm:flex-col gap-6 ">
                {images?.map((img, i)=> (
             
             <li key={i}>
               <img
               src={img} 
               alt={`${title} image ${i+1}`}
               onClick={()=> setSelectImg(img)}
                className={`w-10 h-10 sm:w-12 sm:h-12  object-cover rounded cursor-pointer transition-opacity hover:opacity-65 
                ${selectImg === img ? 'ring-2 ring-gray-700 ': ''}`}/>
             </li>
            
            ))} 
             </ul>
    
           </div>
             {/* <div className="max-w-md  bg-transparent rounded-md shadow-lg shadow-gray-300 p-4">
              <img src={selectImg} alt={product.title} 
              className='w-full h-96 md:h-[500px] object-cover rounded '/>
             </div>
        */}
           <ZoomImg src={selectImg} alt={title} zoomLevel={2}/>
          </div>
  )
}

export default memo(ImageGallery)