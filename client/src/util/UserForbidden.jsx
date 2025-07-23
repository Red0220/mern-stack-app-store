import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserForbidden = () => {
  
    const { user } = useSelector(state => state.user.currentUser);
 
    return user ? <Navigate to="/" /> : <Outlet/>
}

export default UserForbidden