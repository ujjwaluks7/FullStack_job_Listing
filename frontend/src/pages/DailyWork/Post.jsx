import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/carousel_images/3.webp";
import { IoLocation } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { GiSkills } from "react-icons/gi";
import { GiOrganigram } from "react-icons/gi";
import { postApply } from "../../API/apiCall";
import Spinner from "../../components/spinner/Spinner";
import toast from "react-hot-toast";

function Post({
  jobName,
  jobDescription,
  address,
  jobType,
  skill,
  date,
  companyName,
  authorName,
  postId,
  setFilterData,
  totalApplied,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [applyedThisPost, setApplayedThisPost] = useState(false);

  async function postApplyFun() {
    const token = localStorage.getItem("shramik_token");
    if (token) {
      const data = { postId: postId };
      try {
        setLoading(true);
        const response = await postApply(
          {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data
        );
        console.log(response);
        if (response.success === true) {
          toast.success(response.message);
          setFilterData(response.data);
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
      toast.error("please Login");
      navigate("/login");
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("shramik_id");

    if (totalApplied.length >= 1) {
      for (let i of totalApplied) {
        if (i == userId) {
          setApplayedThisPost(true);
        }
      }
    }
  }, []);

  return (
    <div className="md:w-[60vw] w-[80vw] shadow-lg shadow-gray-300 rounded-lg p-4">
      {console.log(applyedThisPost)}
      <div className="flex flex-col md:flex-row-reverse">
        <div>
          <img className="w-[100%] rounded-lg" src={image} alt="" />
        </div>
        <div className="w-[100%]">
          <h3 className="font-bold my-2">{jobName}</h3>
          <div className="flex items-center gap-1">
            <GiOrganigram />
            <p className="font-bold">{companyName}</p>
          </div>
          <div className="flex items-center gap-1 my-2">
            <IoLocation />
            <p>{address}</p>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <RxAvatar className="text-xl" />
            <p className="font-bold ">{jobType}</p>
          </div>
          <div className="flex items-center my-2">
            <GiSkills />
            <p>{skill}</p>
          </div>
          <div className="flex items-center gap-1 my-2">
            <MdOutlineDateRange />
            <p>{date.split("T")[0]}</p>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <RxAvatar className="text-xl" />
            <p className="font-bold cursor-pointer">{authorName}</p>
          </div>
          <p className="text-gray-500">{jobDescription}</p>
        </div>
      </div>
      <div className="flex gap-5 my-4 justify-center ">
        <div
          className={`${
            applyedThisPost ? "bg-gray-500" : "bg-blue-600"
          } rounded-lg`}
        >
          {loading ? (
            <Spinner />
          ) : (
            <button
              disabled={applyedThisPost}
              onClick={postApplyFun}
              className=" text-white px-6 py-1 "
            >
              {applyedThisPost ? "Appled" : "Apply"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
