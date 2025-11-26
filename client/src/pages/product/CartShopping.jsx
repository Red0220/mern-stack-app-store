import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {clearCart} from '../../redux/cart/cart.slice.js'

import Bar from '../../components/ui/Bar'
import Input from '../../components/ui/Input'

const CartShopping = () => {
    const user = useSelector(state => state.user.currentUser)
    const {cartItems , ...rest}= useSelector(state => state.cart)

    const dispatch = useDispatch();

    const [steps, setSteps] =  useState(1)
    const [activeStep, setActiveStep] = useState(0)

    console.log(rest);
  return (
    <div className='py-6 max-w-6xl mx-auto'>
        
        <Bar 
        activeStep={activeStep}
        setActiveStep={setActiveStep}
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
  {cartItems && cartItems.map((p, i) => (
    <tr key={i} className=''>
      {/* PRODUCT CELL */}
      <td className='py-4 px-4'>
        <div className='flex items-center gap-32'>
          <img src={p.images[0]} alt={p.title} className='w-16 h-16 rounded-md object-cover' />
          <p className='text-sm font-medium w-84'>{p.title}</p>
          {/* quantity */}
          <div className="flex gap-2 max-w-54">

            <button>-</button>
            <input type="number" name="" id=""
            className='w-16'
             />
            <button>+</button>
          </div>
        </div>
      </td>

      {/* TOTAL CELL */}
      <td className='py-4 text-right font-semibold'>
        ${p.price.toFixed(2)}
      </td>
    </tr>
  ))}
</tbody>
         </table>

        </div>

        
    </div>
  )
}

export default CartShopping

//https://cdn.dribbble.com/userupload/15725650/file/original-d799f6bdaa71616eb97fa63d9f31d58b.jpg?resize=1024x756&vertical=center