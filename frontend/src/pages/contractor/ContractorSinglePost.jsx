import React from "react";
import Layout from "./Layout";
import { LuClipboardType } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

function ContractorSinglePost() {
  return (
    <Layout>
      <div>
        <h2 className="text-3xl font-semibold text-center my-3">Post</h2>

        <div className="md:w-[60vw] w-[90vw] shadow-md shadow-gray-200 rounded-lg px-6 py-3">
          <h3 className="text-xl py-2 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
            molestias.
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            nam doloremque quia pariatur molestiae doloribus eius minus
            consequuntur aliquam est!
          </p>
          <div className="flex flex-col">
            <p className="flex items-center py-1 font-semibold">
              <IoLocationOutline /> <span>Madhepura</span>
            </p>
            <p className="flex items-center py-1 font-semibold">
              <LuClipboardType />
              <span>Full Time</span>
            </p>
            <p className="flex items-center py-1 font-semibold">
              <IoDocumentTextOutline />
              <span>Labour</span>
            </p>
            <p className="flex items-center py-1 font-semibold">
              <CiCalendarDate />
              <span>20 jan 2023</span>
            </p>
          </div>
          <div className="text-center">
            <button className="px-10 py-1 rounded-lg font-bold bg-blue-500 text-white cursor-pointer ">
              Edit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContractorSinglePost;
