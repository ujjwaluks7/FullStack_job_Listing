import React from "react";
import SideBar from "./SideBar";
// import TopNavBar from "../topnavbar/TopNavBar";

function Layout({ children }) {
  return (
    <div className="">
      {/* Mobile Navbar hidden on desktop  */}
      <div className=" md:hidden">
        this is top
        {/* <TopNavBar /> */}
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
