
const Button = ({type='button', disabled, onClick, children}) => {
  return (
    <button type={type} 
    disabled={disabled}
    onClick={onClick}
    className='w-full max-w-3xs md:max-w-sm text-slate-800 font-medium p-2.5 border border-gray-100 rounded-md shadow-md hover:opacity-50 focus:ring-2 focus:ring-gray-200  transition duration-200 cursor-pointer'>
       {children}
    </button>
  )
}

export default Button