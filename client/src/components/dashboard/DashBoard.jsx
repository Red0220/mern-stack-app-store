import  { lazy, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Sidebar from './Sidebar'

const Profile =  lazy(()=> import('../../pages/Auth/Profile'))
const Orders =  lazy(() => import('../../pages/admin/Orders'))



const AddProduct = lazy(()=> import('../../pages/product/AddProduct'))  
const Products = lazy(()=> import('../../pages/admin/Products')) 
const MdDashboard = lazy(()=> import('../../pages/admin/MdDashboard')) 
const Settings = lazy(()=> import('../../pages/admin/Settings')) 
const Users = lazy(()=> import('../../pages/admin/Users')) 



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
        <div className='flex flex-col items-center justify-center h-screen'>  
          <h2 className='text-2xl mb-4'>You must be logged in to access the dashboard. <Link to="/signin"></Link></h2>
    </div>
      )
     }
    </div>
  )
}

export default DashBoard