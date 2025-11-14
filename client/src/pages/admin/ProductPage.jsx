import { useParams} from 'react-router-dom'
import { useGetProductByIdQuery } from '../../redux/Api/product.slice.js'
import IsLoading from '../../components/ui/IsLoading.jsx'
import { useEffect, useState } from 'react'
import ShowMore from '../../components/ui/ShowMore.jsx'
const ProductPage = () => {
  const {id}  = useParams()
  const {data, isLoading, error} = useGetProductByIdQuery(id)
  
  const [selectImg, setSelectImg] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const product = data?.product;
  

  useEffect(()=>{
    if(product?.images.length) setSelectImg(product.images[0])
  },[product])
  
 if(isLoading) return <IsLoading />
 if(error) return <div className="p-4 text-red-500">Error loading the product</div>

 console.log(product)
  return (
    <div className='max-w-6xl w-full min-h-screen flex gap-5 py-5'>
      {/* left */}
      <div className="flex-1 lg:flex-1/2 border-r-1 border-gray-600 pr-6">
         <div className=" w-[400px] h-[500px] mx-auto flex items-center justify-center overflow-hidden  bg-gray-500 rounded ">
          <img src={selectImg} alt={product.title} 
          className='object-cover rouneded w-full h-full'/>
         </div>
         <ul className="flex gap-2 justify-center items-center mt-6 ">
            {product.images.map((img, i)=> (
         
         <li key={i}>
           <img
           src={img} 
           onClick={(e)=> setSelectImg(img)}
            className={`w-12 h-12 rounded cursor-pointer transition hover:opacity-65 
            ${selectImg === img ? 'ring-2 ring-gray-700 opacity-100': ''}`}/>
         </li>
        
        ))} 
         </ul>
       
      </div>
      {/* right */}
      <div className="flex-1 flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl font-semibold">Price: ${product.price}</p>  
      <ShowMore text={product.description} />
      </div>
    </div>
  )
}

export default ProductPage