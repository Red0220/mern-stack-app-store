import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {clearCart} from '../../redux/cart/cart.slice.js'
const CartShopping = () => {
    const user = useSelector(state => state.user.currentUser)
    const {cartItems , ...rest}= useSelector(state => state.cart)

    const dispatch = useDispatch();

    console.log(rest);
  return (
    <div>
        <h1>Cart Shopping Page</h1>
        <h2>User: {user?.username}</h2>
        <h3>Number of items in cart: {cartItems.length}</h3>
        {
            cartItems.map(item => (
                <div key={item.id}>
                    <p>Product: {item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                </div>
            ))
        }
        <button onClick={() => dispatch(clearCart())}>
            clear cart
        </button>
    </div>
  )
}

export default CartShopping