import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Bar from '../../components/ui/Bar'
import { CHECKOUT_STEPS } from '../../data/checkoutSteps'
import CartShopping from '../../components/ui/carts/CartShopping'
import ShippingAddres from '../user/ShippingAddres'
import Order from './Order'
import CartSummary from '../../components/ui/carts/CartSummary'

const Checkout = () => {
    const user = useSelector(state => state.user.currentUser)
    const {cartItems, shippingAddress, paymentMethod, totalQuantity, itemsPrice, shippingPrice,  totalPrice}= useSelector(state => state.cart || {})
    

    const [activeStep, setActiveStep] = useState(0)
    
    const context = { cartItems, shippingAddress, paymentMethod}
    
    
    const canAccessStep = (step) => CHECKOUT_STEPS.slice(0, step + 1).every(s => s.isAllowed(context))
    
    useEffect(() => {

    if (!canAccessStep(activeStep)) {
      setActiveStep(p => Math.max(0, p - 1));
    }
  }, [activeStep, cartItems, shippingAddress, paymentMethod]);
  
     const handleStepChange = (step) => {
      if(!canAccessStep(step)) return
      setActiveStep(step)
     }



  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <Bar 
      activeStep={activeStep}
      onStepChange={handleStepChange}
      canAccessStep={canAccessStep}
      />
      <div className="px-2 py-6 flex justify-between  gap-8 items-start">
       <div className="flex-1">
        {activeStep === 0 && <CartShopping cartItems={cartItems} />}
        {activeStep === 1 && <ShippingAddres />}
        {activeStep === 2 && <Order />}
       </div>
      
        {
          cartItems.length > 0 && (
            
        <div className="w-[280px] hidden sm:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-auto">
          <CartSummary 
          totalQuantity={totalQuantity}
          totalPrice={totalPrice}
          itemsPrice={itemsPrice}
          shippingPrice={shippingPrice}
          activeStep={activeStep}
          
          />
          </div>
          )
        }
        
     
      </div>
    </div>
  )
}

export default Checkout