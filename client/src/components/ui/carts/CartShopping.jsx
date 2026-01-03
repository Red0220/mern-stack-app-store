import { useDispatch} from 'react-redux'
import  { clearCart } from '../../../redux/cart/cart.slice.js'

import CartItemRow from './CartItemRow'


const CartShopping = ({cartItems}) => {
    
    

    const dispatch = useDispatch()
    

  return (
    <div className='py-6'>
      
        <h1 className='text-lg font-semibold text-center '>Shopping Cart</h1>
        <div>

         <table className='w-full'>
          <thead>
           <tr>
             <th className='text-left py-3 w-[80%]'>Product</th>
            <th className='text-left py-3 w-[20%]'>Total</th>
           </tr>
          </thead>
         <tbody className='divide-y-4 divide-red-800'>
          {
            cartItems.length === 0 && (
              <tr>
                <td colSpan={2} className='py-10 text-center text-gray-600'>
                  Your cart is empty
                </td>
              </tr>
            )
          }
          {
            cartItems?.map(item => (
              <CartItemRow key={item.id}  item={item}/>
            ))
          }
          </tbody>

         </table>

        </div>
        
          <div className='flex justify-end mt-6'>
          {
            cartItems.length > 0 && (
              <button
              onClick={() => dispatch(clearCart())}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition'
            >
              Clear Cart
            </button>
            )
          }
          </div>
        
    </div>
  )
}

export default CartShopping

//https://cdn.dribbble.com/userupload/15725650/file/original-d799f6bdaa71616eb97fa63d9f31d58b.jpg?resize=1024x756&vertical=center