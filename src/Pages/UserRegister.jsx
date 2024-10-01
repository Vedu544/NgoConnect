import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

const NGORegister = () => {
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (files[0]) {
        const file = files[0];
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
          alert("Please upload a valid image file (JPG or PNG).");
          return;
        }
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
        setFileNames((prev) => ({ ...prev, [name]: file.name }));
      }
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Basic required fields validation
    if (!formData.fname) newErrors.fname = "Name is required.";
    if (!formData.mname) newErrors.mname= "middle Name is required.";
    if (!formData.lname) newErrors.lname = "last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.phone) newErrors.phone = "phone no. is required.";

    // Email validation
    if (
      formData.email &&
      !/^[\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Email format is invalid.";
    }

    // Phone number validation (basic international format)
    if (
      formData.phone &&
      !/^\+?[1-9]\d{1,14}$/.test(formData.phone)
    ) {
      newErrors.phone = "Phone number format is invalid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const form = new FormData();
      // Ensure the correct formData is being appended
      form.append("fname", formData.fname); // Ensure this is not empty
      form.append("mname", formData.mname); // Corrected key from "Mname" to "mname"
      form.append("lname", formData.lname); // Corrected key from "Lname" to "lname"
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("password", formData.password);
      form.append("confirmPassword", formData.confirmPassword);

      // Append files if they exist
      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }
      if (formData.coverImage) {
        form.append("coverImage", formData.coverImage);
      }

      try {
        console.log(form);
        // Log FormData entries
        for (const [key, value] of form.entries()) {
          console.log(`${key}:`, value);
        }
        const response = await fetch(
          "https://team23-ngo-backend.onrender.com/api/v1/user/register",
          {
            method: "POST",
            body: form, // Changed from formData to form
          }
        );
        console.log(response);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Registration successful: ", data);
        toast.success("Registration successful!");

        // Clear the form fields
        setFormData({
          fname: "",
          mname: "",
          lname: "",
          email:"",
          phone:"",
          password: "",
          confirmPassword: "",
        });

        // Reset file names to default
        setFileNames({
          avatar: "No file chosen",
          coverImage: "No file chosen",
        });
      } catch (error) {
        console.error("Registration failed: ", error);
        const errorResponse = JSON.parse(error.message);
        if (
          errorResponse.message.includes(
            "NGO with the provided email or registration number already exists"
          )
        ) {
          toast.error(
            "An NGO with this email or registration number is already registered. Please use a different one."
          );
        } else if (
          errorResponse.message.includes("E11000 duplicate key error")
        ) {
          toast.error(
            "This NGO name is already registered. Please choose a different name."
          );
        } else {
          toast.error("Registration failed: " + errorResponse.message);
        }
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 bg-green-100 rounded-lg shadow-lg space-y-6 mt-4"
      >
        <h1 className="text-4xl font-semibold text-green-600 mb-4">
          Register User
        </h1>
        <p className="text-red-600 mb-4">
          All fields marked with ' * ' are required.
        </p>

        {/* Basic Information Section */}
        <section className="border p-4 rounded-lg shadow-inner bg-white">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Basic Information
          </h2>
          <div className="grid gap-4">
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
              <div className="w-full mb-4 md:mb-0">
                <label className="block text-gray-700">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.fname && (
                  <span className="text-red-500">{errors.fname}</span>
                )}
              </div>

              <div className="w-full">
                <label className="block text-gray-700">
                  Middle Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="mname"
                  value={formData.mname}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.mname && (
                  <span className="text-red-500">
                    {errors.mname}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full mb-4 md:mb-0">
                <label className="block text-gray-700">
                  Last name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.lname && (
                  <span className="text-red-500">{errors.lname}</span>
                )}
              </div>

              <div className="w-full">
                <label className="block text-gray-700">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        

        {/* Password Section */}
        <section className="border p-4 rounded-lg shadow-inner bg-white">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Password
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone}</span>
              )}
            </div>
          </div>
        </section>
        
        <div className="mt-3">
        <NavLink to ={"/UserLogin"}
        className={"text-xl text-green-800 font-semibold underline"}>
        Alreday A NGO-Member ? Please Login Now.
        </NavLink>
        </div>
       

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default NGORegister;
