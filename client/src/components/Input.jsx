import React from 'react'

const Input = ({type, placeholder, id,value ,onChange}) => {
  return (
    
          <div className="">
            <input type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={onChange}
            required
            className="p-1.5 border border-gray-100 rounded-md shadow-md focus:outline-none "
             />
          </div>
  )
}

export default Input