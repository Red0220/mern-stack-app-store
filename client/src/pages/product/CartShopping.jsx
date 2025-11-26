import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {clearCart} from '../../redux/cart/cart.slice.js'

import Bar from '../../components/ui/Bar'

const CartShopping = () => {
    const user = useSelector(state => state.user.currentUser)
    const {cartItems , ...rest}= useSelector(state => state.cart)

    const dispatch = useDispatch();

    const [steps, setSteps] =  useState(1)
    const [activeStep, setActiveStep] = useState(0)

    console.log(rest);
  return (
    <div className='py-6 max-w-4xl mx-auto'>
        
        <Bar 
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        />
        <div className="">
         <table className='min-w-full devide-y devide-gray-800'>
          <thead>
           <tr>
             <th className='text-left py-2'>Product</th>
            <th className='text-left py-2'>Total</th>
           </tr>
          </thead>
          <tbody className='devide-y devide-gray-800'>
            <tr>
              {
                cartItems && cartItems.map((p, i)=> (
                 <>
                  <tr key={i} className='py-4'>
                    <td className='flex gap-2 '>
                      <img src={p.images[0]} alt={p.title}
                       className='w-16 h-16 object-cover' />
                      <span className=' truncate'>{p.title}</span>
                      {/* quantity */}
                      <div className="">
                        <input type="number" name="" id="" />
                      </div>
                    </td>
                   
                  </tr>
                 </>
                  
                ))
              }
            </tr>
          </tbody>
         </table>
        </div>
        
    </div>
  )
}

export default CartShopping

//https://cdn.dribbble.com/userupload/15725650/file/original-d799f6bdaa71616eb97fa63d9f31d58b.jpg?resize=1024x756&vertical=center