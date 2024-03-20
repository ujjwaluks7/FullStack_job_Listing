import React, { Fragment, useEffect, useState } from "react";
import Post from "./Post";
import { allPosts } from "../../API/apiCall";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";
import skills from "../../config/skills.json";

function DailyWork() {
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [filterData, setFilterData] = useState([]);

  async function fetchAllPosts() {
    setLoading(true);
    const response = await allPosts();
    console.log(response.data);
    if (response.success === true) {
      setAllPost(response.data);
      setFilterData(response.data);
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllPosts();
  }, []);

  //   filter

  useEffect(() => {
    if (filter !== "all") {
      const data = allPost.filter((data, i) => data.requiredSkill == filter);
      setFilterData(data);
    } else {
      setFilterData(allPost);
    }
  }, [filter]);

  return (
    <div className="mx-3 my-5">
      <div className="text-center">
        <label htmlFor="filter">Filter</label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 rounded-lg p-1 ml-4"
          name="filter"
          id="filter"
        >
          <option onChange={(e) => setFilter(e.target.value)} value="all">
            All
          </option>
          {skills.map((skill, i) => (
            <option key={`skill_${i}`} value={skill.value}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Spinner />
        </div>
      ) : allPost.length < 1 ? (
        <div className="h-[40vh] flex items-center justify-center">
          <h2 className="text-3xl font-bold">Post Not Found 😒</h2>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-12">
          {filterData?.map((post, i) => (
            <Fragment key={`post_${i}`}>
              <Post
                jobName={post.jobName}
                jobDescription={post.jobDescription}
                address={post.address}
                district={post.district}
                jobType={post.jobType}
                skill={post.requiredSkill}
                date={post.createdAt}
                authorName={post.author?.name}
                companyName={post.author?.companyName}
                postId={post?._id}
                totalApplied={post.totalApplied}
                postPic={post.postPic}
              />
            </Fragment>
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default DailyWork;
