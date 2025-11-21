import { useEffect, useState, useMemo} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useGetProductByIdQuery } from '../../redux/Api/product.slice.js'
import { addToCart, setTotalQuantity } from '../../redux/cart/cart.slice.js'
import IsLoading from '../../components/ui/IsLoading'
import { formatPrice } from '../../util/formatPrice.js'
import Ratings from '../../components/ui/Ratings'
import ImageGallery from '../../components/ImageGallery'

//icons
import { MdAddShoppingCart } from 'react-icons/md'

const ProductPage = () => {
  const {id}  = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {data, isLoading, error} = useGetProductByIdQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [errMsg, setErrMsg] = useState('');
  
  const product = data?.product;
  const inStock = product?.stock > 0;
  const images = useMemo(()=> product?.images, [product]);
  


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

 const handleAddTocart = () => {
   dispatch(addToCart({
    ...product,
    _id: product._id,
    quantity
   }));
   
 }    
     console.log('product:', quantity);
  
 if(isLoading) return <IsLoading />
 if(error) return (
  <div className="p-4 text-red-500">{errMsg}</div>
 )

 if(!product) return null 

  return (
    <div className='max-w-6xl mx-auto w-full min-h-screen flex flex-col p-2 sm:p-10'>
      {/* left */}
      <ImageGallery
      images={images}
      title={product.title}
      />
      {/* product details */}
      <hr className="border-gray-200 my-2"/>
      <div className="flex flex-col gap-6 p-2 sm:p-4 max-w-xl mx-auto ">

      <h1 className="text-xl font-semibold leading-snug text-gray-900">
        {product.title}
        </h1>
     <div className="flex gap-4 items-center">

        <p className="text-lg font-semibold">
          Price: {formatPrice(product.price)}
          </p>

       <span 
       className={`px-3 py-1 rounded-full text-sm font-semibold shasdow-sm
        ${inStock ? 
        "text-green-800 bg-green-100" 
        : 'text-red-800 bg-red-100'}`}
        >
        {inStock ? 'In Stock' : 'Out of'}
        </span>
     </div>
        {/* quantity and add to cart button */}
     <div className="flex gap-2 sm:gap-32 items-center justify-around sm:justify-start">
       
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
     
    
      
        <button type='button'
        className='p-1 sm:p-1.5 ml-8 rounded-md bg-white 
        font-semibold border border-gray-400 w-16 sm:w-56 
        hover:text-white hover:bg-black hover:opacity-40 transition-colors 
        active:scale-[0.95] cursor-pointer'
        onClick={handleAddTocart} >
       <span className='hidden sm:block'> 
        Add to cart
        </span>
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