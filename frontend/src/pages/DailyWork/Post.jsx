import React from "react";
import image from "../../assets/carousel_images/3.webp";
import { IoLocation } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { GiSkills } from "react-icons/gi";
import { GiOrganigram } from "react-icons/gi";

function Post({
  jobName,
  jobDescription,
  address,
  district,
  jobType,
  skill,
  date,
  companyName,
  authorName,
}) {
  return (
    <div className="md:w-[60vw] w-[80vw] shadow-lg shadow-gray-300 rounded-lg p-4">
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
          <div className="flex items-center my-2">
            <GiSkills />
            <p>{skill}</p>
          </div>
          <div className="flex items-center gap-1 my-2">
            <MdOutlineDateRange />
            <p>{date.split("T")[0]?.split("-")}</p>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <RxAvatar className="text-xl" />
            <p className="font-bold cursor-pointer">{authorName}</p>
          </div>
          <p className="text-gray-500">{jobDescription}</p>
        </div>
      </div>
      <div className="flex gap-5 my-4 justify-center ">
        <button className="bg-blue-600 text-white px-6 py-1 rounded-lg">
          Apply
        </button>
        <button className="bg-blue-600 text-white px-6 py-1 rounded-lg">
          Details
        </button>
      </div>
    </div>
  );
}

export default Post;
