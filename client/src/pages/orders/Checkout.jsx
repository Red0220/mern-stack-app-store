import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveShippingAddress } from '../../redux/cart/cart.slice.js'
import { useCreateOrderMutation } from '../../redux/Api/order.slice.js'

import Bar from "../../components/ui/Bar";
import { CHECKOUT_STEPS } from "../../data/checkoutSteps";
import CartShopping from "../../components/ui/carts/CartShopping";
import ShippingAddres from "../user/ShippingAddres";
import Order from "./Order";
import CartSummary from "../../components/ui/carts/CartSummary";
import Pagination from "../../components/Pagination";

const Checkout = () => {
  // const user = useSelector(state => state.user.currentUser)
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    totalQuantity,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = useSelector((state) => state.cart || {});
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();
  
  
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder]= useState(null);
  const checkoutId = useRef(crypto.randomUUID());

  const checkoutLock = order?.isCheckoutClosed || orderId?.isPaid;

  useEffect(()=> {
    if (shippingAddress) setData(shippingAddress);
  },[shippingAddress])

  const context = { cartItems, shippingAddress, paymentMethod };

  const canAccessStep = (step) => {
    if (step < 0 || step > CHECKOUT_STEPS.length) return false;
    return CHECKOUT_STEPS.slice(0, step + 1).every((s) => s.isAllowed(context));
  };

  const goNext = () => {
    if (canAccessStep(activeStep + 1)) {
      setActiveStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setActiveStep((s) => Math.max(0, s - 1));
  };
  useEffect(() => {
    if (!canAccessStep(activeStep)) {
      setActiveStep(activeStep - 1);
    }
  }, [cartItems, shippingAddress, paymentMethod]);

 const handleShippingNext = async () => {
  
  if(orderId){
    goNext();
    return;
  }
  if(isLoading) return;

  const requiredFields = ['fullName', 'phoneNumber', 'address', 'city', 'postalCode', 'country'];
  const isValid = requiredFields.every(field => data[field].trim() !== '');

  if (!isValid) {
    alert('Please fill in all required fields.');
    return;
  }
  dispatch(saveShippingAddress(data));

  // continue to order step
   try {
   const res =  await createOrder({
        checkoutId: checkoutId.current,
        orderItems: cartItems,
        shippingAddress: data,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
     }).unwrap();

     setOrder(res);
      setOrderId(res._id);

   } catch (error) {
    console.log(error);
   }
  
 }

  return (
    <div className="max-w-6xl min-h-screen mx-auto px-4 py-6">
      <Bar
        activeStep={activeStep}
        onStepChange={(s) => canAccessStep(s) && setActiveStep(s)}
        canAccessStep={canAccessStep}
      />
      <div className="px-2 py-6 flex justify-between  gap-8 items-start">
        <div className="flex-1">
          {activeStep === 0 && <CartShopping cartItems={cartItems} />}
          {activeStep === 1 && (
            <ShippingAddres data={data} setData={setData} onNext={handleShippingNext} />
          )
          }
          {activeStep === 2 && <Order />}
        </div>

        {cartItems.length > 0 && (
          <div className="w-[280px] hidden md:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-auto">
            <CartSummary
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              itemsPrice={itemsPrice}
              shippingPrice={shippingPrice}
              activeStep={activeStep}
            />
          </div>
        )}
      </div>
      <Pagination
        canGoBack={activeStep > 0 && !checkoutLock}
        canGoNext={canAccessStep(activeStep + 1) && !isLoading}
        onBack={goBack}
        onNext={()=> {
          if(checkoutLock) return;
          if (activeStep === 1) {
            handleShippingNext();
          } else {
            goNext();
          }
        }}
        nextLabel={
          checkoutLock 
          ? 'Completed' 
          : activeStep === 1
            ? "continue to order"
            : activeStep === 2
              ? "Pay Now"
              : "Next"
        }
      />
    </div>
  );
};

export default Checkout;
