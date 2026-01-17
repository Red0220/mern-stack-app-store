import { useState } from 'react'
import { toast} from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useSignUpMutation } from '../../redux/Api/auth.slice.js'
import { signinStart, signinFailure, signOutSuccess, signinSuccess} from '../../redux/userSlice/user.slice.js'

import Input from "../../components/ui/Input"
import Button from '../../components/ui/Button'

const SignUp = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, {isLoading, error}] = useSignUpMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

 const handleChange = (e) => {
    const { id, value } = e.target; 
    setFormData({...formData, [id]: value }); // Dynamically update the state based on input id
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== confirmPassword) {
     toast.error("Passwords do not match");
      return;
    }

    try {
      dispatch(signinStart());
      const res = await signUp(formData).unwrap();

      dispatch(signinSuccess())
      
      navigate('/signin'); // Redirect to login after successful sign up
    } catch (err) {
      dispatch(signinFailure(err));
      console.error('Sign Up Error:', err);
      toast.error('Sign Up failed. Please try again.');
    }
  }


    // logs
    console.log('Form Data:', formData);


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 items-center  bg-gray-50'>
      <div className="">
        <p className='text-center font-semibold text-2xl text-slate-900 space-x-1'>Hello! Register so you can order</p>
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col items-center justify-center">

        <h1 className='text-3xl font-semibold text-center mb-6 text-slate-800'>Sign Up</h1>

        <form className='flex flex-col gap-4 items-center w-full  py-5'
          onSubmit={handleSubmit}>
          
          <Input
          type={"text"}
          placeholder={"username"}
          id={"username"}
          value={formData.username}
          onChange={handleChange}
          />
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
          <Input 
          type={"password"}
          placeholder={"confirm password"}
          id={"confirmPassword"}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          />
          <Button type='submit'>
           {
            isLoading ? 'Signing Up...' : 'Sign Up'
           }    
          </Button>

        </form>
        {error && <p className='text-red-500'>{error?.data?.message}</p>}
        <p className='text-gray-500'>You already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/signin')}>Login</span></p>
      </div>

      
    </div>
  )
}

export default SignUp