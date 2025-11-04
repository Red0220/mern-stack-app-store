import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/Api/auth.slice.js";
import {
  signOutFailure,
  signOutSuccess,
} from "../redux/userSlice/user.slice.js";

import DropDown from "./ui/DropDown";

const Navbar = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [logout] = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("Current User:", user);

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
    

      dispatch(signOutSuccess());

      navigate("/signin");
      toast.success(res.message);

      setIsOpen(false);

    } catch (error) {
      
      console.error("Logout failed:", error);

      dispatch(signOutFailure(error));
    }
  };
  const handleSelect = (option) => {
    setIsOpen(false);
    if(option.path) {
      navigate(option.path);
    }
  }
  return (
    <div className="max-w-full h-20 rounded shadow-md flex  items-center px-4">
      <div className=" w-full grid grid-cols-2  items-center text-slate-900">
        <Link to="/">
          <h1 className="text-xl font-semibold">Logo</h1>
        </Link>

        <div className="flex  items-center gap-4 sm:gap-6 text-lg sm:text-xl text-slate-800 justify-end">
          <Link to={"/signup"} className="cursor-pointer hover:opacity-65">
            <FaBagShopping title="shopping cart" size={26} />
          </Link>

          {user ? (
            <div className="relative " ref={dropDownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="pt-2 hover:opacity-65 transition-opacity focus:outline-none cursor-pointer"
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={isOpen}
                title={`${user?.username}'s profile`}
              >
                <img
                  src={user?.avatar}
                  alt={`${user?.username}'s avatar`}
                  className="w-6 h-6 object-cover rounded-full ring-2 ring-gray-300"
                />
              </button>
            </div>
          ) : (
            <Link to={"/signin"} className="text-xl cursor-pointer hover:opacity-65">
              <FaUser title="user profile" />
            </Link>
          )}
          {isOpen && (
            <DropDown
              userRole={user?.isAdmin ? "admin" : "user"}
              onOpen={setIsOpen}
              onLogout={handleLogout}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
