import { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'


import { useGetProductByIdQuery } from '../../redux/Api/product.slice.js'
import IsLoading from '../../components/ui/IsLoading.jsx'
import ShowMore from '../../components/ui/ShowMore.jsx'
import { formatPrice } from '../../util/formatPrice.js'

import Input from '../../components/ui/Input.jsx'


const ProductPage = () => {
  const {id}  = useParams()
  const {data, isLoading, error} = useGetProductByIdQuery(id)
  
  const [selectImg, setSelectImg] = useState(null)
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
      <h1 className="text-xl font-bold">{product.title}</h1>
     <div className="flex gap-6 items-center">
        <p className="text-lg font-semibold">Price: {formatPrice(product.price)}</p>
       <p className={`${product.stock > 0 ? "text-green-800" : 'text-red-700'} text-lg font-semibold`}>
        {product.stock > 0 ? 'In Stock' : 'Out of'}
        </p>
     </div>
        {/* quantity and add to cart button */}
     <div className="">
      <label htmlFor="quantity" className='mr-4 font-medium'>Quantity:</label>
      <input type="number" name="quantity" id="quantity"
        className='w-16 outline-none border border-gray-600 rounded p-1' />
     </div>
      <ShowMore text={product.description} />
      </div>
    </div>
  )
}

export default ProductPage