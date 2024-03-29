import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import SmallModal from "../smallModal/SmallModal";
import avatar from "../../assets/avatar_icon.png";
import SmallRegisterModal from "../../pages/registration/SmallRegisterModal";

function MobileHeader({ isOpenMobileManu, setIsOpenMobileManu, isLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLeftModal, setIsOpenLeftModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisteModal] = useState(false);

  function handelOpenSmallModal() {
    setIsOpen(true);
  }

  function handelOpenSmallLeftModal() {
    setIsOpenLeftModal(true);
  }

  function handleOpenRegisterModal() {
    setIsOpenRegisteModal(true);
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <FaBars
          onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
          className="text-2xl cursor-pointer relative"
        />
        <div
          className={`absolute duration-500 ease-in-out z-20 ${
            isOpenMobileManu ? "left-0" : "left-[-300px]"
          } top-0 w-[300px] bg-gray-100 h-[100vh]`}
        >
          <div className="font-bold mt-8 flex flex-col gap-5 items-center">
            <div className="absolute top-14 right-0">
              <SmallModal
                isOpen={isOpenLeftModal}
                setIsOpen={setIsOpenLeftModal}
                role={isLogin?.role}
              />
            </div>
            <IoClose
              onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
              className="text-3xl cursor-pointer absolute right-2 top-2 "
            />
            {isLogin ? (
              <img
                onClick={handelOpenSmallLeftModal}
                className="w-[40px] cursor-pointer"
                src={avatar}
                alt="avatar image"
              />
            ) : (
              <>
                <NavLink
                  className="border-2 border-blue-600 text-blue-700 px-4 py-1 rounded-2xl"
                  to="/login"
                  onClick={() => setIsOpenMobileManu(!isOpenMobileManu)}
                >
                  Login
                </NavLink>
                <button
                  onClick={handleOpenRegisterModal}
                  className="px-4 py-1 bg-red-500 rounded-2xl text-white"
                >
                  Registration
                </button>
                <div className="absolute top-28 right-0">
                  <SmallRegisterModal
                    isOpenRegisterModal={isOpenRegisterModal}
                    setIsOpenRegisteModal={setIsOpenRegisteModal}
                  />
                </div>
              </>
            )}
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
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {isLogin ? (
          <div className="flex items-center gap-2 relative">
            <p className="font-bold">{isLogin?.name}</p>
            <img
              onClick={handelOpenSmallModal}
              className="w-[40px] cursor-pointer"
              src={avatar}
              alt="avatar image"
            />

            <div className="absolute top-10 left-10">
              <SmallModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                role={isLogin?.role}
              />
            </div>
          </div>
        ) : (
          <NavLink
            className="border-2 border-blue-600 text-blue-700 px-5 py-1 rounded-2xl"
            to="/login"
          >
            Login
          </NavLink>
        )}
        <img className="w-[40px]" src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default MobileHeader;
