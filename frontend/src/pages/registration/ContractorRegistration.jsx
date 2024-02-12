import React, { useState } from "react";
import signupImg from "../../assets/signup_img.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Spinner from "../../components/spinner/Spinner";

function ContractorRegister() {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    gender: "male",
    age: "",
    phone: "",
    address: "",
    companyName: "",
    companyAdderss: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    const {
      name,
      email,
      gender,
      age,
      phone,
      address,
      companyName,
      companyAdderss,
      password,
    } = inputVal;

    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !age ||
      !phone ||
      !address ||
      !companyAdderss ||
      !companyName
    ) {
      alert("All fields are requide");
    } else if (!email.includes("@") || !email.includes(".")) {
      alert("please enter valid email");
    }
    console.log(inputVal);
  }

  function handlerChange(e) {
    const { name, value } = e.target;

    setInputVal({ ...inputVal, [name]: value });
  }

  return (
    <div className="md:my-[50px] mb-3 flex items-center justify-center">
      <div className="shadow-lg shadow-gray-400 rounded-lg">
        <h2 className="text-center py-2 text-2xl font-bold">
          Contractor Registration
        </h2>
        <div className="w-[80vw] flex items-center justify-between p-4">
          <div className="hidden md:block">
            <img className="w-[80%]" src={signupImg} alt="" />
          </div>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-col ">
              <label htmlFor="name">Name*</label>
              <input
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
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
              <label htmlFor="email">Email*</label>
              <input
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="email"
                placeholder="enter email"
                id="email"
                name="email"
                value={inputVal.email}
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
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="age">Age*</label>
              <input
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="number"
                placeholder="enter age eg:-20"
                id="age"
                name="age"
                value={inputVal.age}
                onChange={(e) => handlerChange(e)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone*</label>
              <input
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="number"
                placeholder="enter mobile number"
                id="phone"
                name="phone"
                value={inputVal.phone}
                onChange={(e) => handlerChange(e)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address">Address*</label>
              <textarea
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                placeholder="enter address"
                id="address"
                name="address"
                value={inputVal.address}
                onChange={(e) => handlerChange(e)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="companyName">Company Name</label>
              <input
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="text"
                placeholder="enter company name"
                id="companyName"
                name="companyName"
                value={inputVal.companyName}
                onChange={(e) => handlerChange(e)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="companyAddress">Company Address</label>
              <textarea
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="text"
                placeholder="enter company address"
                id="companyAddress"
                name="companyAddress"
                value={inputVal.companyAdderss}
                onChange={(e) => handlerChange(e)}
              />
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="pass">Password*</label>
              <input
                className=" py-1 md:w-[35vw] w-[70vw] border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type={showPassword}
                placeholder="enter password"
                id="pss"
                name="password"
                value={inputVal.password}
                onChange={(e) => handlerChange(e)}
                required
              />
              {showPassword === "password" ? (
                <FaEye
                  className="cursor-pointer absolute right-3 top-8 text-xl"
                  onClick={() => setShowPassword("text")}
                />
              ) : (
                <FaEyeSlash
                  className="cursor-pointer absolute right-3 top-8 text-xl"
                  onClick={() => setShowPassword("password")}
                />
              )}
            </div>
            <div className="bg-blue-500 w-full rounded-lg flex justify-center  text-white text-lg py-1">
              {loading ? (
                <Spinner />
              ) : (
                <button className=" hover:shadow-md">Signup</button>
              )}
            </div>
            <p className="font-bodyFont text-xs md:text-lg">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContractorRegister;
