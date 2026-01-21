import {  useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Bar from '../../components/ui/Bar'
import { CHECKOUT_STEPS } from '../../data/checkoutSteps'
import CartShopping from '../../components/ui/carts/CartShopping'
import ShippingAddres from '../user/ShippingAddres'
import Order from './Order'
import CartSummary from '../../components/ui/carts/CartSummary'
import Pagination from '../../components/Pagination'
import { set } from 'mongoose'

const Checkout = () => {
    // const user = useSelector(state => state.user.currentUser)
    const {cartItems, shippingAddress, paymentMethod, totalQuantity, itemsPrice, shippingPrice,  totalPrice}= useSelector(state => state.cart || {})

    const [activeStep, setActiveStep] = useState(0)
    
    const context = { cartItems, shippingAddress, paymentMethod}
    
    console.log('STEP CHECK', {
       step: activeStep + 1,
       context,
       checks: CHECKOUT_STEPS
    .slice(0, activeStep + 2)
    .map(s => s.isAllowed(context)),
})


    const canAccessStep = (step) => {
      if(step < 0 || step > CHECKOUT_STEPS.length) return false
      return CHECKOUT_STEPS
        .slice(0, step + 1)
        .every(s => s.isAllowed(context))
    }

    console.log('c', canAccessStep(activeStep), activeStep)
  const goNext = () => {
    if (canAccessStep(activeStep + 1)) {
      setActiveStep(s => s + 1)
    }
  }

  const goBack = () => {
    setActiveStep(s => Math.max(0, s - 1))
  }
    useEffect(() => {

    if (!canAccessStep(activeStep)) {
      setActiveStep(activeStep - 1);
    }
  }, [ cartItems, shippingAddress, paymentMethod]);
  
    
     useEffect(() => {
      if(activeStep=== 1){
        const createOrder = async () => {
          // Simulate an API call or some asynchronous operation
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 500); // Simulate a 500ms delay
          });
        }
      }
      }, [activeStep])


  return (
    <div className='max-w-6xl min-h-screen mx-auto px-4 py-6'>
      <Bar 
      activeStep={activeStep}
      onStepChange={(s)=> canAccessStep(s) && setActiveStep(s)}
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
            
        <div className="w-[280px] hidden md:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-auto">
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
       <Pagination
      canGoBack={activeStep > 0}
      canGoNext={canAccessStep(activeStep + 1)}
      onBack={goBack}
      onNext={goNext}
      nextLabel={
        activeStep === 1
          ? 'continue to order' 
          : activeStep === 2 
          ? 'Pay Now' 
          : 'Next' 
        } 
      />
    </div>
  )
}

export default Checkout