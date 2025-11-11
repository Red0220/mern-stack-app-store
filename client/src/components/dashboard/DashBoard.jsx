import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

import Profile from '../../pages/Auth/Profile'
import AddProduct from '../../pages/product/AddProduct'
import Products from '../../pages/admin/Products'
import Orders from '../../pages/orders/Orders'
import MdDashboard from '../../pages/admin/MdDashboard'
import Settings from '../../pages/admin/Settings'
import Users from '../../pages/admin/Users'
import { useSelector } from 'react-redux'



const DashBoard = () => {
  
    const [tab, setTab] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const user = useSelector((state) => state.user?.currentUser);

    const components = {
      profile: Profile,
      addproduct: AddProduct,
      products: Products,
      orders: Orders,
      analytics: MdDashboard,
      settings: Settings,
      users: Users
    }
    const Component = components[tab] || MdDashboard

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
        const tabParam = urlParams.get('tab')
        if(tabParam) {
          setTab(tabParam)
        }

    },[location.search])
    
  return (
    <div className='flex gap-4 z-0'>
     {
      user ? (
        <>
         <Sidebar />

    <div className='flex-1 py-1'>
       <Component />
       
    </div>
        </>
      ) : (
        navigate('/signin')
      )
     }
    </div>
  )
}

export default DashBoard