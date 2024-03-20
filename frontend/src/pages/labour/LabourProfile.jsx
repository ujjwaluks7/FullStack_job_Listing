import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar_icon.png";
import toast, { Toaster } from "react-hot-toast";
import { MdDateRange, MdOutlineEmail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaRegAddressBook, FaPhone, FaEdit } from "react-icons/fa";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { Link } from "react-router-dom";
import { fetchLabourProfile } from "../../API/apiCall";
import LabourUpdateProfile from "./LabourUpadteProfile";
import Spinner from "../../components/spinner/Spinner";

import { useNavigate } from "react-router-dom";

function LabourProfile() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const token = localStorage.getItem("shramik_token");
    if (token) {
      try {
        const response = await fetchLabourProfile({
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
        if (response.success == true) {
          setProfileData(response.data);
        } else if (response.message === "jwt expired") {
          toast.error(response.message);
          localStorage.removeItem("shramik_token");
          localStorage.removeItem("shramik_role");
          navigate("/login");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      {loader ? (
        <div className="h-[40vh] flex items-center">
          <Spinner />
        </div>
      ) : (
        <div className="m-auto my-5 md:w-[50vw] w-[90vw]  shadow-lg rounded-md p-4  shadow-gray-300">
          <div className="flex justify-center relative">
            <img
              className=" w-[200px]"
              style={{ clipPath: "circle()" }}
              src={avatar}
              alt="profile image"
            />
            <p className="cursor-pointer absolute bottom-[50px] left-[60%]">
              <FaEdit className=" text-white text-3xl" />
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-3">
                <RxAvatar className="text-3xl" />
                <p>Name:-</p>
              </div>
              <p>{profileData.name}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-3">
                <MdOutlineEmail className="text-3xl" />
                <p>Email :- </p>
              </div>
              <p>{profileData.email}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-2xl" />
                <p>Phone :- </p>
              </div>
              <p>{profileData.phone}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-3">
                <RxAvatar className="text-3xl" />
                <p>Gander :- </p>
              </div>
              <p>{profileData.gender}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-2">
                <RxAvatar className="text-3xl" />
                <p>Age :- </p>
              </div>
              <p>{profileData.age}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-3">
                <FaRegAddressBook className="text-2xl" />
                <p>Address :- </p>
              </div>
              <p>{profileData?.address}</p>
            </div>

            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-3">
                <GiSkills className="text-2xl" />
                <p>Skill :- </p>
              </div>
              <p>{profileData?.skill}</p>
            </div>

            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-2">
                <BsFileEarmarkPostFill className="text-3xl" />
                <Link className="text-blue-500 cursor-pointer">
                  Toatal Applied :-
                </Link>
              </div>
              <p>{profileData.applayed?.length}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-3">
                <MdDateRange className="text-3xl" />
                <p>Date :- </p>
              </div>
              <p>{profileData.createdAt?.split("T")[0]}</p>
            </div>
          </div>
          <div className="flex justify-center my-4">
            <button
              onClick={() => setShowModal(!showModal)}
              className="bg-blue-500 px-5 py-2 rounded-lg text-white font-bold"
            >
              Edit Profile
            </button>
          </div>
          {showModal && (
            <LabourUpdateProfile
              showModal={showModal}
              setShowModal={setShowModal}
              profileData={profileData}
              setProfileData={setProfileData}
            />
          )}
        </div>
      )}
    </>
  );
}

export default LabourProfile;
