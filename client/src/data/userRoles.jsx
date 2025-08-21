import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { BiBell } from "react-icons/bi";

export const roleOptions = {
    user: [
      { label: "Account", path: "/dashboard?tab=profile", icon: <MdAccountCircle /> },
      { label: "Notifications", path: "/notifications", icon: <BiBell /> },
      { label: "Settings", path: "/settings", icon: <IoMdSettings /> },
      { label: "Logout", path: null, icon: <FaSignOutAlt /> },
    ],
    admin: [

      { label: "Add Product", path: "/dashboard?tab=AddProduct", icon: <IoAddCircle /> },
      { label: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      { label: "Products", path: "/dashboard?tab=products", icon: <FaBoxOpen /> },
      { label: "Orders", path: "/dashboard?tab=orders", icon: <IoMdSettings /> },
      { label: "Logout", path: null, icon: <FaSignOutAlt /> },
    ],
    guest: [
      { label: "Login", path: "/signin", icon: <MdAccountCircle /> },
      { label: "Register", path: "/signup", icon: <IoMdSettings /> },
    ],
  };