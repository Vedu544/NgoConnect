import React from 'react'
import { FaTimes } from 'react-icons/fa'; 
import { NavLink } from "react-router-dom"; 

const Popup = ({ onClose }) => { 


  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-white p-9 rounded shadow-lg relative'>
        <button onClick={onClose} className='absolute top-2 right-2'>
          <FaTimes />
        </button>
        <h1 className='text-lg font-bold'>Choose a way to <br></br>
          Create or Login account</h1>

        <div className='mt-6 justify-center font-bold w-full'>
          <NavLink to={"/NgoRegister"}
          className='bg-green-500 text-white p-3 rounded block w-full text-center'>NGO Member
          </NavLink>
        </div>

        <div className='mt-4 flex justify-center font-bold'> 
          <NavLink to={"/UserRegister"}
           className='bg-green-500 text-white p-2 rounded w-full'>User
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Popup
