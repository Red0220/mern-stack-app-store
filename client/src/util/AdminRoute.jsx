import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = () => {

    const { user } = useSelector(state => state.user.currentUser);
  return (
    <div>AdminRoute</div>
  )
}

export default AdminRoute