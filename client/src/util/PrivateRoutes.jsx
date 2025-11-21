import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const user = useSelector(state => state.user.currentUser);
  return user ? <Outlet/> : <Navigate to="/signin"/>
}

export default PrivateRoutes