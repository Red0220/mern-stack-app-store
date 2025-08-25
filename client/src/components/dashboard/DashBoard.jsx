import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

import Profile from '../../pages/Auth/Profile'
import AddProduct from '../../pages/product/AddProduct'
import Products from '../../pages/admin/Products'
import Orders from '../../pages/orders/Orders'
import MdDashboard from '../../pages/admin/MdDashboard'
import Settings from '../../pages/admin/Settings'
import Users from '../../pages/admin/Users'



const DashBoard = () => {
  
    const [tab, setTab] = useState('')
    const location = useLocation()

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
        const tabParam = urlParams.get('tab')
        if(tabParam) {
          setTab(tabParam)
        }

    },[location.search])
    
  return (
    <div className='flex gap-8 '>
     <Sidebar />

    <div className="flex   p-4">
        {/* user */}
         { tab === "profile" && <Profile/>}
         

         {/* Admin */}
         { tab === "addproduct" && <AddProduct/>}
         {tab === "products" && <Products/>}
         {tab === 'users' && <Users /> }
         {tab === 'products' && <Products/>}
         { tab === 'orders' && <Orders/>}
         {tab === 'analytics' && <MdDashboard/>}
         {tab === 'settings' && <Settings/>}
         
       
    </div>
    </div>
  )
}

export default DashBoard