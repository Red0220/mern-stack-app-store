import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Bar from '../../components/ui/Bar'
import { CHECKOUT_STEPS } from '../../data/checkoutSteps'
import CartShopping from '../../components/ui/carts/CartShopping'
import ShippingAddres from '../user/ShippingAddres'
import Order from './Order'

const Checkout = () => {
    const user = useSelector(state => state.user.currentUser)
    const {cartItems , shippingAddress, paymentMethod}= useSelector(state => state.cart)
    
    console.log("Checkout User:");

    const [activeStep, setActiveStep] = useState(0)
    console.log(shippingAddress);
    
    const context = { cartItems, shippingAddress, paymentMethod}
    
    
    const canAccessStep = (step) => CHECKOUT_STEPS.slice(0, step + 1).every(s => s.isAllowed(context))
    
    useEffect(() => {

    if (!canAccessStep(activeStep)) {
      setActiveStep(p => Math.max(0, p - 1));
    }
  }, [cartItems, shippingAddress, paymentMethod]);
  
     const handleStepChange = (step) => {
      if(!canAccessStep(step)) return
      setActiveStep(step)
     }

     console.table({
  step0: canAccessStep(0),
  step1: canAccessStep(1),
  step2: canAccessStep(2),
});


  return (
    <div className='px-4 py-8 '>
      <Bar 
      activeStep={activeStep}
      onStepChange={handleStepChange}
      canAccessStep={canAccessStep}
      />

      {
        activeStep === 0 && <CartShopping onNext={() => handleStepChange(1)} />
      }
      { activeStep === 1 && <ShippingAddres  onNext={() => handleStepChange(2)} onBack={() => handleStepChange(0)} /> }
      { activeStep === 2 && <Order onBack={() => handleStepChange(1)} /> }

    
    </div>
  )
}

export default Checkout