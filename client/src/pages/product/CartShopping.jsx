import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {clearCart} from '../../redux/cart/cart.slice.js'

import Bar from '../../components/ui/Bar'
import CartItemRow from '../../components/CartItemRow'


const CartShopping = () => {
    const user = useSelector(state => state.user.currentUser)
    const {cartItems , ...rest}= useSelector(state => state.cart)

    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = useState(0)

    console.log(cartItems);
  return (
    <div className='py-6 max-w-6xl mx-auto'>
        
        <Bar 
        activeStep={activeStep}
        onStepChange={setActiveStep}
        />
        <div className="flex gap-2">
         <table className='flex-1 divide-y divide-gray-800'>
          <thead>
           <tr>
             <th className='text-left py-2'>Product</th>
            <th className='text-left py-2'>Total</th>
           </tr>
          </thead>
         <tbody className='divide-y divide-gray-800'>
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
            cartItems.map(item => (
              <CartItemRow key={item._id} item={item}/>
            ))
          }
</tbody>
         </table>

        </div>
        <button type='button' onClick={() => dispatch(clearCart())} >
          clear
        </button>

        
    </div>
  )
}

export default CartShopping

//https://cdn.dribbble.com/userupload/15725650/file/original-d799f6bdaa71616eb97fa63d9f31d58b.jpg?resize=1024x756&vertical=center