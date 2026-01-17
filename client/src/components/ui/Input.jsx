import { forwardRef } from 'react'


const Input = forwardRef(
  ({ className= '', ...props }, ref) => {
  return (
    <input 
    ref={ref}
    className={`w-full max-w-sm p-2 border border-gray-300 rounded-md focus:outline-none  ${className}`}
    {...props}
    />
  )
}
)

export default Input