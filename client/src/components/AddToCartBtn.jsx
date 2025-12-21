import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cart.slice';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const AddToCartBtn = ({product, quantity}) => {
   const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false)

  if(!product) return null
   
  useEffect(()=> {
      if(added) {
      toast.success('Product added successfully to your cart')
    }
  },[added])
    const handleAddToCart = () => {
       if(!user){
        navigate('/signin')
        return;
       }
      if(added) return;
      dispatch(
        addToCart({
          id: product._id,
          title: product.title,
          price: product.price,
          stock: product.stock,
          quantity: quantity || 1 ,
          image: product.images?.[0],
        })
      );
      setAdded(true)
      
      setTimeout(()=> setAdded(false),1500)
    };
  
  
  return (
  <button
  disabled={product.stock <= 0 || added}
  onClick={handleAddToCart}
  className={`w-full sm:max-w-[13rem] px-8 py-3 rounded-md font-semibold transition ${
    product.stock > 0 ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
  }`}
>
  {
     product.stock > 0 ? "Add to cart" : 'Out of stock'
  }
</button>

  )
}

export default AddToCartBtn