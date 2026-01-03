import { formatPrice } from '../../../util/formatPrice.js'

const CartSummary = ({
    totalQuantity,
    itemsPrice,
    shippingPrice,
    totalPrice,
    activeStep
}) => {
  return (
    <div className="border rounded-lg px-4 py-4 space-y-4 shadow-md flex flex-col">
      <div className="flex-1 space-y-2">
        <h2 className="font-semibold text-center">Order Summary</h2>
        <div className="flex justify-between">
          <span>Items ({totalQuantity}):</span>
          <span>{formatPrice(itemsPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>{formatPrice(shippingPrice)}</span>
        </div>
        <hr />

        <div className="space-y-4 pt-4 font-semibold">
          <div className="flex justify-between items-center">
            <span>Total:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <button type='button'
          disabled={activeStep !== 2}
           className='w-full p-2 border border-gray-500 rounded-md hover:opacity-50'>
            Proceed to Payment
          </button>

          <p className="text-xs text-gray-500">
            Taxes and shipping calculated at checkout*
          </p>
        </div>

      </div>
    </div>
  )
}

export default CartSummary