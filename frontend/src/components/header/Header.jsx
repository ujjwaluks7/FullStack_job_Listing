import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import MobileHeader from "../mobileHeader/MobileHeader";

function Header() {
  const [isOpenMobileManu, setIsOpenMobileManu] = useState(false);

  return (
    <div className=" z-40 bg-white md:px-[50px] py-2 px-[10px]  shadow-md shadow-gray-300 sticky top-0">
      <div className="hidden md:flex justify-between items-center ">
        <NavLink to="/">
          <img className="w-[50px]" src={logo} alt="" />
        </NavLink>
        <div className="flex gap-4 font-semibold">
          <NavLink
            className="hover:shadow-md hover:shadow-gray-600 px-2 py-1 rounded-lg"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="hover:shadow-md hover:shadow-gray-600 px-2 py-1 rounded-lg"
            to="/"
          >
            Daily works
          </NavLink>
          <NavLink
            className="hover:shadow-md hover:shadow-gray-600 px-2 py-1 rounded-lg"
            to="/"
          >
            Service
          </NavLink>

          <button className="hover:shadow-md hover:shadow-gray-600 px-2 py-1 rounded-lg">
            Language
          </button>
          <NavLink
            className="border-2 border-blue-600 text-blue-700 px-4 py-1 rounded-2xl"
            to="/login"
          >
            Login
          </NavLink>
          <button
            className="px-2 py-1 bg-red-500 rounded-2xl text-white"
            to="/"
          >
            Registration
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <MobileHeader
          isOpenMobileManu={isOpenMobileManu}
          setIsOpenMobileManu={setIsOpenMobileManu}
        />
      </div>
    </div>
  );
}

export default Header;
