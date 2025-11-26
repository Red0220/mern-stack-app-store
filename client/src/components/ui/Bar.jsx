import React, { useState } from 'react'
import { FaShoppingCart, FaTruck, FaCreditCard} from 'react-icons/fa';

const data = [
     { name: "Cart", icon: <FaShoppingCart size={20} /> },
  { name: "Shipping", icon: <FaTruck size={20} /> },
  { name: "Order", icon: <FaCreditCard size={20} /> },
 
]
const Bar = ({activeStep, setActiveStep}) => {


  return (
    <div className='max-w-3xl h-16 mx-auto bg-gray-100 rounded shadow-sm py-3 px-4 '>
      <div className="flex items-center justify-around">
          {
            data.map((item, index) => {
                const isActive = activeStep === index;
                const isCompleted = index < activeStep
                
                return (
                    <div key={index} className='flex items-center w-full' >
                     <div  onClick={()=> setActiveStep(index)} 
                     className='flex items-center gap-3 ' >
                      <span  className={`flex items-center justify-center h-10 w-10 border rounded-full
                        ${isCompleted ? "bg-black text-white border-black" : ""}
                    ${isActive && !isCompleted ? "border-black text-black" : ""}
                    ${!isActive && !isCompleted ? "text-gray-600 border-gray-400" : ""}
                        `}
                      
                      >{item.icon} </span>
                     <span className={` text-sm ${isActive || isCompleted ? 'font-semibold text-black' : 'text-gray-800'}`}>
                           {item.name}
                     </span>
                     </div>
                     {
                        index < data.length -1 && (
                            <div className={`flex-1 mx-4 h-1.5 w-full rounded ${isCompleted ? 'bg-slate-800' : 'bg-gray-300'} `}>

                            </div>
                        )
                     }
                    </div>
                )
            }
            )
        }
      </div>
    </div>
  )
}

export default Bar