import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { roleOptions } from "../data/userRoles";



const DropDown = ({ userRole, onOpen, onLogout, onSelect }) => {
  const dropDownRef = useRef(null);

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        onOpen(false);
      }
    };

    const handleEscape = (e) => {
      if(e.key === 'Escape') {
        onOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onOpen]);

  const handleSelect = (option) => {
    if (option.label === "Logout") {
      onLogout();
    } else if (onSelect) {
      onSelect(option);
    }
    onOpen(false);
  };
  const options = roleOptions[userRole] || [];


  return (
    <div
      className="absolute right-0 top-20 w-48 shadow-lg rounded-md z-50 transform transition-all duration-200 ease-out origin-top-right"
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
    </div>
  );
};

export default DropDown;
