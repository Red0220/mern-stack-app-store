import { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'


import { useGetProductByIdQuery } from '../../redux/Api/product.slice.js'
import IsLoading from '../../components/ui/IsLoading.jsx'
import { formatPrice } from '../../util/formatPrice.js'
import Ratings from '../../components/ui/Ratings'

const ProductPage = () => {
  const {id}  = useParams()
  const navigate = useNavigate()
  const {data, isLoading, error} = useGetProductByIdQuery(id)
  const [selectImg, setSelectImg] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [errMsg, setErrMsg] = useState('')
  const product = data?.product;
  

  useEffect(()=>{
    if(product?.images?.length) setSelectImg(product.images[0])
  },[product])
 useEffect(()=> {
   if(error){
    setErrMsg('something went wrong. please try again later.')
    navigate('/', {
      state:{
        error:errMsg
      }
    })
  }
 },[error, navigate])
  
 if(isLoading) return <IsLoading />
 if(error) return (
  <div className="p-4 text-red-500">{errMsg}</div>
    
 )
 console.log(product.rating)
  return (
    <div className='max-w-6xl w-full min-h-screen flex flex-col  justify-center'>
      {/* left */}
      <div className="flex justify-around   ">
        {/* images */}
       <div className="">
          <ul className="flex flex-col gap-2  items-start mx-10 sm:mt-0">
            {product?.images.map((img, i)=> (
         
         <li key={i}>
           <img
           src={img} 
           onClick={(e)=> setSelectImg(img)}
            className={`w-12 h-12 sm:w-16 sm:h-16 object-contain rounded cursor-pointer transition-opacity hover:opacity-65 
            ${selectImg === img ? 'ring-2 ring-gray-700 ': ''}`}/>
         </li>
        
        ))} 
         </ul>

       </div>
         <div className=" max-w-md bg-transparent  rounded">
          <img src={selectImg} alt={product.title} 
          className='w-full h-96 md:h-[500px] object-cover rounded'/>
         </div>
   
       
      </div>
      {/* right */}
      <div className="flex-1 flex flex-col gap-8 p-4 ">
      <h1 className="text-xl font-bold">{product.title}</h1>
     <div className="flex gap-6 items-center">
        <p className="text-lg font-semibold">Price: {formatPrice(product.price)}</p>
       <p className={`px-3 py-1 rounded-full textsm font-semibold 
        ${product.stock > 0 ? "text-green-800 bg-green-100" 
        : 'text-red-700 bg-red-100'}`}>
        {product.stock > 0 ? 'In Stock' : 'Out of'}
        </p>
     </div>
        {/* quantity and add to cart button */}
     <div className="flex gap-4  items-center">
     <div className="">
       <label htmlFor="quantity" className='mr-4 font-medium'>Quantity:</label>
      <input type="number" name="quantity" id="quantity"
        className='w-12 outline-none border border-gray-400 rounded p-1.5'
        value={quantity}
        min={1}
        max={product.stock}
        onChange={(e)=> setQuantity(Number(e.target.value))}
         />
     </div>
    
      <button className='p-1.5 ml-8 rounded bg-white font-semibold border border-gray-400 w-56 hover:text-white hover:bg-black transition-colors' >Add to cart</button>
     </div>
     {/* ratings */}
     <div className="flex items-center gap-4 p-5 mt-5 border-t border-b border-gray-300">
      <Ratings 
      rating={product.rating}
      onRate={()=> {}}
      />
     </div>
      {/* <div className="">
        <p className='py-4 font-semibold'>About this item : </p>
        <ShowMore text={product.description} />
      </div> */}
      </div>
    </div>
  )
}

export default ProductPage