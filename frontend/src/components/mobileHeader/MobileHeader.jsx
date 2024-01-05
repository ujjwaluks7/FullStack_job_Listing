import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";

import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
function MobileHeader({ isOpenMobileManu, setIsOpenMobileManu }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <FaBars
          onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
          className="text-2xl cursor-pointer relative"
        />
        <div
          className={`absolute duration-500 ease-in-out ${
            isOpenMobileManu ? "left-0" : "left-[-300px]"
          } top-0 w-[300px] bg-gray-100 h-[100vh]`}
        >
          <div className="font-bold mt-8 flex flex-col gap-5 items-center">
            <IoClose
              onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
              className="text-3xl cursor-pointer absolute right-2 top-2 "
            />
            <NavLink
              className="border-2 border-blue-600 text-blue-700 px-4 py-1 rounded-2xl"
              to="/login"
              onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
            >
              Login
            </NavLink>
            <button
              className="px-4 py-1 bg-red-500 rounded-2xl text-white"
              to="/"
            >
              Registration
            </button>
            <NavLink
              className="hover:shadow-md hover:shadow-gray-600 px-2 py-1 rounded-lg"
              to="/"
              onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
            >
              Home
            </NavLink>
            <NavLink
              className="hover:shadow-md hover:shadow-gray-600 px-2 py-1 rounded-lg"
              to="/"
              onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
            >
              Daily works
            </NavLink>
            <NavLink
              className="hover:shadow-md hover:shadow-gray-600 px-2 py-1 rounded-lg"
              to="/"
              onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
            >
              Service
            </NavLink>
            <button className="hover:shadow-md hover:shadow-gray-600 px-2 py-1 rounded-lg">
              Language
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <NavLink
          className="border-2 border-blue-600 text-blue-700 px-5 py-1 rounded-2xl"
          to="/login"
        >
          Login
        </NavLink>
        <img className="w-[40px]" src={logo} alt="" />
      </div>
    </div>
  );
}

export default MobileHeader;
