import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { BiBell } from "react-icons/bi";

export const roleOptions = {
    user: [
      { label: "Account", path: "/account", icon: <MdAccountCircle /> },
      { label: "Settings", path: "/settings", icon: <IoMdSettings /> },
      { label: "Notifications", path: "/notifications", icon: <BiBell /> },
      { label: "Logout", path: null, icon: <FaSignOutAlt /> },
    ],
    admin: [
      { label: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> },
      { label: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
      { label: "Orders", path: "/admin/orders", icon: <IoMdSettings /> },
      { label: "Logout", path: null, icon: <FaSignOutAlt /> },
    ],
    guest: [
      { label: "Login", path: "/signin", icon: <MdAccountCircle /> },
      { label: "Register", path: "/signup", icon: <IoMdSettings /> },
    ],
  };