import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login_img.png";
import toast, { Toaster } from "react-hot-toast";
import { FaEyeSlash, FaEye, FaGoogle } from "react-icons/fa";
import Spinner from "../../components/spinner/Spinner";
import { login } from "../../API/apiCall";
import { appContext } from "../../App";

function Login() {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const { setUserDetail } = useContext(appContext);

  async function loginForm(e) {
    e.preventDefault();
    const { email, password } = inputVal;

    if (!email || !password) {
      toast.error("All fields are required 😒");
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.error("please enter valid email ⚠️");
    } else {
      setLoading(true);
      const respnse = await login(inputVal);
      if (respnse.success !== true) {
        toast.error(respnse.message);
        setLoading(false);
      } else {
        toast.success(respnse.message);
        localStorage.setItem("shramik_token", respnse?.data?.token);
        localStorage.setItem("shramik_role", respnse?.data?.role);
        localStorage.setItem("shramik_id", respnse?.data?.userId);
        setUserDetail(respnse.data);
        setLoading(false);
        if (respnse.data.role === "Contractor") {
          navigate("/contractor");
        } else {
          navigate("/");
        }
      }
    }
  }

  function handlerChange(e) {
    const { name, value } = e.target;

    setInputVal({ ...inputVal, [name]: value });
  }

  return (
    <div className=" h-[80vh] flex items-center justify-center">
      <div className="shadow-lg shadow-gray-400 rounded-lg px-5">
        <h2 className="text-center py-1 text-2xl font-bold">Login</h2>
        <div className="w-[80vw] flex items-center justify-between p-4">
          <div className="hidden md:block">
            <img className="w-[80%]" src={loginImg} alt="login image" />
          </div>
          <form className="flex flex-col items-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="md:w-[35vw] w-[70vw] py-2 border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type="email"
                placeholder="enter email"
                id="email"
                name="email"
                value={inputVal.email}
                onChange={(e) => handlerChange(e)}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="pass">Password</label>
              <input
                className=" md:w-[35vw] w-[70vw] py-2 border-2 border-gray-300 rounded-lg px-2 focus:outline-none shadow-md shadow-gray-200"
                type={showPassword}
                placeholder="enter password"
                id="pss"
                name="password"
                value={inputVal.password}
                onChange={(e) => handlerChange(e)}
              />
              <div className="relative">
                {showPassword === "password" ? (
                  <FaEye
                    className=" cursor-pointer absolute -top-8 right-2 text-xl"
                    onClick={() => setShowPassword("text")}
                  />
                ) : (
                  <FaEyeSlash
                    className=" cursor-pointer absolute -top-8 right-2 text-xl"
                    onClick={() => setShowPassword("password")}
                  />
                )}
              </div>
            </div>
            <div className="bg-blue-500 w-full rounded-lg flex justify-center  text-white text-lg py-1">
              {loading ? (
                <Spinner />
              ) : (
                <button
                  onClick={(e) => loginForm(e)}
                  className=" hover:shadow-md w-full"
                >
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
