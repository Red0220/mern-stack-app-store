import React from 'react'
import { formatPrice } from '../../../util/formatPrice.js'

const CartSummary = ({
    totalQuantity,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
}) => {
  return (

    <div className=" border rounded-lg px-4 py-4 space-y-2 shadow-md">
      <h2 className="font-semibold text-center">
        Cart Summary
      </h2>

      <div className="flex justify-between">
        <span>Items ({totalQuantity})</span>
        <span>{formatPrice(itemsPrice)}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span>{formatPrice(shippingPrice)}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Tax</span>
        <span>{formatPrice(taxPrice)}</span>
      </div>

      <hr />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  )
}

export default CartSummary