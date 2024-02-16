import React, { useContext, useEffect, useState } from "react";
import { fetchLabourProfile } from "../../API/apiCall";
// import { contex } from "../../contex/ContexApi";
import Spinner from "../../components/spinner/Spinner";
import {
  AiOutlineMail,
  AiOutlineComment,
  AiOutlineNumber,
} from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { BsCalendarCheck } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LabourProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const token = localStorage.getItem("shramik_token");
    setLoader(true);
    const response = await fetchLabourProfile({
      authorization: `Bearer ${token}`,
    });
    if (response.success === true) {
      setUserData(response.data);
      setLoader(false);
    } else if (response.message === "jwt expired") {
      toast.error(response.message);
      localStorage.removeItem("shramik_token");
      localStorage.removeItem("shramik_role");
      setLoader(false);
      navigate("/login");
    } else {
      toast.error(response.message);
      setLoader(false);
    }
  }

  return (
    <div>
      <h2 className="text-center py-4 text-3xl font-bold">Profile</h2>
      {loader ? (
        <div className="flex items-center justify-center h-[10vw] w-full">
          <Spinner />
        </div>
      ) : (
        <div>
          {userData ? (
            <div className="flex flex-col items-center gap-3 shadow-lg shadow-gray-400 rounded-lg p-6">
              <div>
                {/* <img className="w-[150px]" src={avatar} alt="" /> */}
                <p className="flex items-center gap-2">
                  <span>
                    <RxAvatar className="text-3xl" />
                  </span>
                  <span className=" font-bold text-blue-600">
                    Name : {userData.name}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-2">
                  <span>
                    <AiOutlineMail className="text-3xl" />
                  </span>
                  <span>Email : {userData.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <AiOutlineNumber className="text-3xl" />
                  </span>
                  <span>ID : {userData._id}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <FaBlogger className="text-3xl" />
                  </span>
                  {/* <span>Total Blogs : {userData.blogs.length}</span> */}
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <FcLike className="text-3xl" />
                  </span>
                  {/* <span>
                      Total Favourite Blogs : {userData.favourites.length}
                    </span> */}
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <BsCalendarCheck className="text-3xl" />
                  </span>
                  <span>
                    Account created date : {userData.createdAt.split("T")[0]}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <h2>Labour not found</h2>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default LabourProfile;
