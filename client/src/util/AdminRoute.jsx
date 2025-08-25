import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {

    const { user } = useSelector(state => state.user.currentUser);
  return user && user.isAdmin ? <Navigate to="/" /> : <Outlet /> 
}

export default AdminRoute