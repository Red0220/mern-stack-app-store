import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from '../user/UserProfile';
import AdminProfile from '../admin/AdminProfile';

const Profile = () => {
  const user = useSelector((state) => state.user?.currentUser);
  console.log("User data in Profile component:", user);
  return (
    user?.isAdmin ? <AdminProfile /> : <UserProfile /> 
  )
}

export default Profile