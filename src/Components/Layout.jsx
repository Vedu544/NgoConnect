import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default Layout;
