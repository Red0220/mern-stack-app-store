import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

import Profile from '../../pages/Auth/Profile'
import AddProduct from '../../pages/product/AddProduct'
import Products from '../../pages/product/Products'
import Orders from '../../pages/orders/Orders'

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
    <div>
     <Sidebar />

    <div className="">
         { tab === "profile" && <Profile/>}
         { tab === "AddProduct" && <AddProduct/>}
         {tab === "products" && <Products/>}
         { tab === 'orders' && <Orders/>}
    </div>
    </div>
  )
}

export default DashBoard