import React from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout  from "./pages/Layout";
import Navbar from './components/Navbar'
import SignUp from './pages/Auth/SignUp'
import SignIn from './pages/Auth/SignIn'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './pages/Footer';


const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
    <Navbar/>
     <Routes>
     <Route path='/' element={<Layout/>} />
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/signin' element={<SignIn/>}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App