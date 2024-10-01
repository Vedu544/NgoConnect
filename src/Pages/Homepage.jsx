import React from 'react'
import Navbar from '../Components/Navbar'

const Homepage = ({ isLoggedIn, userType }) => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} userType={userType} /> {/* Pass userType to Navbar */}
      <div className='bg-green-50 h-screen text-black'>
        <div className='flex justify-center items-center'>
          <h1 className='text-green-600 text-2xl mt-4'>Welcome to NGO Connect</h1>
        </div>
      </div>
    </div>
  );
};

export default Homepage
