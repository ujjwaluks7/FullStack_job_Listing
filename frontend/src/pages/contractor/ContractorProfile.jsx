import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { MdDateRange, MdOutlineEmail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaRegAddressBook, FaPhone, FaEdit } from "react-icons/fa";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ContractorUpdateProfile from "./ContractorUpadteProfile";
import { contractorProfile } from "../../API/apiCall";
import Spinner from "../../components/spinner/Spinner";

function ContractorProfile() {
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
        const response = await contractorProfile({
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
    <Layout>
      {loader ? (
        <div className="h-[40vh] flex items-center">
          <Spinner />
        </div>
      ) : (
        <div className="my-5 md:w-[50vw] w-[90vw]  shadow-lg rounded-md p-4  shadow-gray-300">
          <div className="flex justify-center relative">
            <img
              className=""
              style={{ clipPath: "circle()" }}
              src={profileData.profilePic}
              alt="profile image"
            />
            <p className="absolute bottom-20 left-[60%]">
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
              <p>{profileData.address}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-3">
                <FaRegAddressBook className="text-2xl" />
                <p>Company Address :- </p>
              </div>
              <p>{profileData.companyAddress}</p>
            </div>
            <div className="flex items-center justify-between border-b-2 py-3">
              <div className="flex items-center gap-2">
                <BsFileEarmarkPostFill className="text-3xl" />
                <Link to="/contractor" className="text-blue-500 cursor-pointer">
                  Toatal Posts :-
                </Link>
              </div>
              <p>{profileData.posts?.length}</p>
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
            <ContractorUpdateProfile
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </div>
      )}
    </Layout>
  );
}

export default ContractorProfile;
