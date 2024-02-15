import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import MobileHeader from "../mobileHeader/MobileHeader";
import avatarIcon from "../../assets/avatar_icon.png";
import { getUserInfo } from "../../API/apiCall";
import SmallModal from "../smallModal/SmallModal";

function Header() {
  const [isOpenMobileManu, setIsOpenMobileManu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkIsLogin();
  }, []);

  async function checkIsLogin() {
    const token = localStorage.getItem("shramik_token");
    if (token) {
      const response = await getUserInfo({ authorization: `Bearer ${token}` });
      console.log(response);
      setIsLogin(response.data);
    } else {
      setIsLogin(false);
    }
  }

  function handelOpenSmallModal() {
    setIsOpen(true);
  }

  return (
    <div className=" justify-center">
      <div className="  z-40 bg-white md:px-[50px] py-2 px-[10px]  shadow-md shadow-gray-300 sticky top-0">
        <div className="hidden md:flex justify-between items-center ">
          <NavLink to="/">
            <img className="w-[50px]" src={logo} alt="" />
          </NavLink>
          <div className="flex items-center gap-4 font-semibold">
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
            {isLogin ? (
              <div className="flex items-center gap-3 relative">
                <p>{isLogin?.name}</p>
                <img
                  onClick={handelOpenSmallModal}
                  className="w-[40px] cursor-pointer"
                  src={isLogin?.profilePic}
                  alt="avatar image"
                />
                <div className="absolute top-11 left-10">
                  <SmallModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    role={isLogin.role}
                  />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <MobileHeader
            isOpenMobileManu={isOpenMobileManu}
            setIsOpenMobileManu={setIsOpenMobileManu}
            isLogin={isLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
