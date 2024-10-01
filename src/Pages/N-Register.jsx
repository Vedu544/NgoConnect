import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

const NGORegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contact: {
      phone: "",
      email: "",
      social_media: {
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
      },
    },
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    website: "",
    registrationNumber: "",
    projects: [],
    campaigns: [],
    avatar: null,
    coverImage: null,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [fileNames, setFileNames] = useState({
    avatar: "No file chosen",
    coverImage: "No file chosen",
  });

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
    if (!formData.name) newErrors.name = "NGO Name is required.";
    if (!formData.registrationNumber)
      newErrors.registrationNumber = "Registration Number is required.";
    if (!formData.contact.phone) newErrors.phone = "Phone number is required.";
    if (!formData.contact.email) newErrors.email = "Email is required.";
    if (!formData.website) newErrors.website = "Website is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.address.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required.";
    if (!formData.address.city) newErrors.city = "City is required.";
    if (!formData.address.state) newErrors.state = "State is required.";
    if (!formData.address.country) newErrors.country = "Country is required.";
    if (!formData.address.postalCode)
      newErrors.postalCode = "Postal Code is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    // Email validation
    if (
      formData.contact.email &&
      !/^[\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/.test(
        formData.contact.email
      )
    ) {
      newErrors.email = "Email format is invalid.";
    }

    // Phone number validation (basic international format)
    if (
      formData.contact.phone &&
      !/^\+?[1-9]\d{1,14}$/.test(formData.contact.phone)
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
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("email", formData.contact.email);
      form.append("phone", formData.contact.phone);
      form.append("registrationNumber", formData.registrationNumber);
      form.append("addressLine1", formData.address.addressLine1);
      form.append("addressLine2", formData.address.addressLine2);
      form.append("city", formData.address.city);
      form.append("state", formData.address.state);
      form.append("country", formData.address.country);
      form.append("postalCode", formData.address.postalCode);
      form.append("website", formData.website);
      form.append("password", formData.password);
      form.append("confirmPassword", formData.confirmPassword);
      form.append("facebook", formData.contact.social_media.facebook);
      form.append("twitter", formData.contact.social_media.twitter);
      form.append("linkedin", formData.contact.social_media.linkedin);
      form.append("instagram", formData.contact.social_media.instagram);

      // Append files if they exist
      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }
      if (formData.coverImage) {
        form.append("coverImage", formData.coverImage);
      }

      try {
        console.log(form);
        const response = await fetch(
          "https://team23-ngo-backend.onrender.com/api/v1/ngo/register",
          {
            method: "POST",
            body: form,
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
          name: "",
          description: "",
          contact: {
            phone: "",
            email: "",
            social_media: {
              facebook: "",
              twitter: "",
              linkedin: "",
              instagram: "",
            },
          },
          address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
          },
          website: "",
          registrationNumber: "",
          projects: [],
          campaigns: [],
          avatar: null,
          coverImage: null,
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
          Register NGO
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
                  NGO Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}
              </div>

              <div className="w-full">
                <label className="block text-gray-700">
                  Registration Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.registrationNumber && (
                  <span className="text-red-500">
                    {errors.registrationNumber}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full mb-4 md:mb-0">
                <label className="block text-gray-700">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone}</span>
                )}
              </div>

              <div className="w-full">
                <label className="block text-gray-700">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Website <span className="text-red-600">*</span>
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              {errors.description && (
                <span className="text-red-500">{errors.description}</span>
              )}
            </div>
          </div>
        </section>

        {/* Social Media Links Section */}
        <section className="border p-4 rounded-lg shadow-inner bg-white">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Social Media Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["facebook", "twitter", "linkedin", "instagram"].map(
              (platform) => (
                <div key={platform} className="mb-4">
                  <label className="block text-gray-700 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    name={`contact.social_media.${platform}`} // Corrected syntax
                    value={formData.contact.social_media[platform]}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              )
            )}
          </div>
        </section>

        {/* Address Section */}
        <section className="border p-4 rounded-lg shadow-inner bg-white">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "addressLine1",
              "addressLine2",
              "city",
              "state",
              "country",
              "postalCode",
            ].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700 capitalize">
                  {field}{" "}
                  {field !== "addressLine2" && (
                    <span className="text-red-600">*</span>
                  )}
                </label>
                <input
                  type="text"
                  name={`address.${field}`} // Corrected syntax
                  value={formData.address[field]}
                  onChange={handleChange}
                  required={field !== "addressLine2"}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Avatar Section */}
        <section className="border p-4 rounded-lg shadow-inner bg-white">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Avatar</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Avatar</label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <span className="text-gray-500">
              Selected file: {fileNames.avatar}
            </span>
          </div>
        </section>

        {/* Cover Image Section */}
        <section className="border p-4 rounded-lg shadow-inner bg-white">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Cover Image
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <span className="text-gray-500">
              Selected file: {fileNames.coverImage}
            </span>
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
          </div>
        </section>
        
        <div className="mt-3">
        <NavLink to ={"/NgoLogin"}
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
