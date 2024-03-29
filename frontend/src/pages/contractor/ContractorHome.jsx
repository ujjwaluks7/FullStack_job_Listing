import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { LuClipboardType } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { contractorAllPosts, deleteSinglePost } from "../../API/apiCall";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";
import { CiCalendarDate } from "react-icons/ci";

function ContractorHome() {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostsData();
  }, []);

  async function fetchPostsData() {
    const token = localStorage.getItem("shramik_token");
    try {
      const response = await contractorAllPosts({
        authorization: `Bearer ${token}`,
      });
      console.log("response", response);
      setLoading(true);
      if (response.success === true) {
        setAllPosts(response?.data?.data);
        setLoading(false);
      } else if (response.message === "jwt expired") {
        toast.error(response.message);
        localStorage.removeItem("shramik_token");
        localStorage.removeItem("shramik_role");
        setLoading(false);
        navigate("/login");
      } else if (response.message == "Contractor not found") {
        navigate("/");
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(response.message);
      setLoading(false);
    }
  }

  // delete handler

  async function deleteHandler(id) {
    const token = localStorage.getItem("shramik_token");

    try {
      const response = await deleteSinglePost(
        {
          authorization: `Bearer ${token}`,
        },
        id
      );
      console.log("response", response);
      if (response.success === true) {
        fetchPostsData();
        toast.success(response.message);
      } else if (response.message === "jwt expired") {
        toast.error(response.message);
        localStorage.removeItem("shramik_token");
        localStorage.removeItem("shramik_role");
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(response.message);
    }
  }

  return (
    <Layout>
      <div>
        <h2 className="text-3xl font-semibold text-center my-3">All Posts</h2>
        {loading ? (
          <div className=" h-[20vh] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {allPosts?.map((post) => {
              return (
                <div
                  key={post._id}
                  className="relative md:w-[60vw] w-[90vw] shadow-md shadow-gray-200 rounded-md py-2 px-3"
                >
                  <div className="absolute right-1 flex flex-col gap-3">
                    <Link to={`/contractor/post/edit/${post?._id}`}>
                      <CiEdit className="cursor-pointer text-xl" />
                    </Link>
                    <Link to={`/contractor/post/view/${post?._id}`}>
                      <FaEye className="cursor-pointer text-xl" />
                    </Link>
                    <MdDelete
                      onClick={() => deleteHandler(post?._id)}
                      className="cursor-pointer text-xl text-red-500"
                    />
                  </div>
                  <h3 className="text-xl py-2 font-semibold">
                    {post?.jobName}
                  </h3>
                  <p>{post?.jobDescription}</p>
                  <div className="flex gap-3">
                    <p className="flex items-center py-1 font-semibold">
                      <IoLocationOutline /> <span>{post?.district}</span>
                    </p>
                    <p className="flex items-center py-1 font-semibold">
                      <LuClipboardType />
                      <span>{post?.jobType}</span>
                    </p>
                    <p className="flex items-center py-1 font-semibold">
                      <IoDocumentTextOutline />
                      <span>{post?.requiredSkill}</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center font-semibold mt-3">
                      <CiCalendarDate /> <span>{post?.createdAt}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Toaster />
      </div>
    </Layout>
  );
}

export default ContractorHome;
