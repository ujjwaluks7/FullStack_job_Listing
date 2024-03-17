import React, { useState } from "react";
import skills from "../../config/skills.json";
import { updateLabourProfile } from "../../API/apiCall";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";

function LabourUpdateProfile({
  showModal,
  setShowModal,
  profileData,
  setProfileData,
}) {
  const [loading, setLoading] = useState(true);
  const [inputVal, setInputVal] = useState(
    profileData
      ? profileData
      : {
          name: "",
          email: "",
          gender: "male",
          age: "",
          phone: "",
          password: "",
          address: "",
          skill: "",
        }
  );

  function handlerChange(e) {
    const { name, value } = e.target;

    setInputVal({ ...inputVal, [name]: value });
  }

  async function submitHandler(e) {
    console.log(inputVal);
    e.preventDefault();
    const token = localStorage.getItem("shramik_token");
    if (token) {
      try {
        const response = await updateLabourProfile(
          {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          inputVal
        );
        console.log(response);
        if (response.success === true) {
          toast.success(response.message);
          setProfileData(response.data);
          setShowModal(false);
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
    <>
      {showModal ? (
        <>
          <div className="mt-2 md:mt-0 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="top-14 md:top-0 relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className=" text-3xl font-semibold">Update Profile</h3>
                  <button
                    className="md:text-3xl text-2xl border-0 text-red-800 opacity-800 leading-none  "
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="flex flex-col gap-2">
                    <div className="flex gap-5 flex-col md:flex-row">
                      <div className="flex flex-col ">
                        <label htmlFor="name">Name*</label>
                        <input
                          className=" py-1 md:w-[20vw]  border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                          type="text"
                          placeholder="enter name"
                          id="name"
                          name="name"
                          value={inputVal.name}
                          onChange={(e) => handlerChange(e)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="gender">Gender*</label>
                        <select
                          onChange={(e) => handlerChange(e)}
                          name=""
                          id="gender"
                          className=" py-1 md:w-[20vw]  border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                        >
                          <option value="male">male</option>
                          <option value="female">female</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-5 flex-col md:flex-row">
                      <div className="flex flex-col">
                        <label htmlFor="age">Age*</label>
                        <input
                          className=" py-1 md:w-[20vw]  border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                          type="number"
                          placeholder="enter age eg:-20"
                          id="age"
                          name="age"
                          value={inputVal.age}
                          onChange={(e) => handlerChange(e)}
                          required
                        />
                      </div>
                      <div className="flex flex-col relative">
                        <label htmlFor="pass">Password*</label>
                        <input
                          className=" py-1 md:w-[20vw]  border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                          type="password"
                          placeholder="enter password"
                          id="pss"
                          name="password"
                          value={inputVal.password}
                          onChange={(e) => handlerChange(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-5 flex-col md:flex-row">
                      <div className="flex flex-col">
                        <label htmlFor="address">Address*</label>
                        <textarea
                          className=" py-1 md:w-[20vw]  border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                          placeholder="enter address"
                          id="address"
                          name="address"
                          value={inputVal.address}
                          onChange={(e) => handlerChange(e)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="skill">Skill*</label>
                        <select
                          onChange={handlerChange}
                          name="skill"
                          id="skill"
                          value={inputVal.skill}
                          className=" py-1 md:w-[20vw]  border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                        >
                          <option value="">---select---</option>
                          {skills.map((skill, index) => {
                            return (
                              <option
                                value={skill.value}
                                key={`option_${index}`}
                              >
                                {skill.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-5 flex-col md:flex-row">
                      <div className="flex flex-col">
                        <label htmlFor="address">Phone*</label>
                        <input
                          className=" py-1 md:w-[20vw]  border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                          type="nomber"
                          placeholder="enter phone"
                          id="phone"
                          name="phone"
                          value={inputVal.phone}
                          onChange={(e) => handlerChange(e)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="address">Email*</label>
                        <input
                          className=" py-1 md:w-[20vw]  border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                          type="email"
                          placeholder="enter email"
                          id="pmail"
                          name="email"
                          value={inputVal.email}
                          onChange={(e) => handlerChange(e)}
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={submitHandler}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <Toaster />
    </>
  );
}

export default LabourUpdateProfile;
