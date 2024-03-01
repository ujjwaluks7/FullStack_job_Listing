import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { LuClipboardType } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { viewSinglePost } from "../../API/apiCall";
import Spinner from "../../components/spinner/Spinner";

function ContractorSinglePost() {
  const [singlPostData, setSinglePostData] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    getSinglrPost();
  }, []);

  async function getSinglrPost() {
    const token = localStorage.getItem("shramik_token");

    try {
      setLoading(true);
      const response = await viewSinglePost(
        {
          authorization: `Bearer ${token}`,
        },
        id
      );

      if (response.success === true) {
        setLoading(false);
        setSinglePostData(response?.data);
      } else if (response.message === "jwt expired") {
        toast.error(response.message);
        setLoading(false);
        localStorage.removeItem("shramik_token");
        localStorage.removeItem("shramik_role");
        setLoading(false);
        navigate("/login");
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(response.message);
    }
  }

  return (
    <Layout>
      {loading ? (
        <div className="h-[40vh] flex items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold text-center my-3">Post</h2>

          {singlPostData?._id ? (
            <div className="md:w-[60vw] w-[90vw] shadow-md shadow-gray-200 rounded-lg px-6 py-3">
              <h3 className="text-xl py-2 font-semibold">
                {singlPostData?.jobName}
              </h3>
              <p>{singlPostData?.jobDescription}</p>
              <div className="flex flex-col">
                <p className="flex items-center py-1 font-semibold">
                  <IoLocationOutline /> <span>{singlPostData?.district}</span>
                </p>
                <p className="flex items-center py-1 font-semibold">
                  <LuClipboardType />
                  <span>{singlPostData?.jobType}</span>
                </p>
                <p className="flex items-center py-1 font-semibold">
                  <IoDocumentTextOutline />
                  <span>{singlPostData?.requiredSkill}</span>
                </p>
                <p className="flex items-center py-1 font-semibold">
                  <CiCalendarDate />
                  <span>{singlPostData?.createdAt}</span>
                </p>
              </div>
              <div className="text-center">
                <Link
                  to={`/contractor/post/edit/${id}`}
                  className="px-10 py-1 rounded-lg font-bold bg-blue-500 text-white cursor-pointer "
                >
                  Edit
                </Link>
              </div>
            </div>
          ) : (
            <div className="h-[50vh] flex items-center font-bold text-3xl">
              Post not found 😒
            </div>
          )}
        </div>
      )}
      <Toaster />
    </Layout>
  );
}

export default ContractorSinglePost;
