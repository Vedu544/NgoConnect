import React, { useState } from "react"; 
import Navbar from "../Components/Navbar"; // Ensure this import is correct
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie

const UserLogin = ({ setIsLoggedIn, setUserType }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => { 
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('https://team23-ngo-backend.onrender.com/api/v1/user/login', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const responseBody = await response.text(); 
        if (!response.ok) {
          throw new Error(`Login failed: ${responseBody}`); 
        }
        const data = JSON.parse(responseBody); 
        toast.success("Login successful!"); 
        setIsLoggedIn(true);
        setUserType("user"); // Set userType to 'user'
        
        // Store the token in cookies with a specific path
        Cookies.set('accessToken', data.accessToken, { expires: 7, path: '/' }); // Ensure path is set to '/'

        setTimeout(() => navigate('/'), 2000);
      } catch (error) {
        toast.error("Login failed: " + error.message); 
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <>
      <Navbar isLoggedIn={true} userType="user" /> {/* Ensure userType is set to 'user' */}
      <div className="h-screen bg-green-50 text-green-900">
        <section className="bg-green-50 text-green-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white text-green-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-green-900">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}> {/* Updated form */}
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-900">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email} // Updated value
                      onChange={handleChange} // Added onChange
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      required
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>} {/* Error message */}
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-green-900">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password} // Updated value
                      onChange={handleChange} // Added onChange
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                    {errors.password && <span className="text-red-500">{errors.password}</span>} {/* Error message */}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-green-900 bg-green-400 p-4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  <p className="text-md font-light text-green-900">
                    Don’t have an account yet?{" "}
                    <NavLink
                      to={"/UserRegister"}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer /> {/* Added ToastContainer */}
    </>
  );
};

export default UserLogin;
