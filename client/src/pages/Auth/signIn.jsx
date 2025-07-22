import React, {useState} from 'react'

import Input from "../../components/Input"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signinStart, signinFailure, signinSuccess } from '../../redux/userSlice/user.slice.js'
import { useLoginMutation} from '../../redux/Api/auth.slice.js'


const signIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [login, {isLoading}, error] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value }); // Dynamically update the state based on input id
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signinStart());
      const res = await login(formData).unwrap();
      dispatch(signinSuccess(res));
      navigate('/'); // Redirect to home after successful sign in
    } catch (err) {
      console.error('Sign In Error:', err?.data?.message);
      toast.error("something went wrong, please try again");
      dispatch(signinFailure(err));
    }
  }



  return (
    <div className=' min-h-[50vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 items-center  bg-gray-50'>
      <div className="">
        <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col items-center justify-center">

        <h1 className='text-3xl font-bold text-center mb-6 text-slate-800'>Log in</h1>

        <form className='flex flex-col gap-4 items-center w-full  py-5'
          onSubmit={handleSubmit}>
   
          <Input
          type={"email"}  
          placeholder={"email"}
          id={"email"}
          value={formData.email}
          onChange={handleChange}
          />
          <Input
          type={"password"}
          placeholder={"password"}
          id={"password"}
          value={formData.password}
          onChange={handleChange}
          />
         
          <button type='submit' className=' w-[60%] lg:w-76 text-slate-800 font-medium  px-4 py-3 border border-gray-100 rounded-md shadow-md hover:opacity-50 focus:ring-2 focus:ring-gray-200  transition duration-200 cursor-pointer'>
           {
            isLoading ? 'logging...' : 'Log in'
           }    
          </button>

        </form>
        {error && <p className='text-red-500'>{error.data.message}</p>}
        <p className='text-gray-500'>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/signin')}>Login</span></p>
      </div>

      
    </div>
  )
}

export default signIn