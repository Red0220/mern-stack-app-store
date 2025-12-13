import React from 'react'
import { formatPrice } from "../../util/formatPrice.js"
const Price = ({price, stock}) => {
  return (
     <div className="flex items-center justify-between w-full py-4 ">
    
      {/* LEFT: Price */}
      <div className="flex items-baseline  gap-2">
        <span className="text-gray-700 text-lg font-semibold">Price:</span>
        <span className="text-xl font-semibold text-gray-900">
          {formatPrice(price)}
        </span>
      </div>
    
      {/* RIGHT: Stock badge */}
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          stock > 0
            ? "text-green-800 bg-green-100"
            : "text-red-800 bg-red-100"
        }`}
      >
        {stock > 0 ? "In Stock" : "Out of Stock"}
      </span>
    
    </div>
  )
}

export default Price