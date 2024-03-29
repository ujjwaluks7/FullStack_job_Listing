import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function SearchBox() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit() {
    navigate("/dailywork");
  }

  return (
    <div className=" flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className=" relative md:w-[80vw] w-[100vw] flex items-center md:shadow-md md:shadow-gray-100 p-4 rounded-full"
      >
        <IoSearch className="absolute left-8 text-3xl text-gray-500" />
        <input
          className="  border-2 w-full md:py-3 py-2 pl-14 border-gray-200 rounded-full focus:outline-none text-lg"
          type="text"
          placeholder="search hear..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-[18px] bg-blue-600 rounded-3xl font-bold text-white  md:px-8 px-5 py-[11px] md:py-[14px]">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
