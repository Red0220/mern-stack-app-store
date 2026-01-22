import { useState, useEffect } from 'react'
import { SHIPPING_FORM } from '../../data/shippingForm.js'


import Input from '../../components/ui/Input'
import FormField from '../../components/ui/FormField'
import Button from '../../components/ui/Button'
import Address from '../../components/ui/Address.jsx'

const ShippingAddress = ({ data, setData, onNext }) => {



  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // setIsEditing(false);
    onNext();
  }
  // if (!isEditing && shippingAddress) {
  //   return (
  //  <Address shippingAddress={shippingAddress} setIsEditing={setIsEditing} />
  //   )
  // }
  return (
    <div className='max-w-md mx-auto'>
      <h2 className='text-center text-xl font-semibold '>Shipping Address</h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {
          Object.entries(SHIPPING_FORM).map(([section, fields])=>(
            <section key={section} className='space-y-3'>
              <h2 className='font-semibold capitalize '>{section} </h2>

              {
                fields.map((field)=> (
                  <FormField 
                  key={field.name}
                  label={field.label}
                  htmlFor={field.name}
                  >
                    <Input 
                    type="text"
                    name={field.name}
                    id={field.name}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    value={data[field.name]}
                    onChange={handleChange}
                    />

                  </FormField>
                ))
              }
            </section>
          ))
        }
        <Button type='submit' >
          Continue to Payment
        </Button>
        {/* <button type="submit" className='w-full p-2 mt-4 border border-gray-300 rounded-md font-medium'> 
          Save Address
        </button> */}
      </form>
      </div>
  )
}

export default ShippingAddress