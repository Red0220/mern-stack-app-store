import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Navbar from "./components/Navbar";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./pages/Footer";

import UserForbidden from "./util/UserForbidden";
import AdminRoute from './util/AdminRoute'
import AddProduct from "./pages/product/AddProduct"
import DashBoard from "./components/dashboard/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
         <Routes>
        <Route path="/" element={<Layout />} />
        {/* User */}
        <Route element={<UserForbidden />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        {/* Dashboard */}
        <Route path="/dashboard" element={<DashBoard />} />
         
         {/* Admin */}
         <Route element={<AdminRoute />}>
         <Route path="addproduct" element={<AddProduct/>}/>
         
         </Route>

      </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
