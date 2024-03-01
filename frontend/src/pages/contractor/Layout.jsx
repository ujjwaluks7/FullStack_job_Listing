import React, { useState } from "react";
import SideBar from "./SideBar";
import MobileSideBar from "./MobileSideBar";
import { SlArrowRight } from "react-icons/sl";

function Layout({ children }) {
  const [isOpenMobileSidebar, setIsOpenMobileSideBar] = useState(false);
  return (
    <div className="">
      {/* Mobile Navbar hidden on desktop  */}
      <div className=" md:hidden">
        <div
          className={` top-0 absolute transition-all duration-300 ${
            isOpenMobileSidebar ? "left-[0px]" : "left-[-250px]"
          }`}
        >
          <MobileSideBar setIsOpenMobileSideBar={setIsOpenMobileSideBar} />
        </div>
        <SlArrowRight
          onClick={() => setIsOpenMobileSideBar(true)}
          className=" text-blue-600  text-2xl mt-2 cursor-pointer"
        />
      </div>

      <div className=" max-h-screen flex">
        {/* sidebar hidden on mobile */}
        <div className=" hidden md:block">
          <SideBar />
        </div>
        {/* main content */}
        <main className="flex-1 min-w-0 overflow-auto">
          <div className=" flex justify-center">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
