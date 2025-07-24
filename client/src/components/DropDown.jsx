import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DropDown = ({ userRole = "user", onOpen, onLogout, onSelect, to }) => {
  const dropDownRef = useRef(null);

  const roleOptions = {
    user: [
      { label: "Account", path: "/account" },
      { label: "Settings", path: "/settings" },
      { label: "Logout", path: null },
    ],
    admin: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Products", path: "/admin/products" },
      { label: "Orders", path: "/admin/orders" },
      { label: "Logout", path: null },
    ],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        onOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      <ul className="py-1">
        {options.map((option, index) => (
          <li key={index} role="none">
            {option.path ? (
              <Link
                to={option.path}
                key={index}
                className={`block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 cursor-pointer`}
                role="menuitem"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </Link>
            ) : (
              <span
                key={index}
                onClick={() => handleSelect(option)}
                className={`block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 cursor-pointer`}
                role="menuitem"
              >
                {option.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
