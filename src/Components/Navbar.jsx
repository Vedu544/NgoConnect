import React, { useState } from "react";
import Popup from "./Popup";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar = ({ isLoggedIn, userType }) => { // Accepting userType as a prop
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // New state for profile menu

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close popup function
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle profile menu visibility
  };

  console.log("isLoggedIn:", isLoggedIn, "userType:", userType); // Debugging line

  return (
    <div className="flex flex-col md:flex-row mb-3 mt-3 bg-green-300 p-2 mt[-">
      <div className="flex-grow-1 mt-2">
        <NavLink to={"/"} className="text-3xl font-bold text-green-600 ml-3 cursor-pointer">
          NGO Connect
        </NavLink>
      </div>

      <form className="max-w-md mx-auto" style={{ marginLeft: '20px' }}> 
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="w-[400px] p-4 ps-10 text-sm text-black border border-gray-400 rounded-lg bg-green-200"
            placeholder="Search Compaigns, Projects"
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>

      <div className="ml-auto mr-4 flex flex-col md:flex-row space-x-0 md:space-x-4 text-green-600 font-semibold">
        <button
          className="hover:bg-green-500 hover:p-3 hover:rounded-lg hover:text-white"
          onClick={togglePopup}
        >
          Login/Register
        </button>
      </div>
      {isPopupOpen && <Popup onClose={closePopup} />}
      {isLoggedIn && ( // Conditionally render profile icon if logged in
        <div className="relative">
          <button className="flex items-center" onClick={toggleProfileMenu}> 
            <FaUserCircle className="text-3xl text-green-600 mt-3 mr-3" />
          </button>
          {isProfileMenuOpen && ( // Conditionally render profile options
            <div className="absolute right-0 mt-6 w-48 bg-white shadow-lg rounded-md">
              {userType === 'ngo' ? ( // Check userType for NGO options
                <>
                  <NavLink to="/NgoProfile" className="block px-4 py-2 text-green-600 hover:bg-gray-200">Ngo Profile</NavLink>
                  <NavLink to="/add-campaign" className="block px-4 py-2 text-green-600 hover:bg-gray-200">Add Campaign</NavLink>
                  <NavLink to="/add-project" className="block px-4 py-2 text-green-600 hover:bg-gray-200">Add Project</NavLink>
                </>
              ) : ( // User options
                <NavLink to="/UserProfile" className="block px-4 py-2 text-green-600 hover:bg-gray-200">View My Profile</NavLink>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
