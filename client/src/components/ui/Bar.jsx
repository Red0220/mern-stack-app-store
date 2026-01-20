import { CHECKOUT_STEPS } from '../../data/checkoutSteps.js'


const Bar = ({activeStep, onStepChange, canAccessStep}) => {


  return (
    <div className='max-w-6xl mx-auto  h-16 bg-gray-100  rounded shadow-sm py-3 px-4 hidden sm:block'>
      <div className="flex items-center">
          {
            CHECKOUT_STEPS.map((item, index) => {
               const Icon = item.icon;
               const isActive = index === activeStep;
               const isCompleted = index <= activeStep;
               const isAccessible = canAccessStep(index);
               const isLocked = !isAccessible

                return (
                    <div key={item.key} className='flex items-center  flex-1' >

                      <button
                      type='button'
                      disabled={isLocked}
                      onClick={()=> onStepChange(index)}
                      className={`flex items-center gap-2 hover:opacity-80  transition-opacity 
                      ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                      >

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
                             <div className="flex-1 h-[6px] mx-2 sm:mx-4 bg-gray-400  rounded overflow-hidden">
                             
                             <div className="h-full bg-slate-800 rounded transition-[width] duration-500 ease-out" 
                           style={{ width:  isCompleted ? '100%' : '0%' }}

                             ></div>
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