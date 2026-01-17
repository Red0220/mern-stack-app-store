import React from 'react'
import { FaMapMarkerAlt, FaPhoneSquareAlt, FaUser } from 'react-icons/fa'
import Button from './Button'

const AddressItem = ({icon:Icon, label}) => (
    <div className="flex items-center gap-2 text-gray-700">
        <Icon size={20} />
        <span className='font-medium'>{label}</span>
    </div>
)
const Address = ({shippingAddress, setIsEditing}) => {
    if(!shippingAddress) return null;
    const {
        fullName,
        phoneNumber,
        address,
        addressLine2,
        city,
        postalCode,
        country
    } = shippingAddress
  return (
   <div className="max-w-md mx-auto   rounded space-y-4">
    <h2 className="text-xl font-semibold text-center">
        Shipping Address
    </h2>
    
    <div className="space-y-2 text-sm">
        <AddressItem icon={FaUser} label={fullName} />
        <AddressItem icon={FaPhoneSquareAlt} label={'+' +phoneNumber} />

        {address && (
          <AddressItem
            icon={FaMapMarkerAlt}
            label={`${address}${addressLine2 ? ', ' + addressLine2 : ''}`}
          />
        )}

        {(city || postalCode || country) && (
          <AddressItem
            icon={FaMapMarkerAlt}
            label={`${city || ''}${postalCode ? ', ' + postalCode : ''} ${country || ''}`}
          />
        )}
      </div>

 <Button onClick={()=> setIsEditing(true)}>
    Change your Address
 </Button>
   </div>
  )
}

export default Address