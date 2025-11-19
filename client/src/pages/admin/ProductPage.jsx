import { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'


import { useGetProductByIdQuery } from '../../redux/Api/product.slice.js'
import IsLoading from '../../components/ui/IsLoading.jsx'
import { formatPrice } from '../../util/formatPrice.js'
import Ratings from '../../components/ui/Ratings'
import ZoomImg from '../../components/ui/ZoomImg.jsx'
import Button from '../../components/ui/Button.jsx'

//icons
import { MdAddShoppingCart } from 'react-icons/md'

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
    <div className='max-w-6xl mx-auto w-full min-h-screen flex flex-col p-10'>
      {/* left */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-around mb-10   ">
        {/* images */}
       <div className="flex gap-6 p-8 sm:p-0">
          <ul className="flex sm:flex-col gap-6 ">
            {product?.images.map((img, i)=> (
         
         <li key={i}>
           <img
           src={img} 
           alt={`Thumbnail ${i+1} of ${product.title}`}
           onClick={(e)=> setSelectImg(img)}
            className={`w-12 h-12  object-contain rounded cursor-pointer transition-opacity hover:opacity-65 
            ${selectImg === img ? 'ring-2 ring-gray-600 ': ''}`}/>
         </li>
        
        ))} 
         </ul>

       </div>
         {/* <div className="max-w-md  bg-transparent rounded-md shadow-lg shadow-gray-300 p-4">
          <img src={selectImg} alt={product.title} 
          className='w-full h-96 md:h-[500px] object-cover rounded '/>
         </div>
    */}
       <ZoomImg src={selectImg} alt={product.title} />
      </div>
      {/* product details */}
      <div className="flex flex-col gap-4 p-2 sm:gap-8 sm:p-4 ">
      <h1 className="text-xl font-bold">{product.title}</h1>
     <div className="flex gap-6 items-center">
        <p className="text-lg font-semibold">Price: {formatPrice(product.price)}</p>
       <p className={`px-3 py-1 rounded-full text-sm font-semibold 
        ${product.stock > 0 ? "text-green-800 bg-green-100" 
        : 'text-red-700 bg-red-100'}`}>
        {product.stock > 0 ? 'In Stock' : 'Out of'}
        </p>
     </div>
        {/* quantity and add to cart button */}
     <div className="flex gap-2 sm:gap-[8rem] items-center">
     <div className="flex  items-center">
       
        <select 
        id="quantity" 
        value={quantity}
        onChange={(e)=> setQuantity(Number(e.target.value))}
        className='border border-gray-400 rounded px-2 py-1'
        >
          {Array.from({length: product.stock}, (_, i) => i + 1).map((num)=> (
           <option key={num} value={num}>{num}</option>
          ))}
        </select>
     </div>
    
      
        <button className='p-1.5 ml-8 rounded bg-white font-semibold border border-gray-400 w-56 hover:text-white hover:bg-black transition-colors' >
       <span className='hidden sm:block'> Add to cart</span>
        <span className='sm:hidden'>
          <MdAddShoppingCart className='inline-block ml-2 text-2xl'/>
        </span>
        </button>
      
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