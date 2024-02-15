import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FcBusinessman, FcHome } from "react-icons/fc";
import { FaBlogger, FaCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { MdAddCircle } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl";

function MobileSideBar({ setIsOpenMobileSideBar }) {
  return (
    <div className="z-20 py-2 flex flex-col justify-center items-center gap-4  w-[250px] h-[calc(100vh-53px)] bg-[#286082]">
      <div className=" relative flex items-center gap-3">
        <SlArrowLeft
          onClick={() => setIsOpenMobileSideBar(false)}
          className="absolute  top-[-40px] right-[-65px] text-white font-bold text-2xl animate-bounce cursor-pointer"
        />
        <FcHome className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <NavLink
          onClick={() => setIsOpenMobileSideBar(false)}
          to="/contractor"
          className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
        >
          Home
        </NavLink>
      </div>
      <div className="flex items-center gap-3 ml-8">
        <MdAddCircle className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <NavLink
          onClick={() => setIsOpenMobileSideBar(false)}
          to="/contractor/creatblog"
          className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
        >
          Creat Post
        </NavLink>
      </div>
      <div
        onClick={() => setIsOpenMobileSideBar(false)}
        className="flex items-center gap-3 mr-2"
      >
        <FcBusinessman className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <NavLink
          to="/contractor/profile"
          className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
        >
          Profile
        </NavLink>
      </div>
      <div className="flex items-center gap-3 ml-3">
        <FaBlogger className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <NavLink
          onClick={() => setIsOpenMobileSideBar(false)}
          to="/contractor"
          className="text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400 "
        >
          All Posts
        </NavLink>
      </div>
      <div
        onClick={() => setIsOpenMobileSideBar(false)}
        className="flex items-center gap-3 ml-1"
      >
        <TbLogout className="text-3xl shadow-md shadow-orange-500 bg-white rounded-full p-[1px]" />
        <div className="flex items-center gap-3 text-white hover:bg-orange-400 px-4 py-[2px] rounded-lg text-xl border-2 border-gray-400">
          Logout
        </div>
      </div>
    </div>
  );
}

export default MobileSideBar;
