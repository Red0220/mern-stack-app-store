import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "./Sidebar";

const SidebarItems = ({ icon, text, to, active }) => {
    const { expanded } = useContext(SidebarContext); 
  return (
    <li
      className={` relative flex gap-2 items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-gray-200 opacity-80" : ""
      } `}
    >
      <Link to={to} className={` text-xl text-slate-700 ${expanded ? "" : "mx-auto"}`}>
        {icon}
      </Link>
      <Link to={to}
       className={`overflow-hidden transition-all ${expanded ? 'w-40' : "w-0" }`}>
        {text}
      </Link>
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-3 ml-6 text-slate-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
};

export default SidebarItems;
