import { useEffect, useState, useMemo} from 'react'
import { useParams, useNavigate} from 'react-router-dom'


import { useGetProductByIdQuery } from '../../redux/Api/product.slice.js'
import IsLoading from '../../components/ui/IsLoading'
import { formatPrice } from '../../util/formatPrice.js'
import Ratings from '../../components/ui/Ratings'
import ImageGallery from '../../components/ImageGallery'

//icons
import { MdAddShoppingCart } from 'react-icons/md'

const ProductPage = () => {
  const {id}  = useParams()
  const navigate = useNavigate()
  const {data, isLoading, error} = useGetProductByIdQuery(id)
  const [quantity, setQuantity] = useState(1)
  const [errMsg, setErrMsg] = useState('')
  console.log('product data', data)
  
  const product = data?.product;
  const inStock = product?.stock > 0;
  


 const images = useMemo(()=> product?.images, [product])
 useEffect(()=> {

  if(!error) return;
  const msg = 'Something went wrong. Please try again later.'
  setErrMsg(msg);

    navigate('/', {
      state:{
        error: msg
      }
    })
  
 },[error, navigate])

     
     
  
 if(isLoading) return <IsLoading />
 if(error) return (
  <div className="p-4 text-red-500">{errMsg}</div>
 )

 if(!product) return null 

  return (
    <div className='max-w-6xl mx-auto w-full min-h-screen flex flex-col p-10'>
      {/* left */}
      <ImageGallery
      images={images}
      title={product.title}
      />
      {/* product details */}
      <div className="flex flex-col gap-4 p-2 sm:gap-8 sm:p-4 ">
      <h1 className="text-xl font-bold">{product.title}</h1>
     <div className="flex gap-6 items-center">
        <p className="text-lg font-semibold">Price: {formatPrice(product.price)}</p>
       <p className={`px-3 py-1 rounded-full text-sm font-semibold 
        ${inStock ? "text-green-800 bg-green-100" 
        : 'text-red-700 bg-red-100'}`}>
        {inStock ? 'In Stock' : 'Out of'}
        </p>
     </div>
        {/* quantity and add to cart button */}
     <div className="flex gap-2 sm:gap-32 items-center">
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