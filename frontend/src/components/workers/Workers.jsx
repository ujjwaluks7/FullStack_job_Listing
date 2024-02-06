import React from "react";
import workerIcon from "../../assets/worker_icon.png";
import workIcon from "../../assets/work_icon.png";
import contractorIcon from "../../assets/contractor_icon.png";

function Workers() {
  return (
    <div className=" py-4 flex sm:flex-row flex-col md:gap-10 gap-4 text-3xl font-bold  ">
      <div className="bg-gray-400 text-white p-2 rounded-md flex items-center gap-3">
        <img className="w-[50px]" src={contractorIcon} alt="" />
        <div>
          <p>200+</p>
          <h3>Contractor</h3>
        </div>
      </div>
      <div className="bg-gray-400 text-white p-2 rounded-md flex items-center gap-3">
        <img className="w-[50px]" src={workerIcon} alt="" />
        <div>
          <p>500+</p>
          <h3>Labours</h3>
        </div>
      </div>
      <div className="bg-gray-400 text-white p-2 rounded-md flex items-center gap-3">
        <img className="w-[50px]" src={workIcon} alt="" />
        <div>
          <p>20+</p>
          <h3>Workes</h3>
        </div>
      </div>
    </div>
  );
}

export default Workers;
