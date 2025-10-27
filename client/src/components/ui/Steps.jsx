import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Steps = ({steps, active, onStepChange}) => {
  

    
  return (
    <div className='w-full flex gap-8 pb-6 justify-center font-semibold text-md'>
     {
        steps.map((step, i) =>{
            const stepNum = i + 1
            const isActive = active === stepNum
            
            return (
                <span key={stepNum}
                onClick={()=> onStepChange(stepNum)}
                className={`cursor-pointer tansition-all duration-300 
                ${isActive ? 'font-bold border-b pb-2' : 'text-gray-400 hover:text-gray-600' }`}>
                     {step}
                </span>
            )
        
        })
     }
    </div>
  )
}

export default Steps