import React from 'react'

const Input = ({type, placeholder, id,value ,onChange}) => {
  return (
    
          
            <input type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={onChange}
            required
            className=" w-full max-w-3xs md:max-w-sm p-1.5 border border-gray-100 rounded-md shadow-md focus:outline-none "
             />
          
  )
}

export default Input