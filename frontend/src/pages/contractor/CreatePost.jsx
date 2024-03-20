import React, { useState } from "react";
import Layout from "./Layout";
import district from "../../config/district.json";
import skills from "../../config/skills.json";
import { createPost } from "../../API/apiCall";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";

function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobName: "",
    jobDescription: "",
    requiredSkill: "",
    jobType: "",
    state: "Bihar",
    district: "",
    city: "",
    pincode: "",
    address: "",
    postPic: "",
  });

  function handlerChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const token = localStorage.getItem("shramik_token");
    if (token) {
      try {
        const response = await createPost(
          {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          formData
        );
        setLoading(true);
        if (response.success === true) {
          toast.success(response.message);
          setFormData({
            jobName: "",
            jobDescription: "",
            requiredSkill: "",
            jobType: "",
            state: "Bihar",
            district: "",
            city: "",
            pincode: "",
            address: "",
          });
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
      <div className="h-[90vh]">
        <h2 className="text-3xl font-semibold py-3 text-center">Create Post</h2>
        <form
          onSubmit={submitHandler}
          className=" md:w-[40vw] w-[90vw] shadow-sm shadow-gray-400 rounded-lg px-10 py-8 mb-8 "
        >
          <div className="flex flex-col">
            <label htmlFor="jobName">Job Name*</label>
            <input
              className=" py-1 border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
              type="text"
              placeholder="Enter job name"
              id="jobName"
              onChange={(e) => handlerChange(e)}
              name="jobName"
              value={formData.jobName}
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="jobDescription">Job Description*</label>
            <textarea
              className=" py-1 border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
              id="jobDescription"
              required
              onChange={(e) => handlerChange(e)}
              value={formData.jobDescription}
              name="jobDescription"
              placeholder="Enter job description ..."
            ></textarea>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="skill">Required skill*</label>
            <select
              multiple={false}
              className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none shadow-md shadow-gray-200"
              required
              id="slill"
              onChange={(e) => handlerChange(e)}
              value={formData.requiredSkill}
              name="requiredSkill"
            >
              <option value="">--select--</option>
              {skills?.map((skill, i) => (
                <option key={i} value={skill.value}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="jobType">Job Type*</label>
            <select
              multiple={false}
              className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none shadow-md shadow-gray-200"
              required
              id="jobType"
              onChange={(e) => handlerChange(e)}
              vlaue={formData.jobType}
              name="jobType"
            >
              <option value="">--Select--</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="state">State</label>
            <select
              className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none shadow-md shadow-gray-200"
              name=""
              id="state"
            >
              <option value="Bihar">Bihar</option>
            </select>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="district">District</label>
            <select
              multiple={false}
              className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none shadow-md shadow-gray-200"
              required
              id="district"
              onChange={(e) => handlerChange(e)}
              value={formData.district}
              name="district"
            >
              <option value="">--select--</option>
              {district?.map((dis, i) => (
                <option key={i} value={dis.value}>
                  {dis.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="city">City*</label>
            <input
              className=" py-1 border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
              type="text"
              placeholder="Enter city"
              id="city"
              required
              onChange={(e) => handlerChange(e)}
              value={formData.city}
              name="city"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="pincode">Pin Cnode*</label>
            <input
              className=" py-1 border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
              type="text"
              placeholder="Enter pin code"
              id="pincode"
              required
              onChange={(e) => handlerChange(e)}
              value={formData.pincode}
              name="pincode"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="address">Address*</label>
            <input
              className=" py-1 border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
              type="text"
              placeholder="Enter address"
              id="address"
              required
              onChange={(e) => handlerChange(e)}
              value={formData.address}
              name="address"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="postPic">Post image Url</label>
            <input
              className=" py-1 border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
              type="url"
              placeholder="Enter url"
              id="postPic"
              onChange={(e) => handlerChange(e)}
              value={formData.postPic}
              name="postPic"
            />
          </div>
          <div className="bg-blue-500 w-full rounded-lg flex justify-center  text-white text-lg py-1 mt-5">
            {loading ? (
              <Spinner />
            ) : (
              <button className=" hover:shadow-md">Submit</button>
            )}
          </div>
        </form>
        <Toaster />
      </div>
    </Layout>
  );
}

export default CreatePost;
