import React from 'react'

const CartSummary = ({
    totalQuantity,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
}) => {
  return (

    <div className="flex-1 border rounded-lg p-4 max-w-[300px] space-y-3">
      <h2 className="font-semibold text-center">
        Cart Summary
      </h2>

      <div className="flex justify-between">
        <span>Items ({totalQuantity})</span>
        <span>${itemsPrice}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span>${shippingPrice}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Tax</span>
        <span>${taxPrice}</span>
      </div>

      <hr />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  )
}

export default CartSummary