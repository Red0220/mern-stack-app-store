import { Link } from 'react-router-dom'
import { useState } from 'react'

import {  FaUser} from 'react-icons/fa'
import { FaBagShopping } from "react-icons/fa6";


const Navbar = () => {
  return (
    <div className='max-w-full h-20 rounded shadow-md flex  items-center px-4'>
        <div className=" w-full grid grid-cols-2  items-center text-slate-900">
            <h1 className='text-xl font-semibold'>Logo</h1>

           

            <div className="flex items-center gap-4 sm:gap-8 text-lg sm:text-xl text-slate-800 justify-end">
               

                <Link to={'/signup'} className='cursor-pointer hover:opacity-65'>
                 <FaBagShopping  title='shopping cart'/>
                </Link>
                <Link to={'/signup'} className='cursor-pointer hover:opacity-65'>
                <FaUser title='sign up to order.'/>
                </Link>
              
                
            </div>
        </div>

    </div>
  )
}

export default Navbar