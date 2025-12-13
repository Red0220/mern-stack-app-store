import { act } from 'react';
import { CHECKOUT_STEPS } from '../../data/checkoutSteps.js'


const Bar = ({activeStep, onStepChange}) => {


  return (
    <div className='max-w-3xl  h-16 mx-auto bg-gray-100 rounded shadow-sm py-3 px-4 '>
      <div className="flex items-center justify-around">
          {
            CHECKOUT_STEPS.map((item, index) => {
               const Icon = item.icon;
               const isActive = index === activeStep;
               const isCompleted = index < activeStep;

                return (
                    <div key={item.key} className='flex items-center w-full' >
                      <button
                      type='button'
                      onClick={()=> onStepChange(index)}
                      className='flex items-center gap-2'>
                        <span className={`flex items-center justify-center h-10 w-10 rounded-full border 
                          ${isCompleted ? 'bg-black text-white border-black' : ''}
                          ${isActive && !isCompleted ? 'border-black text-black' : ''}
                          ${!isActive && !isCompleted ? 'border-gray-400 text-gray-600' : ''}`}
                          >
                            <Icon size={18} />
                        </span>
                        <span className={`text-sm ${
                          isActive || isCompleted ? 'font-semibold text-black' : 'text-gray-600'
                        }`}>
                          {
                            item.label
                          }

                        </span>

                      </button>
                
                     {
                        index < CHECKOUT_STEPS.length -1 && (
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