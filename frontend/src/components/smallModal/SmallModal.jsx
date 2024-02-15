import React, { useState, useRef, useEffect, memo } from "react";
import { NavLink } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

const SmallModal = ({ isOpen, setIsOpen, role }) => {
  const modalRef = useRef();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="relative" ref={modalRef}>
      {isOpen && (
        <div className=" w-[150px] shadow-md flex items-center justify-center">
          <div className="bg-white rounded-lg px-3 py-5 max-w-md">
            <div className="flex items-center flex-col gap-3">
              <NavLink
                to={`${
                  role === "Contractor"
                    ? "/contractor/profile"
                    : "/labour/profile"
                }`}
                className="text-gray-700 font-bold flex items-center gap-1 hover:shadow-md hover:shadow-gray-600 hover:px-2 py-1 rounded-lg"
                onClick={closeModal}
              >
                <RxAvatar />
                Profile
              </NavLink>
              <button
                className=" bg-red-500 rounded-lg text-white px-3 py-1 flex items-center gap-2"
                onClick={closeModal}
              >
                <IoIosLogOut />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// export default Modal;

export default memo(SmallModal);

// export default SmallModal;
