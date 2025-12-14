import { CHECKOUT_STEPS } from '../../data/checkoutSteps.js'


const Bar = ({activeStep, onStepChange}) => {


  return (
    <div className='w-full max-w-4xl mx-auto  h-16 bg-gray-100  rounded shadow-sm py-3 px-4 '>
      <div className="flex items-center ">
          {
            CHECKOUT_STEPS.map((item, index) => {
               const Icon = item.icon;
               const isActive = index === activeStep;
               const isCompleted = index < activeStep;

                return (
                    <div key={item.key} className='flex items-center  flex-1' >

                      <button
                      type='button'
                      onClick={()=> onStepChange(index)}
                      className='flex items-center gap-2 hover:opacity-80  transition-opacity'>

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
                             <div className="flex-1 h-[6px] mx-2 bg-gray-400  rounded sm:mx-4">
                               {/* <div className={` h-full rounded ${isCompleted ? 'bg-slate-800 ' : 'bg-gray-300'} `}>
                                
                             </div> */}
                             <div className="h-full bg-slate-800 rounded transition-all dur500 eaout" 
                             style={{
                              width: isCompleted ? '100%': '0%'
                             }}></div>
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