import { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { SHIPPING_FORM } from '../../data/shippingForm.js'
import { saveShippingAddress } from '../../redux/cart/cart.slice.js'


import Input from '../../components/ui/Input'
import FormField from '../../components/ui/FormField'
import Button from '../../components/ui/Button'
import Address from '../../components/ui/Address.jsx'

const ShippingAddress = () => {

  const dispatch = useDispatch()
  const { shippingAddress } = useSelector(state => state.cart)

  const [isEditing, setIsEditing] = useState(!shippingAddress);
  const [data, setData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: ''
  }
  )
 //
 useEffect(() => {
  if (shippingAddress) {
    setData({
      fullName: shippingAddress.fullName || '',
      phoneNumber: shippingAddress.phoneNumber || '',
      address: shippingAddress.address || '',
      addressLine2: shippingAddress.addressLine2 || '',
      city: shippingAddress.city || '',
      postalCode: shippingAddress.postalCode || '',
      country: shippingAddress.country || ''
    })
  }
 }, [shippingAddress])
  // handle change
  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const requeiredFields = [
      'fullName',
      'phoneNumber',
      'address',
      'city',
      'postalCode',
      'country'
    ];
    const isValid = requeiredFields.every(field => data[field].trim() !== '');
    if (!isValid) return;
    dispatch(saveShippingAddress(data))
    setIsEditing(false);
  }
  if (!isEditing && shippingAddress) {
    return (
   <Address shippingAddress={shippingAddress} setIsEditing={setIsEditing} />
    )
  }
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
        <Button type='button' >
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