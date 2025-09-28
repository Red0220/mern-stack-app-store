import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../util/firebase/firebase.js'

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    signinStart,
    signinSuccess,
    signinFailure } from '../../redux/userSlice/user.slice.js'
    import { useGoogleAuthMutation } from '../../redux/Api/auth.slice.js'

import Button from '../../components/ui/Button';


const GoogleAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [googleAuth, {isLoading}] = useGoogleAuthMutation();

    const handleGoogleSignIn = async () => {
       try {
        dispatch(signinStart());

        const provider = new GoogleAuthProvider();
        const rsltFromGoogle = await signInWithPopup(auth, provider);

        const {
          displayName: name,
          email,
          photoURL: googlePic,
        } = rsltFromGoogle.user;
        
        const res = await googleAuth({
            name,
            email,
            googlePic
        }).unwrap();
         console.log(res);
        if(res.success){
            dispatch(signinSuccess(res.user))
            navigate('/')
        }
    
       } catch (error) {
         dispatch(signinFailure(error))
       }
      }
    
  return (
    <Button  onClick={handleGoogleSignIn} disabled={isLoading} 
    >
      
      <span className='flex items-center gap-4 ml-4'>{ !isLoading ? <><FcGoogle size={24} />  continue with Google</>  : 'Sign in...' }</span>
    </Button>
  )
}

export default GoogleAuth