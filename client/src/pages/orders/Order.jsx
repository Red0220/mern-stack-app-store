import React from 'react'

const Order = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-center font-semibold text-xl">Order</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="bg-red-800 h-full w-full">
          {/* order details */}
        </div>
        <div className="">
          <h2 className='text-center text-lg font-semibold '>Payment</h2>

        

        </div>
       </div>
    </div>
  )
}

export default Order