import  { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

import Footer from "./pages/Footer";

import UserForbidden from "./util/UserForbidden";
import AdminRoute from './util/AdminRoute'
import ErrorBoundary from "./util/ErrorBoundary";

const Layout = lazy(() => import("./pages/Layout"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const AddProduct = lazy(() => import("./pages/product/AddProduct"));
const DashBoard = lazy(() => import("./components/dashboard/DashBoard"));
const ProductPage = lazy(() => import("./pages/admin/ProductPage"));

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<div className="text-center py-10">Loading...</div>}>

              <Routes>
                <Route path="/" element={<Layout />} />
                {/* User */}
                <Route element={<UserForbidden />}>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                </Route>
                {/* Dashboard */}
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path='/product-details/:id' element={<ProductPage />} />
                {/* Admin */}
                <Route element={<AdminRoute />}>
                  <Route path="addproduct" element={<AddProduct />} />

                </Route>

              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
