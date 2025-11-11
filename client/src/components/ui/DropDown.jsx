import { useRef, useState} from "react";
import { Link } from "react-router-dom";
import { useClickOutside  } from "../../hooks/useClickOutside";
import { roleOptions } from "../../data/userRoles";
import { createPortal } from "react-dom";



const DropDown = ({ userRole, onOpen, onLogout, onSelect, triggerRef }) => {
  const dropDownRef = useRef(null);
   useClickOutside(dropDownRef,()=> onOpen(false));

  const handleSelect = (option) => {
    if (option.label === "Logout") {
      onLogout();
    } else if (onSelect) {
      onSelect(option);
    }
    onOpen(false);
  };
  const options = roleOptions[userRole] || [];


  return createPortal(
    <div
      className="fixed top-20 right-0  w-48 shadow-lg rounded-md z-[9999]  transition-all duration-200 ease-out"
      ref={dropDownRef}
      role="menu"
      aria-orientation="vertical"
    >
      <ul className="py-1 font-medium">
        {options.map((option, index) => (
          <li key={index} role="none">
            {option.path ? (
              <Link
                to={option.path}
              
                className={`flex gap-2 items-center px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 cursor-pointer`}
                role="menuitem"
                onClick={() => handleSelect(option)}
              >
                {option.icon}
                {option.label}
              </Link>
            ) : (
           
                <button
                onClick={() => handleSelect(option)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-left transition-colors"
                role="menuitem"
              >
                {option.icon}
                {option.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>,

    document.body
  );
};

export default DropDown;
